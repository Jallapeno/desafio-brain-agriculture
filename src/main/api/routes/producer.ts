import { Router } from 'express'
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
// dashboard
producerRouter.get('/producer/dashboard', async (req, res, next) => {
  try {
    await dashboardFactory.make(req, res)
  } catch (error) {
    next(error)
  }
})
// producer create
producerRouter.post('/producer', async (req, res, next) => {
  try {
    await producerCreateFactory.make(req, res)
  } catch (error) {
    next(error)
  }
})
// producer Update
producerRouter.put('/producer/:id', async (req, res, next) => {
  try {
    await producerUpdateFactory.make(req, res)
  } catch (error) {
    next(error)
  }
})
// producer list all
producerRouter.get('/producer', async (req, res, next) => {
  try {
    await producerListFactory.make(req, res)
  } catch (error) {
    next(error)
  }
})
// producer list by id
producerRouter.get('/producer/:id', async (req, res, next) => {
  try {
    await producerListOnceFactory.make(req, res)
  } catch (error) {
    next(error)
  }
})
