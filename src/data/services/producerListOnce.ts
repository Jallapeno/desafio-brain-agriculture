import { type ProducerListOnce } from '@/domain/features'
import { type ProducerListOnceRepository } from '@/data/contracts/repositories'

export class ProducerListOnceService {
  constructor (
    private readonly producerListOnceRepository: ProducerListOnceRepository
  ) { }

  async perform (params: ProducerListOnce.Params): Promise<ProducerListOnce.Result | null> {
    return await this.producerListOnceRepository.perform(params)
  }
}
