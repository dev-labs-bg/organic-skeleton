const Organelle = require('../organelle')
const Picture = require('../../models/picture')

class PictureManager extends Organelle {

  constructor(plasma, dna) {
    super(plasma, dna)
    
    this.on('find-pictures', (c, done) => {
      this.findPictures(c.searchTerm, c.offset, c.limit, done)
    })
  }

  findPictures(searchTerm, offset, limit, done) {
    // TODO: bussiness logic
    return done()
  }
}

module.exports = PictureManager