require('..').polyfill()

var n = 3

var rs = require('stream').Readable()
rs._read = function () {
  process.nextTick(function () {
    rs.push(n ? '' + n-- : null)
  })
}
rs.pipe(process.stdout)

