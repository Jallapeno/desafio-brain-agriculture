import { isValidCNPJ, isValidCPF } from './index'

export function isValidCpfCnpj (cpfCnpj: string): boolean {
  const cleanedValue = cpfCnpj.replace(/[^\d]/g, '')

  if (cleanedValue.length === 11) {
    // Se o tamanho for 11, considera como CPF
    return isValidCPF(cleanedValue)
  } else if (cleanedValue.length === 14) {
    // Se o tamanho for 14, considera como CNPJ
    return isValidCNPJ(cleanedValue)
  } else {
    // Tamanho inválido, não é nem CPF nem CNPJ
    return false
  }
}
