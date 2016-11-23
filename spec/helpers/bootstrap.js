/**
 * Test helpers
 */

const mongoose = require('mongoose')
const User = require('../../cell/models/user')

// test environment
process.env.CELL_MODE = '_test'

// configure mongoose to use native Promises
// Note: using ES6 Promises in other environments require organic-mongoose support
mongoose.Promise = global.Promise

// dependencies
var buildCell = require('../../index')

// attach helpers to node global object
global.cell = null
global.user = null

global.apiRoot = 'http://localhost:8080'

global.startApi = (done) => {
  buildCell((err, cell) => {
    if (err) throw new Error('Cell build error', err)
    global.cell = cell
    // wait for api ready event to kick in
    global.cell.plasma.on('ExpressHttpApi', () => {
      // insert test data
      testData.init()
        .then(user => {
          global.user = user

          return done()
        })
    })
  })
}

global.stopApi = (done) => {
  testData.destroy()
    .then(() => {
      global.cell.kill()
      return done()
    })
}

const testData = {
  // returns promise
  init(done) {
    return User.create({
      name: 'Cvetinodjukati Bemaina',
      picture: 'http://i49.vbox7.com/o/56b/56bc377c160.jpg',
      authToken: 'TEST'
    })
    .then(user => {
      return user
    })
    .catch(err => done(err))
  },
  
  // returns a promise
  destroy() {
    return mongoose.connection.db.dropDatabase()
  }
}

