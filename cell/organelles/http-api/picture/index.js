module.exports = (plasma, dna, helpers) => {
  return {
    'GET': (req, res, next) => {

      // pictureManager organelle will now do the heavy processing
      const chemical = {
        type: 'find-pictures',
        searchTerm: req.query.q,
        offset: req.query.offset,
        limit: req.query.limit
      }
      plasma.emit(chemical, (err, pictures) => {
        if (err) return next(err)

        // keep only what's needed from pictures
        pictures = Array.from(pictures, picture => {
          const { name, path } = picture
          return { name, path }
        })

        res.body = {
          status: 'OK',
          data: pictures
        }

        return next()
      })
    }
  }
}