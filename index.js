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

  function nextTick(cb) {
    if (cb._tickSync) return

    if (!sameTick) {
      ++process._tick
      sameTick = true
      nativeNextTick.call(process, wrap(function () {
        sameTick = false
        debug(process._tick)
      }))
    }

    nativeNextTick.call(process, wrap.apply(null, arguments))
  }

  return nextTick
}

function wrap(cb) {
  var args = slice(arguments, 1)
  function task() {
    task._tickSync = false
    cb.apply(this, args)
  }
  task._tickSync = true

  return task
}

function slice(o, from, to) {
  return Array.prototype.slice.call(o, from, to)
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

