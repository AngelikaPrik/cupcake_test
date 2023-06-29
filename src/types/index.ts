export interface MarketDataType {
  'RUB/CUPCAKE': number[]
  'USD/CUPCAKE': number[]
  'EUR/CUPCAKE': number[]
  'RUB/USD': number[]
  'RUB/EUR': number[]
  'EUR/USD': number[]
}

export interface DataResponse {
  rates: {
    RUB: number
    USD: number
    EUR: number
  }
  base: string
  timestamp: number
  date: string
}
