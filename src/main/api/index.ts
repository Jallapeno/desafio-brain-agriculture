import '../config/module-alias'
import express from 'express'
import bodyParser from 'body-parser'
import { producerRouter } from './routes/producer'

const app = express()

app.use(bodyParser.json())

app.use('/api', producerRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
