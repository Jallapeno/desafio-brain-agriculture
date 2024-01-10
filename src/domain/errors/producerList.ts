export class ProducerListError extends Error {
  constructor () {
    super('Error to list all producers')
    this.name = 'ProducerListError'
  }
}
