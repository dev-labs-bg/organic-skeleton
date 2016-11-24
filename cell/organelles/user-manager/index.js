const Organelle = require('../organelle')
const User = require('../../models/user')

class UserManager extends Organelle {

  constructor(plasma, dna) {
    super(plasma, dna)

    this.on('save-picture', (c, done) => {
      this.savePicture(c.userId, c.pictureUrl, done)
    })
  }

  savePicture(userId, pictureUrl, done) {
    User
      .findOneAndUpdate({
        _id: userId
      }, {
        picture: pictureUrl
      }, (err, pictures) => {
        if (err) return done(err)
        return done(null, pictures)
      })
  }
}

module.exports = UserManager