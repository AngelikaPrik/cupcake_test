import { MarketDataType } from '../types'

export const roundValues = (values: number[]): number[] => {
  return values.map(value => parseFloat(value.toFixed(3)))
}

export const findMinValue = (data: MarketDataType): number => {
  const allValues = Object.values(data).flat()
  return Math.min(...allValues)
}
