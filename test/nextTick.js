var test = require('tap').test
var debugNextTick = require('..')

test('bind', function (t) {
  t.plan(2)

  var nextTick = debugNextTick.bind()

  t.equal(nextTick.debug, undefined)

  nextTick(function () {
    process.env.NODE_DEBUG = 'nexttick'
    nextTick = debugNextTick.bind()
    nextTick(function () {
      t.equal(nextTick.debug, 1)
    })
  })
})


