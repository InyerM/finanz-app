import moment from 'moment'
import 'moment/locale/es' 

export type LongFormat = 'LTS' | 'LT' | 'L' | 'LL' | 'LLL' | 'LLLL' | 'lts' | 'lt' | 'l' | 'll' | 'lll' | 'llll'

export const formatDate = (date: Date | string, format: LongFormat, locale: string) => {
  return moment(date).locale(locale).format(format)
}