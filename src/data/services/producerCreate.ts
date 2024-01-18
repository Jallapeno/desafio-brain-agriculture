import { type ProducerCreate } from '@/domain/features'
import { type ProducerCreateRepository } from '@/data/contracts/repositories'
import { ProducerCreateError } from '@/domain/errors'

export class ProducerCreateService {
  constructor (private readonly producerCreateRepository: ProducerCreateRepository) { }

  async perform (params: ProducerCreate.Params): Promise<ProducerCreate.Result> {
    try {
      return await this.producerCreateRepository.perform(params)
    } catch (error) {
      throw new ProducerCreateError()
    }
  }
}
