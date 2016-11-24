const url = require('url')
const express = require('express')
const Organelle = require('../organelle')
const User = require('../../models/user')

class ExpressServer extends Organelle {
  
  constructor(plasma, dna, next) {
    super(plasma, dna)

    var app = express()
    app.set('x-powered-by', false)

    app.use('/static', express.static('/public'))

    app.use((req, res, next) => {

      // trim url parameters
      const urlPath = url.parse(req.url).pathname
      const reqRoute = `${req.method} ${urlPath}`
      if (dna.publicRoutes.includes(reqRoute)) return next()
      // find user by access token
      const authToken = (req.headers['authorization'] || '').trim()
      if (!authToken) {
        res.status(401)
        res.send({
          status: 'ERROR',
          msg: 'Missing Authorization header'
        })
        return next(true)
      }
      User.findOne({
        authToken: authToken
      }, function(err, user) {
        if (err) return next(err)
        if (!user) {
          // return error if not authorized
          res.status(401)
          res.send({
            status: 'ERROR',
            msg: 'Authorization token incorrect'
          })
          return next(true)
        }

        // attach authorized user to req
        // to access it in the next middlewares
        req.user = user

        return next()
      })
    })
    
    return next(null, app)
  }
}

module.exports = (plasma, dna, next) => {
  new ExpressServer(plasma, dna, next)
}