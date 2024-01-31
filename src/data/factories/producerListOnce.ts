import { type Request, type Response } from 'express'
import { ProducerListOnceRepository } from '@/data/contracts/repositories'
import { ProducerListOnceService } from '@/data/services'
import { ProducerListOnceController } from '@/application/controllers'
import { PrismaService as DbService } from '@/infra'

export class ProducerListOnceFactory {
  async make (req: Request, res: Response): Promise<void> {
    const producerListOnceRepository = new ProducerListOnceRepository(new DbService())
    const producerListOnceService = new ProducerListOnceService(producerListOnceRepository)
    const producerListOnceController = new ProducerListOnceController(producerListOnceService)
    await producerListOnceController.handle(req, res)
  }
}
