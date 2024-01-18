import { type Request, type Response } from 'express'
import { type PrismaClient } from '@prisma/client'
import { ProducerUpdateRepository } from '@/data/contracts/repositories'
import { ProducerUpdateService } from '@/data/services'
import { ProducerUpdateController } from '@/application/controllers'

export class ProducerUpdateFactory {
  async make (req: Request, res: Response, prisma: PrismaClient): Promise<void> {
    const producerUpdateRepository = new ProducerUpdateRepository(prisma)
    const producerUpdateService = new ProducerUpdateService(producerUpdateRepository)
    const producerUpdateController = new ProducerUpdateController(producerUpdateService)
    await producerUpdateController.handle(req, res)
  }
}
