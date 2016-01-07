var util = require('util')
var debug = util.debuglog('nexttick')

var nextTick = getNextTick()

module.exports = exports = nextTick

exports.polyfill = function () {
  if (process.env.NODE_DEBUG && /\bnexttick\b/.test(process.env.NODE_DEBUG)) {
    process.nextTick = nextTick
  }
}

function getNextTick() {
  // already hacked
  if (process._tick != null) {
    return process.nextTick
  }

  process._tick = 0
  var nativeNextTick = process.nextTick
  var ticking = false

  return function () {
    if (!ticking) {
      ++process._tick
      ticking = true
      nativeNextTick(function () {
        debug('---------- TICK %d ----------', process._tick)
        // Do not put this statement before the one above
        // That would cause `nextTick` calling itself forever
        ticking = false
      })
    }

    nativeNextTick.apply(null, arguments)
  }
}

