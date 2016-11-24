process.env.CELL_MODE = process.env.CELL_MODE || '_development'

const loadDna = require('organic-dna-loader')
const mongoose = require('mongoose')
// models
const User = require(`${process.cwd()}/cell/models/user`)
const Picture = require(`${process.cwd()}/cell/models/picture`)
// seed data
const seedUsers = require(`${process.cwd()}/assets/mock/users`)
const seedPictures = require(`${process.cwd()}/assets/mock/pictures`)

/**
 * Task configuration
 */
loadDna((err, dna) => {
  if (err) throw err.message
  const db = dna.processes.index.plasma.mongoose.database
  const dbLocation = `mongodb://${db.host}:${db.port}/${db.name}`

  // connect to db
  mongoose.connect(dbLocation, err => {
    if (err) throw err.message

    run(err => {
      if (err) throw err.message
      mongoose.disconnect(() => console.log('Done!'))
    })
  })
})

/**
 * Task implementation
 */
function run(done) {
  // remove all users
  User.remove((err, removed) => {
    if (err) return done(err)
    console.log(`Removed ${removed.result.n} users.`)
    // add seed users
    User.create(seedUsers, (err, users) => {
      if (err) return done(err)
      console.log(`Inserted ${users.length} users.`)

      // remove all pictures
      Picture.remove((err, removed) => {
        if (err) return done(err)
        console.log(`Removed ${removed.result.n} pictures.`)
        // add seed pictures
        Picture.create(seedPictures, (err, picrures) => {
          if (err) return done(err)
          console.log(`Inserted ${picrures.length} picrures.`)
          return done()
        })
      })
    })
  })
}