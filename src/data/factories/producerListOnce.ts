import { type Request, type Response } from 'express'
import { type PrismaClient } from '@prisma/client'
import { ProducerListOnceRepository } from '@/data/contracts/repositories'
import { ProducerListOnceService } from '@/data/services'
import { ProducerListOnceController } from '@/application/controllers'

export class ProducerListOnceFactory {
  async make (req: Request, res: Response, prisma: PrismaClient): Promise<void> {
    const producerListOnceRepository = new ProducerListOnceRepository(prisma)
    const producerListOnceService = new ProducerListOnceService(producerListOnceRepository)
    const producerListOnceController = new ProducerListOnceController(producerListOnceService)
    await producerListOnceController.handle(req, res)
  }
}
