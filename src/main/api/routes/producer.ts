import { Router } from 'express'
// producer create
import { ProducerCreateController } from '@/application/controllers/producerCreate'
import { PrismaClient } from '@prisma/client'
import { ProducerCreateRepository } from '@/data/contracts/repositories/producerCreate'
import { ProducerCreateService } from '@/data/services/producerCreate'
// producer update
import { ProducerUpdateRepository } from '@/data/contracts/repositories'
import { ProducerUpdateService } from '@/data/services'
import { ProducerUpdateController } from '@/application/controllers'

export const producerRouter = Router()
const prisma = new PrismaClient()
// producer create
const producerCreateRepository = new ProducerCreateRepository(prisma)
const producerCreateService = new ProducerCreateService(producerCreateRepository)
const producerCreateController = new ProducerCreateController(producerCreateService)
// producer Update
const producerUpdateRepository = new ProducerUpdateRepository(prisma)
const producerUpdateService = new ProducerUpdateService(producerUpdateRepository)
const producerUpdateController = new ProducerUpdateController(producerUpdateService)

producerRouter.post('/producer', async (req, res) => producerCreateController.handle(req, res))
producerRouter.put('/producer/:id', async (req, res) => producerUpdateController.handle(req, res))
