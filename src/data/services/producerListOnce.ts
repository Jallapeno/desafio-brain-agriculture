import { type ProducerListOnce } from '@/domain/features'
import { type ProducerListOnceRepository } from '@/data/contracts/repositories'
import { ProducerListOnceError } from '@/domain/errors'

export class ProducerListOnceService {
  constructor (
    private readonly producerListOnceRepository: ProducerListOnceRepository
  ) { }

  async perform (id: number): Promise<ProducerListOnce.Result | null> {
    try {
      return await this.producerListOnceRepository.perform(id)
    } catch (error) {
      throw new ProducerListOnceError()
    }
  }
}
