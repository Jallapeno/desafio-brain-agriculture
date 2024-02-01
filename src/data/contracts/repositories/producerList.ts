import { ProducerListError } from '@/domain/errors'
import { type ProducerList } from '@/domain/features'
import { type PrismaService as DbService } from '@/infra'

export class ProducerListRepository {
  private readonly dbService: DbService

  constructor (dbService: DbService) {
    this.dbService = dbService
  }

  async perform (): Promise<ProducerList.Result[] | null> {
    try {
      const result = await this.dbService.getAllProducers()
      return result
    } catch (error) {
      throw new ProducerListError()
    }
  }
}
