import { type Request, type Response } from 'express'
import { ProducerCreateController } from '@/application/controllers/producerCreate'
import { type ProducerCreateService } from '@/data/services'
import { ProducerError } from '@/domain/errors'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('ProducerCreateController', () => {
  let sut: ProducerCreateController
  let producerCreateService: MockProxy<ProducerCreateService>
  let req: Partial<Request>
  let res: Partial<Response>
  const producerCreateData = {
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
    producerCreateService = mock<ProducerCreateService>()
    sut = new ProducerCreateController(producerCreateService)
    req = {
      body: producerCreateData
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })

  it('should return 201 with result when ProducerCreateService performs successfully', async () => {
    const expectedResult = { ...producerCreateData, id: 1 }
    producerCreateService.perform.mockResolvedValue(expectedResult)

    await sut.handle(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(expectedResult)
  })

  it('should return 400 with error message when ProducerCreateService throws ProducerCreateError', async () => {
    const expectedErrorMessage = 'Error to create a new producer'
    producerCreateService.perform.mockRejectedValue(new ProducerError(
      'Error to create a new producer',
      '@ProducerCreateRepository'))

    await sut.handle(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: expectedErrorMessage })
  })

  it('should return 400 with default error message when ProducerCreateService throws an unknown error', async () => {
    producerCreateService.perform.mockRejectedValue(new ProducerError('Unknown error'))

    await sut.handle(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Unknown error' })
  })
})
