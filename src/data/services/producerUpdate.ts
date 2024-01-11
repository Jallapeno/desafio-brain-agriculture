import { type ProducerUpdate } from '@/domain/features'
import { type ProducerUpdateRepository } from '@/data/contracts/repositories'
import { ProducerUpdateError } from '@/domain/errors'

export class ProducerUpdateService {
  constructor (private readonly producerUpdateRepository: ProducerUpdateRepository) { }

  async perform (id: number, params: ProducerUpdate.Params): Promise<ProducerUpdate.Result> {
    if (params.arableArea + params.vegetationArea <= params.totalArea) {
      return await this.producerUpdateRepository.perform(id, params)
    }
    return new ProducerUpdateError()
  }
}
