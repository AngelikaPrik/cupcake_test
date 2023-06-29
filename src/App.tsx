import { useState, useEffect } from 'react'
import axios from 'axios'
import { CurrencyTable } from './components/currenсyTable'
import { usePollingUpdate } from './hooks/usePolling'
import { IMarketDataType } from './types'
import { findMinValue, roundValues } from './utils'

const initialState: IMarketDataType = {
  'RUB/CUPCAKE': [0, 0, 0],
  'USD/CUPCAKE': [0, 0, 0],
  'EUR/CUPCAKE': [0, 0, 0],
}

const endpoints = [
  'http://localhost:3000/api/v1/first',
  'http://localhost:3000/api/v1/second',
  'http://localhost:3000/api/v1/third',
]

function App() {
  const [marketData, setMarketData] = useState<IMarketDataType>(initialState)
  const [minValue, setMinValue] = useState<number | null>(null)

  const getData = async (endpointPoll = '') => {
    try {
      const responses = await Promise.all(
        endpoints.map(endpoint => axios.get(endpoint + endpointPoll))
      )

      const data: IMarketDataType = {
        'RUB/CUPCAKE': roundValues(responses.map(({ data }) => data.rates.RUB)),
        'USD/CUPCAKE': roundValues(responses.map(({ data }) => data.rates.USD)),
        'EUR/CUPCAKE': roundValues(responses.map(({ data }) => data.rates.EUR)),
      }

      setMarketData(data)
      setMinValue(findMinValue(data))
    } catch (error) {
      console.error('Не удалось получить данные')
    }
  }

  usePollingUpdate(() => getData('/poll'), 5000)

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='container'>
      <CurrencyTable data={marketData} minValue={minValue} />
    </div>
  )
}

export default App
