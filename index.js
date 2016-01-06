var util = require('util')
var debug = util.debuglog('nexttick')

var NEXT = process.nextTick.bind(process)

var n = 0
var sameTick = false

process.debugNextTick = process.debugNextTick || function nextTick() {
  if (!sameTick) {
    ++n
    sameTick = true
    NEXT(function () {
      sameTick = false
      debug('TICK', n)
    })
  }
  NEXT.apply(null, arguments)
}

module.exports = process.debugNextTick
module.exports.polyfill = function () {
  process.nextTick = process.debugNextTick
}

