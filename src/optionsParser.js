const propMap = {
  tc: 'color',
  bc: 'backgroundColor',
  position: (options, value) => {
    if (value !== 'static') {
      if (value !== 'fixed' && value !== 'relative') {
        options.direction = options.position
        options.position =
          options.state === 'bottom' ? 'absolute' : options.state
        delete options.state
      }
      options.direction
        .split(',')
        .map(dir => dir.trim())
        .forEach(dir => (options[dir] = 0))
      delete options.direction
    }
  },
}

export default options => {
  Object.keys(propMap).forEach(prop => {
    const propVal = propMap[prop]
    if (typeof options[prop] === 'undefined') return
    if (typeof propVal !== 'function') {
      options[propVal] = options[prop]
      delete options[prop]
    } else {
      propVal(options, propVal)
    }
  })
}
