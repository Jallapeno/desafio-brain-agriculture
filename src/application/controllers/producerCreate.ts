import { type Request, type Response } from 'express'

import { type ProducerCreateService } from '@/data/services'
import { type ProducerCreate } from '@/domain/features'

export class ProducerCreateController {
  constructor (private readonly producerCreateService: ProducerCreateService) {}

  async handle (req: Request, res: Response): Promise<void> {
    const { body } = req
    try {
      const result: ProducerCreate.Result = await this.producerCreateService.perform(body)
      res.status(201).json(result)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}
