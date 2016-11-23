module.exports = class Organelle {
  
  constructor(plasma, dna) {
    this.plasma = plasma
    this.dna = dna
  }
  
  emit(chemical, callback) {
    this.plasma.emit(chemical, callback)
  }
  
  on(chemicalType, handler) {
    this.plasma.on(chemicalType, handler, this)
  }

  once(chemicalType, handler) {
    this.plasma.once(chemicalType, handler, this)
  }

  off(chemicalType, handler) {
    this.plasma.off(chemicalType, handler, this)
  }
}