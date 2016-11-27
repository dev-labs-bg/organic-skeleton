const request = require('request')
const User = require('../../cell/models/user')

describe('user-manager', () => {
  beforeAll(global.startApi)

  afterAll(global.stopApi)

  it('saves a picture for a user', (done) => {
    // Make sure user's picture is not already our test value
    expect(global.user.picture).not.toBe('test-url')

    const chemical = {
      type: 'save-picture',
      userId: global.user._id,
      pictureUrl: 'test-url'
    }
    // Emit to plasma to save a user's picture
    global.cell.plasma.emit(chemical, (err) => {
      // Check if the picture is properly updated in the database
      User.findOne({
        _id: global.user._id
      }, (err, user) => {
        if(err) return done(err)

        expect(user.picture).toBe('test-url')

        return done()
      })
    })
  })
})