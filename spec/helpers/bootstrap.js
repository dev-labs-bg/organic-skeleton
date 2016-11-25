/**
 * Test helpers
 */

const mongoose = require('mongoose')
const loadDna = require('organic-dna-loader')
const User = require('../../cell/models/user')
let mockUser = require(`${process.cwd()}/assets/mock/users`)[0]

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

global.startApi = done => {
  buildCell((err, cell) => {
    if (err) throw new Error('Cell build error', err)
    global.cell = cell
    // wait for api ready event to kick in
    global.cell.plasma.on('ExpressHttpApi', () => {
      // insert test data
      db.insertUser(mockUser)
        .then(user => {
          global.user = user

          return done()
        })
        .catch(err => done(err))
    })
  })
}

global.stopApi = done => {
  db.disconnect(err => {
    if(err) return done(err)
    global.cell.kill()
    return done()
  })
}

global.db = {
  connect(done) {
    loadDna((err, dna) => {
      if (err) return done(err)

      const db = dna.processes.index.plasma.mongoose.database
      const dbLocation = `mongodb://${db.host}:${db.port}/${db.name}`

      mongoose.connect(dbLocation, err => {
        if (err) return done(err)

        return done()
      })
    })
  },

  // returns promise
  insertUser(userData) {
    return User.create(userData)
    .then(user => {
      return user
    })
  },

  disconnect(done) {
    if (mongoose.connection.readyState) {
      mongoose.connection.db.dropDatabase(() => {
        mongoose.disconnect(err => {
          if (err) return done(err)

          return mongoose.connection.once("disconnected", done)
        })
      })
    } else {
      done(new Error("connection already closed"))
    }
  }
}

global.loadOrganelleDna = (pathToOrganelle, done) => {
  loadDna((err, dna) => {
    if (err) return done(err)

    var fallbackDna = {}
    var resolvedDna = dna

    pathToOrganelle.split('.').forEach((element) => {
      if (typeof resolvedDna[element] === 'undefined') {
        resolvedDna = fallbackDna
        return false
      }

      resolvedDna = resolvedDna[element]
    })

    done(null, resolvedDna)
  })
}
