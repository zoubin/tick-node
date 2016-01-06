var nextTick = require('../lib/bind')(process.nextTick, process)

var test = require('tap').test

test('wrap', function (t) {
  t.plan(6)

  nextTick(function () {
    t.equal(nextTick.debug, 1)
  })

  nextTick(function () {
    t.equal(nextTick.debug, 1)
  })

  setTimeout(function() {
    nextTick(function () {
      t.equal(nextTick.debug, 2)
    })
    nextTick(function () {
      t.equal(nextTick.debug, 2)
    })
  }, 10)

  setTimeout(function() {
    nextTick(function () {
      t.equal(nextTick.debug, 3)
      nextTick(function () {
        t.equal(nextTick.debug, 4)
      })
    })
  }, 20)
})

