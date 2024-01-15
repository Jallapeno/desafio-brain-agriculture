import { type Request, type Response } from 'express'
import { type ProducerListService } from '@/data/services'
import { mock, type MockProxy } from 'jest-mock-extended'
import { ProducerListError } from '@/domain/errors'

class ProducerListCrontroller {
  constructor (private readonly producerListService: ProducerListService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const result = await this.producerListService.perform()
      res.status(201).json(result)
    } catch (error) {
      res.status(error.statusCode).json({ error: error.message })
    }
  }
}

describe('ProducerListCrontroller', () => {
  let sut: ProducerListCrontroller
  let producerListService: MockProxy<ProducerListService>
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
    producerListService = mock()
    sut = new ProducerListCrontroller(producerListService)
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })
  it('should return 201 with result when ProducerListCrontroller performs successfully', async () => {
    const expectedResult = [producerData]
    producerListService.perform.mockResolvedValue(expectedResult)

    await sut.handle(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(expectedResult)
  })

  it('should return 500 with default error message when ProducerListCrontroller throws an unknown error', async () => {
    producerListService.perform.mockRejectedValue(new ProducerListError())

    await sut.handle(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Error to list all producers' })
  })
})
