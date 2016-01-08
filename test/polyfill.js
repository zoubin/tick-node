var test = require('tap').test
var debugNextTick = require('..')

function polyfill() {
  debugNextTick.polyfill({ log: false })
}

test('polyfill', function (t) {
  t.plan(4)

  polyfill()
  t.equal(process.nextTick._tick, undefined, 'no debug')

  process.nextTick(function () {
    process.env.NODE_DEBUG = 'nexttick'
    polyfill()
    t.equal(process.nextTick._tick, 0, 'initialized')

    process.nextTick(function () {
      t.equal(process.nextTick._tick, 1, 'first tick')

      var nextTick = process.nextTick
      polyfill()

      t.equal(process.nextTick, nextTick, 'polyfill twice')
    })
  })
})

