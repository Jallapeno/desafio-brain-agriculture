import { type Producer } from '@prisma/client'
import { type ProducerCreateError } from '@/domain/errors'

export interface ProducerCreate {
  perform: (params: ProducerCreate.Params) => Promise<ProducerCreate.Result>
}

namespace ProducerCreate {
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

  export type Result = Producer | ProducerCreateError
}
