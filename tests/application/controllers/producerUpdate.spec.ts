import { type Request, type Response } from 'express'
import { type ProducerUpdateService } from '@/data/services'
import { ProducerUpdateError } from '@/domain/errors'
import { mock, type MockProxy } from 'jest-mock-extended'
import { ProducerUpdateController } from '@/application/controllers'

describe('ProducerUpdateController', () => {
  let sut: ProducerUpdateController
  let producerUpdateService: MockProxy<ProducerUpdateService>
  let req: Partial<Request>
  let res: Partial<Response>
  const producerUpdateData = {
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
    producerUpdateService = mock()
    sut = new ProducerUpdateController(producerUpdateService)
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })

  it('should return 201 with result when ProducerUpdateService performs successfully', async () => {
    req = {
      body: producerUpdateData,
      params: { id: '1' }
    }
    const expectedResult = { ...producerUpdateData, id: 1 }
    producerUpdateService.perform.mockResolvedValue(expectedResult)

    await sut.handle(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(expectedResult)
  })

  it('should return 500 with default error message when ProducerUpdateService throws an unknown error', async () => {
    req = {
      body: producerUpdateData,
      params: { id: '1' }
    }
    producerUpdateService.perform.mockRejectedValue(new ProducerUpdateError())

    await sut.handle(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Error to update a producer' })
  })

  it('should return 400 when total area is exceeded', async () => {
    req = {
      body: producerUpdateData,
      params: { id: '1' }
    }
    producerUpdateData.totalArea = 100
    producerUpdateData.vegetationArea = 100
    producerUpdateData.arableArea = 100
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
      },
      params: { id: '1' }
    }
    await sut.handle(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid CPF or CNPJ' })
  })
})
