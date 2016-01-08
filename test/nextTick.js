var nextTick = require('..')._nextTick

var test = require('tap').test

test('nextTick', function (t) {
  t.plan(6)

  nextTick(function () {
    t.equal(nextTick._tick, 1)
  })

  nextTick(function () {
    t.equal(nextTick._tick, 1)
  })

  setTimeout(function() {
    nextTick(function () {
      t.equal(nextTick._tick, 2)
    })
    nextTick(function () {
      t.equal(nextTick._tick, 2)
    })
  }, 10)

  setTimeout(function() {
    nextTick(function () {
      t.equal(nextTick._tick, 3)
      nextTick(function () {
        t.equal(nextTick._tick, 4)
      })
    })
  }, 20)
})

