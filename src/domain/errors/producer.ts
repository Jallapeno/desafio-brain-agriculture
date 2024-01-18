export class ProducerError extends Error {
  statusCode: number

  constructor (message: string = 'Server Error', name: string = 'Server Error', statusCode: number = 500) {
    super(message)
    this.name = name
    this.statusCode = statusCode
  }
}
