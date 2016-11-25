describe('bootstrap.js', () => {

  it('loadOrganelleDna works when path exists', done => {
    global.loadOrganelleDna('processes.index.plasma.picture-manager', (err, organelleDna) => {
      expect(err).toBeNull()
      expect(organelleDna).not.toBeNull()
      expect(organelleDna.name).toBe('PictureManager')
      expect(organelleDna.source).toBe('../../cell/organelles/picture-manager')

      return done()
    })
  })

  it('loadOrganelleDna works when path doesn\'t exist', done => {
    global.loadOrganelleDna('processes.index.something-non-existent-here', (err, organelleDna) => {
      expect(err).toBeNull()
      expect(organelleDna).not.toBeNull()
      // toEqual will make a deep equal here, toBe would make a non-deep equal
      expect(organelleDna).toEqual({})

      return done()
    })
  })
})
