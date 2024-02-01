export function isValidCPF (cpf: string): boolean {
  // Remover caracteres não numéricos
  cpf = cpf.replace(/\D/g, '')

  // Verificar se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false
  }

  // Verificar se é uma sequência repetida
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false
  }

  // Calcular primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i)
  }

  let remainder = 11 - (sum % 11)
  remainder = remainder > 9 ? 0 : remainder

  // Verificar primeiro dígito verificador
  if (parseInt(cpf.charAt(9)) !== remainder) {
    return false
  }

  // Calcular segundo dígito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i)
  }

  remainder = 11 - (sum % 11)
  remainder = remainder > 9 ? 0 : remainder

  // Verificar segundo dígito verificador
  if (parseInt(cpf.charAt(10)) !== remainder) {
    return false
  }

  return true
}
