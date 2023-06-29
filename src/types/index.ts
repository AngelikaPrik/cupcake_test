export interface MarketDataType<T> {
  'RUB/CUPCAKE': T
  'USD/CUPCAKE': T
  'EUR/CUPCAKE': T
  'RUB/USD': T
  'RUB/EUR': T
  'EUR/USD': T
}

export interface DataValueResponse {
  rates: {
    RUB: number
    USD: number
    EUR: number
  }
  base: string
  timestamp: number
  date: string
}

export interface DataResponse {
  data: DataValueResponse
  status: 'fulfilled' | 'rejected'
}
