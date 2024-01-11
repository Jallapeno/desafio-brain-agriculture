import { type ProducerCreate } from '@/domain/features'
import { type ProducerCreateRepository } from '@/data/contracts/repositories'
import { ProducerError } from '@/domain/errors'

export class ProducerCreateService {
  constructor (private readonly producerCreateRepository: ProducerCreateRepository) { }

  async perform (params: ProducerCreate.Params): Promise<ProducerCreate.Result> {
    if (params.arableArea + params.vegetationArea <= params.totalArea) {
      return await this.producerCreateRepository.perform(params)
    }
    return new ProducerError(
      'The sum of arable area and vegetation must not be greater than the total area of the farm',
      '@ProducerCreateService'
    )
  }
}
