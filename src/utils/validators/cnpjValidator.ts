export function isValidCNPJ (cnpj: string): boolean {
  // Remover caracteres não numéricos
  cnpj = cnpj.replace(/\D/g, '')

  // Verificar se o CNPJ tem 14 dígitos
  if (cnpj.length !== 14) {
    return false
  }

  // Calcular primeiro dígito verificador
  let sum = 0
  let factor = 5
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * factor
    factor = factor === 2 ? 9 : factor - 1
  }

  let remainder = sum % 11
  remainder = remainder < 2 ? 0 : 11 - remainder

  // Verificar primeiro dígito verificador
  if (parseInt(cnpj.charAt(12)) !== remainder) {
    return false
  }

  // Calcular segundo dígito verificador
  sum = 0
  factor = 6
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * factor
    factor = factor === 2 ? 9 : factor - 1
  }

  remainder = sum % 11
  remainder = remainder < 2 ? 0 : 11 - remainder

  // Verificar segundo dígito verificador
  if (parseInt(cnpj.charAt(13)) !== remainder) {
    return false
  }

  return true
}
