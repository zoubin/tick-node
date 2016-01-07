require('..').polyfill()

var n = 3

var rs = require('stream').Readable({
  read: function () {
    process.nextTick(function (prefix) {
      if (n) {
        rs.push(prefix + n-- + '\n')
      } else {
        rs.push(null)
      }
    }, 'DATA: ')
  },
})
rs.pipe(process.stdout)

