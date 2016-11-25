const Plasma = require('organic-plasma')
const organicPlasmaFeedback = require('organic-plasma-feedback')
const Picture = require(`${process.cwd()}/cell/models/picture`)
const PictureManager = require(`${process.cwd()}/cell/organelles/picture-manager`)
const mockPictures = require(`${process.cwd()}/assets/mock/pictures`)

describe('PictureManager', () => {

  // connect database
  beforeEach(global.db.connect)

  // load dna for our organelle
  // we'll do this when we need
  // the DNA params in our code
  beforeEach(done => {
    global.loadOrganelleDna('processes.index.plasma.picture-manager', (err, organelleDna) => {
      if(err) return done(err)

      // save the dna for later use
      this.dna = organelleDna

      return done()
    })
  })

  // insert some test data
  beforeEach(done => {
    // pictures
    Picture.create(mockPictures)
      .then(pictures => {
        return done()
      })
      .catch(err => done(err))
  })

  // make a fake organelle
  beforeEach(done => {
    this.plasma = organicPlasmaFeedback(new Plasma());

    // initialize standalone picture manager
    this.pictureManager = new PictureManager(this.plasma, this.dna)

    return done()
  })

  afterEach(global.db.disconnect)

  it('handles find-pictures chemical', done => {
    this.plasma.emit({
      type: 'find-pictures',
      searchTerm: 'dog', 
      offset: 2,
      limit: 1
    }, (err, pictures) => {
      expect(err).toBeNull()
      expect(pictures.length).toEqual(0)

      return done()
    })
  })

  it('finds the flower picture with findPictures', done => {
    this.pictureManager.findPictures('flower', 0, 2, (err, result) => {
      expect(err).toBeNull()
      expect(result.length).toEqual(1)
      expect(result[0].name).toEqual('a flower')
      expect(result[0].path).toEqual('flower.jpeg')

      return done()
    })
  })

  it('finds the last picture with findPictures', done => {
    this.pictureManager.findPictures('', 4, 0, (err, result) => {
      expect(err).toBeNull()
      expect(result.length).toEqual(1)
      expect(result[0].name).toEqual('dawg food')

      return done()
    })
  })
})
