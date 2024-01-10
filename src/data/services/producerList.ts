import { type ProducerList } from '@/domain/features'
import { type ProducerListRepository } from '@/data/contracts/repositories'

export class ProducerListService {
  constructor (private readonly producerListRepository: ProducerListRepository) { }

  async perform (): Promise<ProducerList.Result | null> {
    return await this.producerListRepository.perform()
  }
}
