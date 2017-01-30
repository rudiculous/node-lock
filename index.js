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
 * @return {Promise.<Lock>}
 */
function requestLock(name) {
  if (locks[name] == null) {
    return Promise.resolve(locks[name] = new Lock(name))
  }

  return locks[name].promise.then(() => requestLock(name))
}

exports.requestLock = requestLock
