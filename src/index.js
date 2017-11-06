import './style.styl'

const portfolioURL = 'https://kaisermann.me'

const scriptEl =
  document.currentScript || document.getElementById('k-signature')
const scriptParentEl = scriptEl ? scriptEl.parentNode : document.body

/** Create the signature element */
const signatureEl = document.createElement('a')
signatureEl.href = portfolioURL
signatureEl.target = '_blank'
signatureEl.className = 'k-signature'
signatureEl.innerHTML = `<span class="k-signature__by">By</span><div class="k-signature__brand"><span class="k-signature__main">K</span><span class="k-signature__rest">AISERMANN</span></div>`

if (scriptEl.dataset.style) {
  signatureEl.style = scriptEl.dataset.style
}
const style = signatureEl.style || {}

if (!style.top && !style.bottom) style.bottom = 0
if (!style.left && !style.right) style.left = 0

/** Append the signature element to the DOM */
if (style.position === 'static') {
  scriptParentEl.insertBefore(signatureEl, scriptEl)
} else {
  document.body.style.position = 'relative'
  document.body.appendChild(signatureEl)
}
scriptParentEl.removeChild(scriptEl)
