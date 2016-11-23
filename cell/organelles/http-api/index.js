const fs = require('fs')

module.exports = (plasma, dna, helpers) => {
  return {
    'GET': (req, res, next) => {

      fs.readFile(`${process.cwd()}/assets/views/index.html`, (err, page) => {
        if (err) return next(err)
        res.write(page)
        res.end()

        return next()
      })
    }
  }
}