var Plasma = require('organic-plasma')
var Nucleus = require('organic-nucleus')
var organicPlasmaFeedback = require('organic-plasma-feedback')

module.exports = class Cell {
  
  constructor(dna) {
    // create plasma with emit callback support
    this.plasma = organicPlasmaFeedback(new Plasma())
    // create nucleus
    var nucleus = new Nucleus(this.plasma, dna)

    // organelles build listener
    this.plasma.on('build', (c, callback) => {
      nucleus.build(c, callback)
    })

    // external process kill listener
    this.sigintHandler = () => {
      this.kill()
    }
    process.on('SIGINT', this.sigintHandler)
  }

  kill() {
    process.removeListener('SIGINT', this.sigintHandler)
    this.plasma.emit('kill')
  }
}