import { MarketDataType } from '../types'

export const roundValues = (values: number[]): number[] => {
  return values.map(value => parseFloat(value.toFixed(3)))
}

export const findMinValue = <T extends MarketDataType<number>>(
  data: MarketDataType<number[]>
): T => {
  return Object.entries(data).reduce<T>((res, [key, values]) => {
    const minValue = Math.min(...values)
    res[key as keyof MarketDataType<number>] = minValue
    return res
  }, {} as T)
}
