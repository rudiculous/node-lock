'use strict'

const expect = require('chai').expect
const lock = require('..')

describe('#lock.requestLock', () => {
  it('should return a promise which resolves when existing locks have been released', done => {
    const activeLocks = {
      lock1: null,
      lock2: null,
      lock3: null,
    }

    function checkIfDone() {
      if (activeLocks.lock2 === false && activeLocks.lock3 === false) {
        done()
      }
    }

    lock.requestLock('test2')
      .then(lock1 => {
        activeLocks.lock1 = true

        lock.requestLock('test2')
          .then(lock2 => {
            activeLocks.lock2 = true

            expect(activeLocks.lock1).to.be.false
            expect(activeLocks.lock3).to.not.be.true

            setTimeout(() => {
              activeLocks.lock2 = false
              lock2.release()

              checkIfDone()
            }, 5)
          })
          .catch(done)

        lock.requestLock('test2')
          .then(lock3 => {
            activeLocks.lock3 = true

            expect(activeLocks.lock1).to.be.false
            expect(activeLocks.lock2).to.not.be.true

            setTimeout(() => {
              activeLocks.lock3 = false
              lock3.release()

              checkIfDone()
            }, 5)
          })
          .catch(done)

        setTimeout(() => {
          activeLocks.lock1 = false
          lock1.release()
        }, 5)
      })
      .catch(done)
  })
})
