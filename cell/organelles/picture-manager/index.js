const Organelle = require('../organelle')
const Picture = require('../../models/picture')

class PictureManager extends Organelle {

  constructor(plasma, dna) {
    super(plasma, dna)
    
    this.on('find-pictures', (c, done) => {
      this.findPictures(c.searchTerm, c.offset, c.limit, done)
    })
  }

  findPictures(searchTerm, offset = 0, limit = 0, done) {
    Picture
      .find({
        name: new RegExp(searchTerm, 'i')
      })
      .skip(offset)
      .limit(limit)
      .exec((err, pictures) => {
        if (err) return done(err)
        return done(null, pictures)
      })
  }
}

module.exports = PictureManager