var debugBind = require('./lib/bind')

exports.bind = bind
function bind() {
  if (isDebug()) {
    return debugBind(process.nextTick, process)
  }

  return process.nextTick.bind(process)
}

exports.polyfill = polyfill
function polyfill() {
  if (isDebug()) {
    process.nextTick = debugBind(process.nextTick, process)
  }
}

function isDebug() {
  return /\bnexttick\b/.test(process.env.NODE_DEBUG || '')
}

