const request = require('request')

describe('GET /', () => {
  beforeAll(global.startApi)

  afterAll(global.stopApi)

  it('works', (done) => {
    request(apiRoot, (err, res, body) => {
      expect(err).toBeNull()
      expect(res.statusCode).toEqual(200)
      expect(body).toContain('<form')

      return done()
    })
  })
})