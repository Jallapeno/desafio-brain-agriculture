import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import {
  DashboardRepository,
  ProducerCreateRepository,
  ProducerListOnceRepository,
  ProducerListRepository,
  ProducerUpdateRepository
} from '@/data/contracts/repositories'
import {
  DashboardService,
  ProducerCreateService,
  ProducerListOnceService,
  ProducerListService,
  ProducerUpdateService
} from '@/data/services'
import {
  DashboardController,
  ProducerCreateController,
  ProducerListCrontroller,
  ProducerListOnceController,
  ProducerUpdateController
} from '@/application/controllers'

export const producerRouter = Router()
const prisma = new PrismaClient()
// dashboard
const dashboardRepository = new DashboardRepository(prisma)
const dashboardService = new DashboardService(dashboardRepository)
const dashboardController = new DashboardController(dashboardService)
producerRouter.get('/producer/dashboard', async (req, res) => dashboardController.handle(req, res))
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
// producer list by id
const producerListOnceRepository = new ProducerListOnceRepository(prisma)
const producerListOnceService = new ProducerListOnceService(producerListOnceRepository)
const producerListOnceController = new ProducerListOnceController(producerListOnceService)
producerRouter.get('/producer/:id', async (req, res) => producerListOnceController.handle(req, res))
