import { useState, useEffect } from 'react'
import axios from 'axios'
import { CurrencyTable } from './components/currenсyTable'
import { usePollingUpdate } from './hooks/usePolling'
import { DataResponse, MarketDataType } from './types'
import { findMinValue, roundValues } from './utils'

const initialState: MarketDataType<number[]> = {
  'RUB/CUPCAKE': [0, 0, 0],
  'USD/CUPCAKE': [0, 0, 0],
  'EUR/CUPCAKE': [0, 0, 0],
  'RUB/USD': [0, 0, 0],
  'RUB/EUR': [0, 0, 0],
  'EUR/USD': [0, 0, 0],
}

const initialMinValuesState = {} as MarketDataType<number>

const endpoints = [
  'http://localhost:3000/api/v1/first',
  'http://localhost:3000/api/v1/second',
  'http://localhost:3000/api/v1/third',
]

function App() {
  const [marketData, setMarketData] =
    useState<MarketDataType<number[]>>(initialState)
  const [minValues, setMinValues] = useState<MarketDataType<number>>(
    initialMinValuesState
  )

  const getData = async (endpointPoll = '') => {
    try {
      const responses = await Promise.all(
        endpoints.map(endpoint =>
          axios.get<DataResponse>(endpoint + endpointPoll)
        )
      )

      const data: MarketDataType<number[]> = {
        'RUB/CUPCAKE': roundValues(responses.map(({ data }) => data.rates.RUB)),
        'USD/CUPCAKE': roundValues(responses.map(({ data }) => data.rates.USD)),
        'EUR/CUPCAKE': roundValues(responses.map(({ data }) => data.rates.EUR)),
        'RUB/USD': roundValues(
          responses.map(({ data }) => data.rates.RUB / data.rates.USD)
        ),
        'RUB/EUR': roundValues(
          responses.map(({ data }) => data.rates.RUB / data.rates.EUR)
        ),
        'EUR/USD': roundValues(
          responses.map(({ data }) => data.rates.EUR / data.rates.USD)
        ),
      }

      setMarketData(data)
      setMinValues(findMinValue(data))
    } catch (error) {
      console.error('Не удалось получить данные')
    }
  }

  usePollingUpdate(() => getData('/poll'), 4000)

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='container'>
      <CurrencyTable data={marketData} minValues={minValues} />
    </div>
  )
}

export default App
