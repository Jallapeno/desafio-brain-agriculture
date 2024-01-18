import { type Request, type Response } from 'express'
import { type ProducerListOnceService } from '@/data/services'

export class ProducerListOnceController {
  constructor (private readonly producerListOnceService: ProducerListOnceService) {}

  async handle (req: Request, res: Response): Promise<void> {
    const { params } = req
    const idToNumber = parseInt(params.id)
    try {
      const result = await this.producerListOnceService.perform(idToNumber)
      res.status(201).json(result)
    } catch (error) {
      res.status(error.statusCode).json({ error: error.message })
    }
  }
}
