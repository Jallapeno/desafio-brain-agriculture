import { type ProducerCreateError } from '@/domain/errors'

export interface ProducerCreate {
  perform: (params: ProducerCreate.Params) => Promise<ProducerCreate.Result>
}

export namespace ProducerCreate {
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

  export type Result = {
    id: number
    cpfCnpj: string
    name: string
    farmName: string
    city: string
    state: string
    totalArea: number
    arableArea: number
    vegetationArea: number
    crops: string[]
  } | ProducerCreateError
}
