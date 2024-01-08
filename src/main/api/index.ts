import '../config/module-alias'
import { ProducerController } from '@/application/controllers/producer'

const p = new ProducerController()
console.log(p.listAll())
