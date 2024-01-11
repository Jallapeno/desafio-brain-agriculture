export class ProducerError extends Error {
  constructor (message?: string, name?: string) {
    super(message ?? 'Server Error')
    this.name = name ?? 'Server Error'
  }
}
