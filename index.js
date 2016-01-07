var util = require('util')
var debug = util.debuglog('nexttick')

exports.getNextTick = getNextTick

exports.bind = function () {
  return debugNextTick().bind(process)
}

exports.polyfill = function () {
  process._nextTick = debugNextTick()
}

function getNextTick() {
  if (process._tick != null) {
    return process.nextTick
  }

  process._tick = 0
  var nativeNextTick = process.nextTick
  var sameTick = false

  function nextTick() {
    if (!sameTick) {
      ++process._tick
      sameTick = true
      nativeNextTick.call(process, function () {
        sameTick = false
        console.log(process._tick);
        debug(process._tick)
      })
    }
    nativeNextTick.apply(process, arguments)
  }

  return nextTick
}

function debugNextTick() {
  if (isDebug()) {
    return getNextTick()
  }

  return process.nextTick
}

function isDebug(debug) {
  return /\bnexttick\b/.test(process.env.NODE_DEBUG || '')
}

