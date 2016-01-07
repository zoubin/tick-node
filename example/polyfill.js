require('..').polyfill()

var n = 3

var rs = require('stream').Readable()
rs._read = function () {
  process.nextTick(function (prefix) {
    console.log(prefix);
    rs.push(n ? prefix + n-- : null)
  }, ' x')
}
rs.pipe(process.stdout)

