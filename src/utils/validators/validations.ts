import { type Request, type Response } from 'express'
import { isValidCpfCnpj } from './cpfCnpjValidator'

export function validateArea (req: Request, res: Response): boolean {
  const { body } = req

  if (body.arableArea + body.vegetationArea > body.totalArea) {
    res.status(400).json({ error: 'The sum of arable area and vegetation must not be greater than the total area of the farm' })
    return false
  }

  return true
}

export function validateCpfCnpj (req: Request, res: Response): boolean {
  const { body } = req

  if (!isValidCpfCnpj(body.cpfCnpj)) {
    res.status(400).json({ error: 'Invalid CPF or CNPJ' })
    return false
  }

  return true
}
