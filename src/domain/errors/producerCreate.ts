export class ProducerCreateError extends Error {
  statusCode: number
  constructor () {
    super('Error to create new producer')
    this.name = 'ProducerCreateError'
    this.statusCode = 500
  }
}
