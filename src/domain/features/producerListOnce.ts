import { type Producer } from '@prisma/client'
import { type ProducerListOnceError } from '@/domain/errors'

export interface ProducerListOnce {
  perform: (params: ProducerListOnce.Params) => Promise<ProducerListOnce.Result>
}

export namespace ProducerListOnce {
  export type Params = {
    id: number
  }

  export type Result = Producer | ProducerListOnceError
}
