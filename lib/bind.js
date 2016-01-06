var util = require('util')
var debug = util.debuglog('nexttick')

module.exports = function (originalNextTick, context) {
  if (originalNextTick.debug != null) {
    return originalNextTick
  }

  var sameTick = false

  function nextTick() {
    if (!sameTick) {
      ++nextTick.debug
      sameTick = true
      originalNextTick.call(context, function () {
        sameTick = false
        debug(nextTick.debug)
      })
    }
    originalNextTick.apply(context, arguments)
  }

  nextTick.debug = 0

  return nextTick
}

