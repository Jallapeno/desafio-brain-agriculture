export class ProducerListError extends Error {
  statusCode: number
  constructor () {
    super('Error to list all producers')
    this.name = 'ProducerListError'
    this.statusCode = 500
  }
}
