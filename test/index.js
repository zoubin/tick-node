var nextTick = require('./')

nextTick(function () {
  console.log('should be', 1)
})

nextTick(function () {
  console.log('should be', 1)
})

setTimeout(function() {
  nextTick(function () {
    console.log('should be', 2)
  })
  nextTick(function () {
    console.log('should be', 2)
  })
}, 10)

setTimeout(function() {
  nextTick(function () {
    console.log('should be', 3)
    nextTick(function () {
      console.log('should be', 4)
    })
  })
}, 20)

