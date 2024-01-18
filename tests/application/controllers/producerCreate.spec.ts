import { type Request, type Response } from 'express'
import { ProducerCreateController } from '@/application/controllers'
import { type ProducerCreateService } from '@/data/services'
import { ProducerCreateError } from '@/domain/errors'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('ProducerCreateController', () => {
  let sut: ProducerCreateController
  let producerCreateService: MockProxy<ProducerCreateService>
  let req: Partial<Request>
  let res: Partial<Response>
  const producerCreateData = {
    cpfCnpj: '37550108013',
    name: 'any_name',
    farmName: 'any_farmname',
    city: 'any_city',
    state: 'any_state',
    totalArea: 400,
    arableArea: 100,
    vegetationArea: 100,
    crops: ['any_crop', 'any_crop2', 'any_crop3']
  }

  beforeEach(() => {
    producerCreateService = mock()
    sut = new ProducerCreateController(producerCreateService)
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })

  it('should return 201 with result when ProducerCreateService performs successfully', async () => {
    req = {
      body: producerCreateData
    }
    const expectedResult = { ...producerCreateData, id: 1 }
    producerCreateService.perform.mockResolvedValue(expectedResult)

    await sut.handle(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(expectedResult)
  })

  it('should return 500 with default error message when ProducerCreateService throws an unknown error', async () => {
    req = {
      body: producerCreateData
    }
    producerCreateService.perform.mockRejectedValue(new ProducerCreateError())

    await sut.handle(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Error to create new producer' })
  })

  it('should return 400 when total area is exceeded', async () => {
    req = {
      body: producerCreateData
    }
    producerCreateData.totalArea = 100
    producerCreateData.vegetationArea = 100
    producerCreateData.arableArea = 100
    await sut.handle(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'The sum of arable area and vegetation must not be greater than the total area of the farm' })
  })

  it('should return 400 when CPF or CNPJ is invalid', async () => {
    req = {
      body: {
        cpfCnpj: '12345678912',
        name: 'any_name',
        farmName: 'any_farmname',
        city: 'any_city',
        state: 'any_state',
        totalArea: 400,
        arableArea: 100,
        vegetationArea: 100,
        crops: ['any_crop', 'any_crop2', 'any_crop3']
      }
    }
    await sut.handle(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid CPF or CNPJ' })
  })
})
