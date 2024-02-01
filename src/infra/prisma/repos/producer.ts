import { ConectionError } from '@/infra/errors'
import { type ProducerListOnce, type ProducerCreate, type ProducerUpdate, type ProducerList } from '@/domain/features'
import { PrismaClient } from '@prisma/client'

// Classe de serviço para encapsular as operações do Prisma
export class PrismaService {
  private readonly prisma: PrismaClient
  private readonly errorMessage = 'Connection DB error'
  constructor () {
    this.prisma = new PrismaClient()
  }

  async getAllProducers (): Promise<ProducerList.Result[]> {
    try {
      const result = await this.prisma.producer.findMany()
      return result
    } catch (error) {
      throw new ConectionError(this.errorMessage, '@PrismaService/getAllProducers', 500)
    } finally {
      await this.disconnect()
    }
  }

  async createProducer (params: ProducerCreate.Params): Promise<ProducerCreate.Result> {
    try {
      const result = await this.prisma.producer.create({
        data: params
      })
      return result
    } catch (error) {
      throw new ConectionError(this.errorMessage, '@PrismaService/createProducer', 500)
    } finally {
      await this.disconnect()
    }
  }

  async listById (id: number): Promise<ProducerListOnce.Result | null> {
    try {
      const result = await this.prisma.producer.findUnique({ where: { id } })
      return result
    } catch (error) {
      throw new ConectionError(this.errorMessage, '@PrismaService/listById', 500)
    } finally {
      await this.disconnect()
    }
  }

  async updateProducerById (id: number, params: ProducerUpdate.Params): Promise<ProducerUpdate.Result> {
    try {
      const result = await this.prisma.producer.update({ where: { id }, data: params })
      return result
    } catch (error) {
      throw new ConectionError(this.errorMessage, '@PrismaService/updateProducerById', 500)
    } finally {
      await this.disconnect()
    }
  }

  async disconnect (): Promise<void> {
    await this.prisma.$disconnect()
  }
}
