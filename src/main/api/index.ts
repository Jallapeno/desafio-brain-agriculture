import '../config/module-alias'
import express from 'express'
import bodyParser from 'body-parser'
import { producerRouter } from './routes/producer'
import { HttpExceptionHandler } from '@/application/errors'

const app = express()

app.use(bodyParser.json())

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  HttpExceptionHandler.handle(err, req, res, next)
})

app.use('/api', producerRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
