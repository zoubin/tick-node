# debug-nexttick
[![version](https://img.shields.io/npm/v/debug-nexttick.svg)](https://www.npmjs.org/package/debug-nexttick)
[![status](https://travis-ci.org/zoubin/debug-nexttick.svg?branch=master)](https://travis-ci.org/zoubin/debug-nexttick)

Print the tick number in debug mode.

## Usage

### Command line

```bash
npm install -g debug-nexttick

tick-node -V

```

[example/cli.js](example/cli.js):
```js
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

**Output**:

```
⌘ NODE_DEBUG=stream tick-node example/cli.js
STREAM 59690: pipe count=1 opts=undefined
STREAM 59690: resume
---------- TICK 1 ----------
STREAM 59690: resume read 0
STREAM 59690: read 0
STREAM 59690: need readable false
STREAM 59690: length less than watermark true
STREAM 59690: do read
STREAM 59690: flow true
STREAM 59690: read undefined
STREAM 59690: need readable true
STREAM 59690: length less than watermark true
STREAM 59690: reading or ended false
---------- TICK 2 ----------
STREAM 59690: ondata
DATA: 3
STREAM 59690: read 0
STREAM 59690: need readable true
STREAM 59690: length less than watermark true
STREAM 59690: do read
---------- TICK 3 ----------
STREAM 59690: ondata
DATA: 2
STREAM 59690: read 0
STREAM 59690: need readable true
STREAM 59690: length less than watermark true
STREAM 59690: do read
---------- TICK 4 ----------
STREAM 59690: ondata
DATA: 1
STREAM 59690: read 0
STREAM 59690: need readable true
STREAM 59690: length less than watermark true
STREAM 59690: do read
---------- TICK 5 ----------
STREAM 59690: emitReadable true
STREAM 59690: emit readable
STREAM 59690: flow true
STREAM 59690: read undefined
---------- TICK 6 ----------
STREAM 59690: cleanup
---------- TICK 7 ----------

```


### API

[example/api.js](example/api.js):

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
⌘ NODE_DEBUG=stream,nexttick node example/api.js
STREAM 59678: pipe count=1 opts=undefined
STREAM 59678: resume
---------- TICK 1 ----------
STREAM 59678: resume read 0
STREAM 59678: read 0
STREAM 59678: need readable false
STREAM 59678: length less than watermark true
STREAM 59678: do read
STREAM 59678: flow true
STREAM 59678: read undefined
STREAM 59678: need readable true
STREAM 59678: length less than watermark true
STREAM 59678: reading or ended false
---------- TICK 2 ----------
STREAM 59678: ondata
DATA: 3
STREAM 59678: read 0
STREAM 59678: need readable true
STREAM 59678: length less than watermark true
STREAM 59678: do read
---------- TICK 3 ----------
STREAM 59678: ondata
DATA: 2
STREAM 59678: read 0
STREAM 59678: need readable true
STREAM 59678: length less than watermark true
STREAM 59678: do read
---------- TICK 4 ----------
STREAM 59678: ondata
DATA: 1
STREAM 59678: read 0
STREAM 59678: need readable true
STREAM 59678: length less than watermark true
STREAM 59678: do read
---------- TICK 5 ----------
STREAM 59678: emitReadable true
STREAM 59678: emit readable
STREAM 59678: flow true
STREAM 59678: read undefined
---------- TICK 6 ----------
STREAM 59678: cleanup
---------- TICK 7 ----------

```

## API

```js
require('debug-nexttick').polyfill()

```

### polyfill(options)
`process.nextTick` will be hacked to print tick info.

**options.color**

Specify whether print colorful splitters.

Type: `Boolean`

