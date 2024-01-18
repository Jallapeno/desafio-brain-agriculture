import { type Producer } from '@prisma/client'
import { type ProducerListError } from '@/domain/errors'

export interface ProducerList {
  perform: () => Promise<ProducerList.Result>
}

export namespace ProducerList {
  export type Result = Producer | ProducerListError
}
