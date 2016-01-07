var test = require('tap').test
var debugNextTick = require('..')

debugNextTick.polyfill()

test('polyfill', function (t) {
  t.plan(4)

  t.equal(process._tick, undefined, 'no debug')

  process.nextTick(function () {
    process.env.NODE_DEBUG = 'nexttick'
    debugNextTick.polyfill()
    t.equal(process._tick, 0, 'initialized')

    process._nextTick(function () {
      t.equal(process._tick, 1, 'first tick')

      var nextTick = process.nextTick
      debugNextTick.polyfill()

      t.equal(process.nextTick, nextTick, 'polyfill twice')
    })
  })
})

