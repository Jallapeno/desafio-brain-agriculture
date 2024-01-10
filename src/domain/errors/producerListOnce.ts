export class ProducerListOnceError extends Error {
  constructor () {
    super('Error to list producer')
    this.name = 'ProducerListOnceError'
  }
}
