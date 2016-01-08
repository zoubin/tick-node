#!/usr/bin/env node

var Command = require('commander').Command
var program = new Command('tick')
var path = require('path')

program
  .version(require('../package.json').version)
  .usage(' main_script')
  .option('-C, --no-color', 'Suppress colorful splitters.')
  .parse(process.argv)

var env = [process.env.NODE_DEBUG, 'nexttick'].filter(Boolean)
process.env.NODE_DEBUG = env.join(',')

require('..').polyfill({ color: program.color })

Promise.resolve(program.args[0])
  .then(function (file) {
    require(path.resolve(file))
  })
  .catch(function (err) {
    console.error(err.message)
    process.exit(-1)
  })

