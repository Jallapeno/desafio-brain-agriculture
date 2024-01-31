import { type ProducerListOnceError } from '@/domain/errors'

export interface ProducerListOnce {
  perform: (params: ProducerListOnce.Params) => Promise<ProducerListOnce.Result>
}

export namespace ProducerListOnce {
  export type Params = {
    id: number
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
  } | ProducerListOnceError
}
