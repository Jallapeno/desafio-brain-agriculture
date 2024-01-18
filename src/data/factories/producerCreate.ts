import { ProducerCreateRepository } from '@/data/contracts/repositories'
import { ProducerCreateService } from '@/data/services'
import { ProducerCreateController } from '@/application/controllers'
import { type Request, type Response } from 'express'
import { type PrismaClient } from '@prisma/client'

export class ProducerCreateFactory {
  async make (req: Request, res: Response, prisma: PrismaClient): Promise<void> {
    const producerCreateRepository = new ProducerCreateRepository(prisma)
    const producerCreateService = new ProducerCreateService(producerCreateRepository)
    const producerCreateController = new ProducerCreateController(producerCreateService)
    await producerCreateController.handle(req, res)
  }
}
