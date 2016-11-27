module.exports = (plasma, dna, helpers) => {
  return {
    'POST /:userId': (req, res, next) => {
      // check for invalid requests
      if(req.user._id.toString() !== req.params.userId) {
        return next('User not matched')
      }

      const chemical = {
        type: 'save-picture',
        userId: req.user._id,
        pictureUrl: req.body.pictureUrl
      }
      plasma.emit(chemical, (err) => {
        if (err) return next(err)

        res.body = {
          status: 'OK',
        }

        return next()
      })
    }
  }
}