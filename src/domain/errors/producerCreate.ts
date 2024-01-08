export class ProducerCreateError extends Error {
  constructor () {
    super('Error to create new producer')
    this.name = 'ProducerCreateError'
  }
}
