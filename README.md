# debug-nexttick
Print the tick number in debug mode.

## Usage

[example/polyfill.js](example/polyfill.js):

```js
require('debug-nexttick').polyfill()

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

```

**Output**

```
⌘ NODE_DEBUG=stream,nexttick node example/polyfill.js
STREAM 57163: pipe count=1 opts=undefined
STREAM 57163: resume
NEXTTICK 57163: ---------- TICK 1 ----------
STREAM 57163: resume read 0
STREAM 57163: read 0
STREAM 57163: need readable false
STREAM 57163: length less than watermark true
STREAM 57163: do read
STREAM 57163: flow true
STREAM 57163: read undefined
STREAM 57163: need readable true
STREAM 57163: length less than watermark true
STREAM 57163: reading or ended false
NEXTTICK 57163: ---------- TICK 2 ----------
STREAM 57163: ondata
DATA: 3
STREAM 57163: read 0
STREAM 57163: need readable true
STREAM 57163: length less than watermark true
STREAM 57163: do read
NEXTTICK 57163: ---------- TICK 3 ----------
STREAM 57163: ondata
DATA: 2
STREAM 57163: read 0
STREAM 57163: need readable true
STREAM 57163: length less than watermark true
STREAM 57163: do read
NEXTTICK 57163: ---------- TICK 4 ----------
STREAM 57163: ondata
DATA: 1
STREAM 57163: read 0
STREAM 57163: need readable true
STREAM 57163: length less than watermark true
STREAM 57163: do read
NEXTTICK 57163: ---------- TICK 5 ----------
STREAM 57163: emitReadable true
STREAM 57163: emit readable
STREAM 57163: flow true
STREAM 57163: read undefined
NEXTTICK 57163: ---------- TICK 6 ----------
STREAM 57163: cleanup
NEXTTICK 57163: ---------- TICK 7 ----------

```

## API

```js
var nextTick = require('debug-nexttick')

```

### nextTick(callback[, arg][, ...])
Print the sequence numbers of ticks in which `callback` will be called.

### nextTick.polyfill()
Replace `process.nextTick`.

