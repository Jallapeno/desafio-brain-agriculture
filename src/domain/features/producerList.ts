import { type ProducerListError } from '@/domain/errors'

export interface ProducerList {
  perform: () => Promise<ProducerList.Result>
}

export namespace ProducerList {
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
  } | ProducerListError
}
