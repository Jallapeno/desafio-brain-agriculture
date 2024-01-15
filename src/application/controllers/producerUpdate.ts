import { type Request, type Response } from 'express'
import { type ProducerUpdateService } from '@/data/services'
import { isValidCpfCnpj } from '@/utils/validators'

export class ProducerUpdateController {
  constructor (private readonly producerUpdateService: ProducerUpdateService) {}

  async handle (req: Request, res: Response): Promise<void> {
    const { body, params } = req
    const idToNumber = parseInt(params.id)
    if (body.arableArea + body.vegetationArea > body.totalArea) {
      res.status(400).json({ error: 'The sum of arable area and vegetation must not be greater than the total area of the farm' })
      return
    }
    if (!isValidCpfCnpj(body.cpfCnpj)) {
      res.status(400).json({ error: 'Invalid CPF or CNPJ' })
      return
    }
    try {
      const result = await this.producerUpdateService.perform(idToNumber, body)
      res.status(201).json(result)
    } catch (error) {
      res.status(error.statusCode).json({ error: error.message })
    }
  }
}
