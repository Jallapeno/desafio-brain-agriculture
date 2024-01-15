import { type ProducerList } from '@/domain/features'
import { type ProducerListRepository } from '@/data/contracts/repositories'
import { ProducerListError } from '@/domain/errors'

export class ProducerListService {
  constructor (private readonly producerListRepository: ProducerListRepository) { }

  async perform (): Promise<ProducerList.Result | null> {
    try {
      return await this.producerListRepository.perform()
    } catch (error) {
      throw new ProducerListError()
    }
  }
}
