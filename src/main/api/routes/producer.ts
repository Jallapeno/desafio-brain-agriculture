import { Router } from 'express'
// producer create
import { ProducerCreateController } from '@/application/controllers/producerCreate'
import { PrismaClient } from '@prisma/client'
import { ProducerCreateRepository } from '@/data/contracts/repositories/producerCreate'
import { ProducerCreateService } from '@/data/services/producerCreate'
// producer update
import { ProducerListRepository, ProducerUpdateRepository } from '@/data/contracts/repositories'
import { ProducerListService, ProducerUpdateService } from '@/data/services'
import { ProducerListCrontroller, ProducerUpdateController } from '@/application/controllers'
// producer list all

export const producerRouter = Router()
const prisma = new PrismaClient()
// producer create
const producerCreateRepository = new ProducerCreateRepository(prisma)
const producerCreateService = new ProducerCreateService(producerCreateRepository)
const producerCreateController = new ProducerCreateController(producerCreateService)
producerRouter.post('/producer', async (req, res) => producerCreateController.handle(req, res))
// producer Update
const producerUpdateRepository = new ProducerUpdateRepository(prisma)
const producerUpdateService = new ProducerUpdateService(producerUpdateRepository)
const producerUpdateController = new ProducerUpdateController(producerUpdateService)
producerRouter.put('/producer/:id', async (req, res) => producerUpdateController.handle(req, res))
// producer list all
const producerListRepository = new ProducerListRepository(prisma)
const producerListService = new ProducerListService(producerListRepository)
const producerListController = new ProducerListCrontroller(producerListService)
producerRouter.get('/producer', async (req, res) => producerListController.handle(req, res))
