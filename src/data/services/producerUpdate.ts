import { type ProducerUpdate } from '@/domain/features'
import { type ProducerUpdateRepository } from '@/data/contracts/repositories'

export class ProducerUpdateService {
  constructor (private readonly producerUpdateRepository: ProducerUpdateRepository) { }

  async perform (id: number, params: ProducerUpdate.Params): Promise<ProducerUpdate.Result> {
    return await this.producerUpdateRepository.perform(id, params)
  }
}
