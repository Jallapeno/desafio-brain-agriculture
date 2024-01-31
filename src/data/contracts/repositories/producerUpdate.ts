import { ProducerError } from '@/domain/errors'
import { type ProducerUpdate } from '@/domain/features'
import { type PrismaService as DbService } from '@/infra'

export class ProducerUpdateRepository {
  private readonly dbService: DbService

  constructor (dbService: DbService) {
    this.dbService = dbService
  }

  async perform (id: number, params: ProducerUpdate.Params): Promise<ProducerUpdate.Result> {
    try {
      const result = await this.dbService.updateProducerById(id, params)
      return result
    } catch (error) {
      throw new ProducerError('Database connection error', '@ProducerUpdateRepository', 500)
    }
  }
}
