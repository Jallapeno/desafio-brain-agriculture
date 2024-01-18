import { type Request, type Response, type NextFunction } from 'express'
import { ProducerError } from '@/domain/errors'

export function errorHandler (err: Error, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof ProducerError) {
    // Trata os erros específicos do domínio
    res.status(err.statusCode).json({ error: err.message })
  } else {
    // Trata outros tipos de erros
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
