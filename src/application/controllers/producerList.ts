import { type Request, type Response } from 'express'
import { type ProducerListService } from '@/data/services'

export class ProducerListCrontroller {
  constructor (private readonly producerListService: ProducerListService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const result = await this.producerListService.perform()
      res.status(201).json(result)
    } catch (error) {
      res.status(error.statusCode).json({ error: error.message })
    }
  }
}
