const request = require('request')

describe('POST /users', () => {
  beforeAll(global.startApi)

  afterAll(global.stopApi)

  it('works with pictureUrl', done => {
    request({
      url: `${apiRoot}/users/${global.user._id}`,
      headers: {
        'Authorization': global.user.authToken
      },
      method: 'POST',
      body: {
        pictureUrl: 'test-pic.jpeg'
      },
      json: true
    }, (err, res, body) => {
      expect(err).toBeNull()
      expect(res.statusCode).toEqual(200)
      expect(res.body.status).toEqual('OK')

      return done()
    })
  })

  it('doesn\'t save a picture when user is not you', done => {
    const notMyUserId = 'imjusthackingtryingstuffhere'
    request({
      url: `${apiRoot}/users/${notMyUserId}`,
      headers: {
        'Authorization': global.user.authToken
      },
      method: 'POST',
      body: {
        pictureUrl: 'test-pic.jpeg'
      },
      json: true
    }, (err, res, body) => {
      expect(err).toBeNull()
      expect(res.statusCode).toEqual(500)
      expect(res.body.trim()).toEqual('User not matched')

      return done()
    })
  })
})