import { type Response, type Request, type NextFunction } from 'express'

export class HttpExceptionHandler extends Error {
  static handle (error: Error, req: Request, res: Response, next: NextFunction): void {
    console.error(error)

    if (error instanceof HttpException) {
      res.status(error.statusCode).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export class HttpException extends Error {
  constructor (public readonly statusCode: number, message: string) {
    super(message)
  }
}
