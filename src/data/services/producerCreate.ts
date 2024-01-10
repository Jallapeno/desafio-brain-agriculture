import { type ProducerCreate } from '@/domain/features'
import { type ProducerCreateRepository } from '@/data/contracts/repositories'

export class ProducerCreateService {
  constructor (private readonly producerCreateRepository: ProducerCreateRepository) { }

  async perform (params: ProducerCreate.Params): Promise<ProducerCreate.Result> {
    return await this.producerCreateRepository.perform(params)
  }
}
