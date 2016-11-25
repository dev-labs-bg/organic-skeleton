const Plasma = require('organic-plasma')
const organicPlasmaFeedback = require('organic-plasma-feedback')
const Picture = require(`${process.cwd()}/cell/models/picture`)
const PictureManager = require(`${process.cwd()}/cell/organelles/picture-manager`)
let mockPictures = require(`${process.cwd()}/assets/mock/pictures`)

// picture manager dna
let plasma = organicPlasmaFeedback(new Plasma());
let dna;
let pictureManager;

describe('PictureManager', () => {

  beforeEach(() => {
    global.db.connect()
      .then(appDna => {
        // TODO: is dna organelle source always correct? 
        // What if we nest this file into another folder? Does we care?
        dna = appDna.processes.index.plasma['picture-manager']
      })
  })
  // insert some test data
  beforeEach(done => {
    // pictures
    Picture.create(mockPictures)
      .then(pictures => {
        // initialize standalone picture manager
        pictureManager = new PictureManager(plasma, dna)
        return done()
      })
      .catch(err => done(err))
  })

  afterEach(done => {
    global.db.drop().then(done)
  })

  it('handles find-pictures chemical', done => {
    plasma.emit({
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
    pictureManager.findPictures('flower', 0, 2, (err, result) => {
      expect(err).toBeNull()
      expect(result.length).toEqual(1)
      expect(result[0].name).toEqual('a flower')
      expect(result[0].path).toEqual('flower.jpeg')

      return done()
    })
  })

  it('finds the last picture with findPictures', done => {
    pictureManager.findPictures('', 4, 0, (err, result) => {
      expect(err).toBeNull()
      expect(result.length).toEqual(1)
      expect(result[0].name).toEqual('dawg food')

      return done()
    })
  })

})