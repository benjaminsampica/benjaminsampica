'use strict'

var test = require('tap').test
var readfile = require('../')

test('works with encoding as string', function(t) {
  readfile(__filename, 'utf8', function(err, buf) {
    t.ifError(err)
    t.end()
  })
})

test('works with encoding as object', function(t) {
  readfile(__filename, {
    encoding: 'utf8'
  }, function(err, buf) {
    t.ifError(err)
    t.end()
  })
})

test('works with opts without encoding', function(t) {
  readfile(__filename, {
    flags: 'r'
  }, function(err, buf) {
    t.ifError(err)
    t.end()
  })
})

test('works with two args', function(t) {
  readfile(__filename, function(err, buf) {
    t.ifError(err)
    t.end()
  })
})

test('throws the same way fs.readFile does', function(t) {
  t.throws(function() {
    readfile(__filename, true, function(err) {

    })
  })
  t.end()
})
