const DATE_UNITS: Record<string, number> = {
  year: 31536000,
  month: 2592000,
  days: 86400, // 9000 / 86400 = 1.041666 => 1 day
  hours: 3600,
  minutes: 60,
  seconds: 1
} as const

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

export function getRelativeTime (epochTime: number) {
  // inicio de tiempo => depende * 1000 debemos verificar si la api nos dvuelve en UNIX timestamp(*1000) o en milisegundos.
  const started = new Date(epochTime * 1000).getTime()
  // ahora
  const now = new Date().getTime()

  const elapsed = (started - now) / 1000

  for (const unit in DATE_UNITS) {
    const absoluteElapsed = Math.abs(elapsed)

    if (absoluteElapsed > DATE_UNITS[unit] || unit === 'second') {
      return rtf.format(
        Math.floor(elapsed / DATE_UNITS[unit]),
        unit as Intl.RelativeTimeFormatUnit
      )
    }
  }

  return ''
}
