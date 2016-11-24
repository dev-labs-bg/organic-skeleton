const qs = require('querystring')
const request = require('request')
const User = require('../../../cell/models/user')
const Picture = require('../../../cell/models/picture')
let mockPictures = require('./mockPictures')

const mockAuthToken = 'opensesame'

describe('GET /picture', () => {

  // insert some test data
  beforeEach(done => {
    User.create({
      name: 'Seto Kaiba',
      picture: 'http://vignette3.wikia.nocookie.net/yugioh/images/6/65/SetoKaibaMD.png',
      authToken: mockAuthToken
    })
    .then(() => {
      return Picture.create(mockPictures)
        .then(pictures => done())
    })
    .catch(err => done(err))
  })
  beforeAll(global.startApi)

  afterAll(global.stopApi)

  it('works', done => {
    const params = qs.stringify({
      q: 'dawg',
      offset: 1,
      limit: 2
    })
    request({
      url: `${apiRoot}/picture`,
      headers: {
        'Authorization': mockAuthToken
      },
      qs: {
        q: 'dawg',
        offset: 1,
        limit: 2
      },
      json: true
    }, (err, res, body) => {
      expect(err).toBeNull()
      expect(res.statusCode).toEqual(200)
      expect(res.body.status).toEqual('OK')
      expect(res.body.data).toBeDefined()
      expect(res.body.data.length).toEqual(2)
      expect(res.body.data[0].name).toEqual('my dawg')
      expect(res.body.data[1].name).toEqual('dawg lost')

      return done()
    })
  })
})