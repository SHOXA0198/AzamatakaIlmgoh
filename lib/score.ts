// Simple score conversions
export function convertIELTS(raw: number, total: number) {
  // Normalize to 40-scale if needed
  const r = total === 40 ? raw : Math.round(raw * (40/total))
  // Approx table for Listening/Reading
  if (r >= 39) return '9.0 band'
  if (r >= 37) return '8.5 band'
  if (r >= 35) return '8.0 band'
  if (r >= 32) return '7.5 band'
  if (r >= 30) return '7.0 band'
  if (r >= 26) return '6.5 band'
  if (r >= 23) return '6.0 band'
  if (r >= 18) return '5.5 band'
  if (r >= 16) return '5.0 band'
  if (r >= 13) return '4.5 band'
  if (r >= 10) return '4.0 band'
  if (r >= 7)  return '3.5 band'
  if (r >= 5)  return '3.0 band'
  if (r >= 3)  return '2.5 band'
  if (r >= 2)  return '2.0 band'
  if (r >= 1)  return '1.0 band'
  return '0 band'
}

export function convertCEFR(raw: number, total: number) {
  const ratio = total ? raw/total : 0
  if (ratio < 0.25) return 'A1'
  if (ratio < 0.4)  return 'A2'
  if (ratio < 0.6)  return 'B1'
  if (ratio < 0.75) return 'B2'
  if (ratio < 0.9)  return 'C1'
  return 'C2'
}

export function convertSAT(raw: number, total: number) {
  const scaled = 400 + Math.round((raw/(total||1)) * 1200)
  return String(scaled)
}

export function convertScore(raw: number, total: number, type: string) {
  if (type === 'IELTS') return convertIELTS(raw, total)
  if (type === 'CEFR') return convertCEFR(raw, total)
  if (type === 'SAT')  return convertSAT(raw, total)
  return String(raw)
}
