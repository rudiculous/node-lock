# node-lock

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

A library to manage locks.

##  Installation
`npm install @rdcl/lock`

## Usage
```javascript
import { requestLock } from '@rdcl/lock'

const lock1 = await requestLock('myLockName') // no timeout
const lock2 = await requestLock('myLockName', 1000) // timeout after 1 second

// ...

lock1.release()
lock2.release()
```

## Tests
`npm test`


[npm-image]: https://img.shields.io/npm/v/@rdcl/lock.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@rdcl/lock
[travis-image]: https://img.shields.io/travis/rudiculous/node-lock/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/rudiculous/node-lock
[coveralls-image]: https://img.shields.io/coveralls/rudiculous/node-lock/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/rudiculous/node-lock?branch=master
