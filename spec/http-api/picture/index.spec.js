const request = require('request')
const Picture = require('../../../cell/models/picture')
let mockPictures = require(`${process.cwd()}/assets/mock/pictures`)

describe('GET /picture', () => {

  // insert some test data
  beforeEach(done => {
    Picture.create(mockPictures)
      .then(pictures => done())
      .catch(err => done(err))
  })
  beforeAll(global.startApi)

  afterAll(global.stopApi)

  it('works', done => {
    request({
      url: `${apiRoot}/picture`,
      headers: {
        'Authorization': global.user.authToken
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