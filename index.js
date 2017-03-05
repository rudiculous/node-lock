'use strict'

/** @type {Object.<string, Lock>} */
const locks = {}

class Lock {

  /**
   * @param {string} name
   */
  constructor(name) {
    Object.defineProperties(this, {
      name: {
        enumerable: true,
        value: name,
      },
      promise: {
        enumerable: true,
        value: new Promise(resolve => {
          Object.defineProperties(this, {
            _resolve: { value: resolve },
          })
        })
      },
    })
  }

  /**
   * Release the lock.
   */
  release() {
    this._resolve()
    delete locks[this.name]
  }

}

/**
 * Requests a lock.
 *
 * @param {string} name
 * @param {number} [timeout]
 * @return {Promise.<Lock>}
 */
function requestLock(name, timeout = null) {
  if (locks[name] == null) {
    return Promise.resolve(locks[name] = new Lock(name))
  }

  return new Promise((resolve, reject) => {
    let timeoutRef = null
    if (timeout != null) {
      timeoutRef = setTimeout(() => {
        reject(new Error('A timeout occurred.'))
      }, timeout)
    }

    locks[name].promise
      .then(() => {
        resolve(requestLock(name))
        clearTimeout(timeoutRef)
      })
  })
}

exports.requestLock = requestLock
