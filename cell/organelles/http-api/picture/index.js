module.exports = (plasma, dna, helpers) => {
  return {
    'GET': (req, res, next) => {

      const chemical = {
        searchTerm: req.query.q,
        offset: req.query.offset,
        limit: req.query.limit
      }
      plasma.emit(chemical, (err, pictures) => {
        if (err) return next(err)

        res.body = {
          status: 'OK',
          data: {
            similarity: similarity
          }
        }

        return next()
      })
    }
  }
}