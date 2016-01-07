var test = require('tap').test
var debugNextTick = require('..')

test('bind', function (t) {
  t.plan(2)

  var nextTick = debugNextTick.bind()

  t.equal(process._tick, undefined)

  nextTick(function () {
    process.env.NODE_DEBUG = 'nexttick'
    nextTick = debugNextTick.bind()
    nextTick(function () {
      t.equal(process._tick, 1)
    })
  })
})


