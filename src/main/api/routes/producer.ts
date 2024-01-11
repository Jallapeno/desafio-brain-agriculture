import { Router } from 'express'
import { ProducerCreateController } from '@/application/controllers/producerCreate'
import { PrismaClient } from '@prisma/client'
import { ProducerCreateRepository } from '@/data/contracts/repositories/producerCreate'
import { ProducerCreateService } from '@/data/services/producerCreate'

export const producerRouter = Router()
const prisma = new PrismaClient()
const producerCreateRepository = new ProducerCreateRepository(prisma)
const producerCreateService = new ProducerCreateService(producerCreateRepository)
const producerCreateController = new ProducerCreateController(producerCreateService)

producerRouter.post('/producer', async (req, res) => producerCreateController.handle(req, res))
