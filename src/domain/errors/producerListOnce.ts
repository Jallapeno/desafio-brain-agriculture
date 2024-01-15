export class ProducerListOnceError extends Error {
  statusCode: number
  constructor () {
    super('Error to list producer by id')
    this.name = 'ProducerListOnceError'
    this.statusCode = 500
  }
}
