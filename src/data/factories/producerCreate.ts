import { ProducerCreateRepository } from '@/data/contracts/repositories'
import { ProducerCreateService } from '@/data/services'
import { ProducerCreateController } from '@/application/controllers'
import { type Request, type Response } from 'express'
import { PrismaService as DbService } from '@/infra'

export class ProducerCreateFactory {
  async make (req: Request, res: Response): Promise<void> {
    const producerCreateRepository = new ProducerCreateRepository(new DbService())
    const producerCreateService = new ProducerCreateService(producerCreateRepository)
    const producerCreateController = new ProducerCreateController(producerCreateService)
    await producerCreateController.handle(req, res)
  }
}
