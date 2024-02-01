import { type Request, type Response } from 'express'
import { type ProducerUpdateService } from '@/data/services'
import { validateArea, validateCpfCnpj } from '@/utils/validators/validations'

export class ProducerUpdateController {
  constructor (private readonly producerUpdateService: ProducerUpdateService) {}

  async handle (req: Request, res: Response): Promise<void> {
    const { body, params } = req
    const idToNumber = parseInt(params.id)
    const isAreaValid = validateArea(req, res)
    const isCpfCnpjValid = validateCpfCnpj(req, res)
    if (!isAreaValid || !isCpfCnpjValid) {
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
