export function isValidCNPJ (cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]/g, '')

  if (cnpj.length !== 14 || /^(.)\1+$/.test(cnpj)) {
    return false
  }

  const digits = cnpj.split('').map(digit => parseInt(digit))

  const validateDigit = (digits: number[], length: number): number => {
    let sum = 0
    let pos = length - 7

    for (let i = length; i >= 1; i--) {
      sum += digits[length - i] * pos--
      if (pos < 2) {
        pos = 9
      }
    }

    const result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    return result
  }

  const firstDigit = validateDigit(digits, 12)
  const secondDigit = validateDigit([...digits, firstDigit], 13)

  return digits[12] === firstDigit && digits[13] === secondDigit
}
