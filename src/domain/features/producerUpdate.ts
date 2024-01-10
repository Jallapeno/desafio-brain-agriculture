import { type Producer } from '@prisma/client'
import { type ProducerUpdateError } from '@/domain/errors'

export interface ProducerUpdate {
  perform: (id: number, params: ProducerUpdate.Params) => Promise<ProducerUpdate.Result>
}

export namespace ProducerUpdate {
  export type Params = {
    cpfCnpj: string
    name: string
    farmName: string
    city: string
    state: string
    totalArea: number
    arableArea: number
    vegetationArea: number
    crops: string[]
  }

  export type Result = Producer | ProducerUpdateError
}
