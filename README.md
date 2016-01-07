# debug-nexttick
Print the tick number in debug mode.

## Usage

[example/polyfill.js](example/polyfill.js):

```js
require('debug-nexttick').polyfill()

var n = 3

var rs = require('stream').Readable()
rs._read = function () {
  process.nextTick(function () {
    rs.push(n ? '' + n-- : null)
  })
}
rs.pipe(process.stdout)

```

**Output**

```
⌘ NODE_DEBUG=nexttick,stream node example/polyfill.js
STREAM 18138: pipe count=1 opts=undefined
STREAM 18138: resume
STREAM 18138: resume read 0
STREAM 18138: read 0
STREAM 18138: need readable false
STREAM 18138: length less than watermark true
STREAM 18138: do read
STREAM 18138: flow true
STREAM 18138: read undefined
STREAM 18138: need readable true
STREAM 18138: length less than watermark true
STREAM 18138: reading or ended false
STREAM 18138: ondata
3STREAM 18138: read 0
STREAM 18138: need readable true
STREAM 18138: length less than watermark true
STREAM 18138: do read
STREAM 18138: ondata
2STREAM 18138: read 0
STREAM 18138: need readable true
STREAM 18138: length less than watermark true
STREAM 18138: do read
STREAM 18138: ondata
1STREAM 18138: read 0
STREAM 18138: need readable true
STREAM 18138: length less than watermark true
STREAM 18138: do read
STREAM 18138: emitReadable true
STREAM 18138: emit readable
STREAM 18138: flow true
STREAM 18138: read undefined
STREAM 18138: cleanup

```

