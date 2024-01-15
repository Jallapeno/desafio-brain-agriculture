import { type Request, type Response } from 'express'
import { type ProducerCreateService } from '@/data/services'
import { isValidCpfCnpj } from '@/utils/validators'

export class ProducerCreateController {
  constructor (private readonly producerCreateService: ProducerCreateService) {}

  async handle (req: Request, res: Response): Promise<void> {
    const { body } = req
    if (body.arableArea + body.vegetationArea > body.totalArea) {
      res.status(400).json({ error: 'The sum of arable area and vegetation must not be greater than the total area of the farm' })
      return
    }
    if (!isValidCpfCnpj(body.cpfCnpj)) {
      res.status(400).json({ error: 'Invalid CPF or CNPJ' })
      return
    }
    try {
      const result = await this.producerCreateService.perform(body)
      res.status(201).json(result)
    } catch (error) {
      res.status(error.statusCode).json({ error: error.message })
    }
  }
}
