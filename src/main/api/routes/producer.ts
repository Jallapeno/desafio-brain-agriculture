import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import {
  DashboardFactory,
  ProducerCreateFactory,
  ProducerListFactory,
  ProducerListOnceFactory,
  ProducerUpdateFactory
} from '@/data/factories'

const dashboardFactory = new DashboardFactory()
const producerCreateFactory = new ProducerCreateFactory()
const producerListOnceFactory = new ProducerListOnceFactory()
const producerUpdateFactory = new ProducerUpdateFactory()
const producerListFactory = new ProducerListFactory()

export const producerRouter = Router()
const prisma = new PrismaClient()
// dashboard
producerRouter.get('/producer/dashboard', async (req, res) => dashboardFactory.make(req, res, prisma))
// producer create
producerRouter.post('/producer', async (req, res) => producerCreateFactory.make(req, res, prisma))
// producer Update
producerRouter.put('/producer/:id', async (req, res) => producerUpdateFactory.make(req, res, prisma))
// producer list all
producerRouter.get('/producer', async (req, res) => producerListFactory.make(req, res, prisma))
// producer list by id
producerRouter.get('/producer/:id', async (req, res) => producerListOnceFactory.make(req, res, prisma))
