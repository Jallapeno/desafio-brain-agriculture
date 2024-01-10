export class ProducerUpdateError extends Error {
  constructor () {
    super('Error to update a producer')
    this.name = 'ProducerUpdateError'
  }
}
