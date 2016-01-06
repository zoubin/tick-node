var test = require('tap').test
var debugNextTick = require('..')

debugNextTick.polyfill()

test('polyfill', function (t) {
  t.plan(4)

  t.equal(process.nextTick.debug, undefined, 'no debug')

  process.nextTick(function () {
    process.env.NODE_DEBUG = 'nexttick'
    debugNextTick.polyfill()
    t.equal(process.nextTick.debug, 0, 'initialized')

    var nextTick = process.nextTick

    nextTick(function () {
      t.equal(nextTick.debug, 1, 'first tick')

      debugNextTick.polyfill()

      t.equal(process.nextTick, nextTick, 'polyfill twice')
    })
  })
})


