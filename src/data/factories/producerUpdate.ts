import { type Request, type Response } from 'express'
import { ProducerUpdateRepository } from '@/data/contracts/repositories'
import { ProducerUpdateService } from '@/data/services'
import { ProducerUpdateController } from '@/application/controllers'
import { PrismaService as DbService } from '@/infra'

export class ProducerUpdateFactory {
  async make (req: Request, res: Response): Promise<void> {
    const producerUpdateRepository = new ProducerUpdateRepository(new DbService())
    const producerUpdateService = new ProducerUpdateService(producerUpdateRepository)
    const producerUpdateController = new ProducerUpdateController(producerUpdateService)
    await producerUpdateController.handle(req, res)
  }
}
