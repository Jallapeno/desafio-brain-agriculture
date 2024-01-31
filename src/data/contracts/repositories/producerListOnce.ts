// import { type ProducerListOnceError } from '@/domain/errors'
import { ConectionError } from '@/domain/errors'
import { type ProducerListOnce } from '@/domain/features'
import { type PrismaService as DbService } from '@/infra'

export class ProducerListOnceRepository {
  private readonly dbService: DbService

  constructor (dbService: DbService) {
    this.dbService = dbService
  }

  async perform (id: number): Promise<ProducerListOnce.Result | null> {
    try {
      const result = await this.dbService.listById(id)
      return result
    } catch (error) {
      throw new ConectionError('Error to list producer by id', '@ProducerListOnceRepository', 500)
    }
  }
}
