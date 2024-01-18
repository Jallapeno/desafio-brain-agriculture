import { type Request, type Response } from 'express'
import { type PrismaClient } from '@prisma/client'
import { ProducerListRepository } from '@/data/contracts/repositories'
import { ProducerListService } from '@/data/services'
import { ProducerListCrontroller } from '@/application/controllers'

export class ProducerListFactory {
  async make (req: Request, res: Response, prisma: PrismaClient): Promise<void> {
    const producerListRepository = new ProducerListRepository(prisma)
    const producerListService = new ProducerListService(producerListRepository)
    const producerListController = new ProducerListCrontroller(producerListService)
    await producerListController.handle(req, res)
  }
}
