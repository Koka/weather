import { IntlShape } from 'react-intl'

export const formatCelsius = (intl: IntlShape, temp: number) => {
  const numberPart = intl.formatNumber(Math.round(temp), {
    signDisplay: 'always',
    notation: 'standard',
    useGrouping: false,
  })

  return `${numberPart}\u00B0C`
}
