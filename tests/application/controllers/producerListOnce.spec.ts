import { type Request, type Response } from 'express'
import { type ProducerListOnceService } from '@/data/services'
import { mock, type MockProxy } from 'jest-mock-extended'
import { ProducerListOnceError } from '@/domain/errors'

class ProducerListOnceController {
  constructor (private readonly producerListOnceService: ProducerListOnceService) {}

  async handle (req: Request, res: Response): Promise<void> {
    const { params } = req
    const idToNumber = parseInt(params.id)
    try {
      const result = await this.producerListOnceService.perform(idToNumber)
      res.status(201).json(result)
    } catch (error) {
      res.status(error.statusCode).json({ error: error.message })
    }
  }
}

describe('ProducerListOnceController', () => {
  let sut: ProducerListOnceController
  let producerListOnceService: MockProxy<ProducerListOnceService>
  let req: Partial<Request>
  let res: Partial<Response>
  const producerData = {
    id: 1,
    cpfCnpj: 'any_cpf',
    name: 'any_name',
    farmName: 'any_farmname',
    city: 'any_city',
    state: 'any_state',
    totalArea: 100,
    arableArea: 100,
    vegetationArea: 100,
    crops: ['any_crop', 'any_crop2', 'any_crop3']
  }
  beforeEach(() => {
    producerListOnceService = mock()
    sut = new ProducerListOnceController(producerListOnceService)
    req = {
      params: { id: '1' }
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })
  it('should return 201 with result when ProducerListOnceController performs successfully', async () => {
    producerListOnceService.perform.mockResolvedValue(producerData)

    await sut.handle(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(producerData)
  })

  it('should return 500 with default error message when ProducerListOnceController throws an unknown error', async () => {
    producerListOnceService.perform.mockRejectedValue(new ProducerListOnceError())

    await sut.handle(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Error to list producer by id' })
  })
})
