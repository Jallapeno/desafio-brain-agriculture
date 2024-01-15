export class ProducerUpdateError extends Error {
  statusCode: number
  constructor () {
    super('Error to update a producer')
    this.name = 'ProducerUpdateError'
    this.statusCode = 500
  }
}
