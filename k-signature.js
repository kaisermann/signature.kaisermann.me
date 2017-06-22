;(function () {
  ;(function (i) {
    var e = /iPhone/i,
      n = /iPod/i,
      o = /iPad/i,
      t = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
      r = /Android/i,
      d = /BlackBerry/i,
      s = /Opera Mini/i,
      a = /IEMobile/i,
      b = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
      h = RegExp('(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)', 'i'),
      c = function (i, e) {
        return i.test(e)
      },
      l = function (i) {
        var l = i || navigator.userAgent
        ;(this.apple = {
          phone: c(e, l),
          ipod: c(n, l),
          tablet: c(o, l),
          device: c(e, l) || c(n, l) || c(o, l),
        }), (this.android = {
          phone: c(t, l),
          tablet: !c(t, l) && c(r, l),
          device: c(t, l) || c(r, l),
        }), (this.other = {
          blackberry: c(d, l),
          opera: c(s, l),
          windows: c(a, l),
          firefox: c(b, l),
          device: c(d, l) || c(s, l) || c(a, l) || c(b, l),
        }), (this.seven_inch = c(h, l)), (this.any =
          this.apple.device ||
          this.android.device ||
          this.other.device ||
          this.seven_inch)
      },
      v = (i.isMobile = new l())
    v.Class = l
  })(window)
  function isInViewport (a) {
    var b = parseInt(window.getComputedStyle(a).height)
    var c = a.getBoundingClientRect(),
      d = document.documentElement
    return (
      c.top >= -1 * b && c.bottom <= (window.innerHeight || d.clientHeight) + b
    )
  }

  var mainLink = 'https://kaisermann.me/'
  var path = 'https://signature.kaisermann.me/'
  var sigcss = 'ksig.css'
  var options = {
    bc: '#353535',
    tc: '#fff',
    position: 'right',
    state: 'static',
    bottomoffset: 50,
    responsive: 'false',
  }

  var pageHead =
    document.head ||
    document.getElementsByTagName('head')[0] ||
    document.querySelector('head')
  var scriptElement = document.querySelector(
    'script[src*="signature.kaisermann.me"]'
  )
  var scriptParent = scriptElement.parentNode

  var _init = function () {
    parseHash()
    options.responsive = options.responsive == 'true'

    getFile(path + sigcss, function signatureCssLoaded (cssText) {
      createCSS(cssText)
      createSignature()
    })
  }

  var createSignature = function () {
    var a = document.createElement('a')
    var aClasses = 'k-sig k-' + options.state

    a.className = aClasses
    a.href = mainLink
    a.target = '_blank'
    a.innerHTML =
      '<span class="k-sig-by">By</span><div class="k-sig-brand"><span class="k-sig-main">K</span><span class="k-sig-rest">AISERMANN</span></div>'

    if (isMobile.any && options.responsive) {
      window.addEventListener(
        'scroll',
        debounce(function () {
          var w = window,
            d = document,
            e = d.documentElement,
            g = d.body,
            scrollTop =
              pageYOffset || (e.clientHeight ? e.scrollTop : g.scrollTop),
            docHeight = getElemHeight(d),
            winHeight = window.innerHeight

          var scrollBottomOffset = winHeight + scrollTop
          a.className = isInViewport(a) &&
            scrollBottomOffset >= docHeight - options.bottomoffset
            ? aClasses + ' k-sig-visible'
            : aClasses
        }, 200)
      )
    }

    if (options.state === 'static') {
      scriptParent.insertBefore(a, scriptElement)
    } else {
      var body = document.body
      if (options.state === 'bottom') {
        var dp = body.style.position
        if (dp !== 'relative' && dp !== 'absolute') {
          body.style.position = 'relative'
        }
      }
      body.appendChild(a)
    }

    scriptParent.removeChild(scriptElement)
  }

  var getElemHeight = function (elem) {
    return Math.max(
      elem.documentElement.clientHeight,
      elem.body.scrollHeight,
      elem.documentElement.scrollHeight,
      elem.body.offsetHeight,
      elem.documentElement.offsetHeight
    )
  }

  function debounce (func, wait, immediate) {
    var timeout
    return function () {
      var context = this,
        args = arguments
      var later = function () {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }

  var createCSS = function (css) {
    var sigStyle = document.createElement('style')

    css = css
      .replace(/\$bc\$/g, options.bc)
      .replace(/\$tc\$/g, options.tc)
      .replace(/\$position\$/g, options.position)

    sigStyle.type = 'text/css'
    sigStyle.setAttribute(
      'author',
      'Christian Kaisermann <christian@kaisermann.me>'
    )
    if (sigStyle.styleSheet) sigStyle.styleSheet.cssText = css
    else sigStyle.appendChild(document.createTextNode(css))

    pageHead.appendChild(sigStyle)
  }

  var getFile = function (a, b) {
    var c
    c = new XMLHttpRequest()
    c.onreadystatechange = function () {
      c.readyState === 4 && c.status === 200 && b(c.responseText)
    }
    c.open('GET', a, !0)
    c.send()
  }
  var parseHash = function () {
    if (scriptElement.src.indexOf('#') >= 0) {
      for (
        var a = scriptElement.src,
          b = a.substring(a.indexOf('#') + 1),
          c = b.split('&'),
          d = 0;
        d < c.length;
        d++
      ) {
        if (c[d]) {
          var e = c[d].split('=')
          e.length < 1 || (options[e[0]] = e[1] ? e[1] : null)
        }
      }
    }
  }

  _init()
})()
