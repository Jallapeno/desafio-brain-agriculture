import { type Request, type Response } from 'express'
import { type ProducerCreateService } from '@/data/services'
import { validateArea, validateCpfCnpj } from '@/utils/validators/validations'

export class ProducerCreateController {
  constructor (private readonly producerCreateService: ProducerCreateService) {}

  async handle (req: Request, res: Response): Promise<void> {
    const { body } = req
    const isAreaValid = validateArea(req, res)
    const isCpfCnpjValid = validateCpfCnpj(req, res)
    if (!isAreaValid || !isCpfCnpjValid) {
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
