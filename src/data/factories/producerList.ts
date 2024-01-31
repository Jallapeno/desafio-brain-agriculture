import { type Request, type Response } from 'express'
import { ProducerListRepository } from '@/data/contracts/repositories'
import { ProducerListService } from '@/data/services'
import { ProducerListCrontroller } from '@/application/controllers'
import { PrismaService as DbService } from '@/infra'

export class ProducerListFactory {
  async make (req: Request, res: Response): Promise<void> {
    const producerListRepository = new ProducerListRepository(new DbService())
    const producerListService = new ProducerListService(producerListRepository)
    const producerListController = new ProducerListCrontroller(producerListService)
    await producerListController.handle(req, res)
  }
}
