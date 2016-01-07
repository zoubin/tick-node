var nextTick = require('..').getNextTick().bind(process)

var test = require('tap').test

test('nextTick', function (t) {
  t.plan(6)

  nextTick(function () {
    t.equal(process._tick, 1)
  })

  nextTick(function () {
    t.equal(process._tick, 1)
  })

  setTimeout(function() {
    nextTick(function () {
      t.equal(process._tick, 2)
    })
    nextTick(function () {
      t.equal(process._tick, 2)
    })
  }, 10)

  setTimeout(function() {
    nextTick(function () {
      t.equal(process._tick, 3)
      nextTick(function () {
        t.equal(process._tick, 4)
      })
    })
  }, 20)
})

