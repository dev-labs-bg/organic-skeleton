process.env.CELL_MODE = process.env.CELL_MODE || '_development'

var loadDna = require('organic-dna-loader')
var Cell = require('./cell')

module.exports = function buildCell(done) {
  loadDna((err, dna) => {
    if (err) {
      console.error(err)
      return done && done(err)
    }

    // build cell
    var cell = new Cell(dna)
    // initialize cell organelles
    cell.plasma.emit({ type: 'build', branch: 'processes.index.membrane' }, (err) => {
      if (err) throw err
      cell.plasma.emit({ type: 'build', branch: 'processes.index.plasma' }, (err) => {
        if (err) throw err
        
        return done && done(null, cell)
      })
    })
  })
}

// initialize right away if loaded as index file in node
if(!module.parent) module.exports()