import { useState } from 'react'
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
  'http://localhost:3000/api/v1/first/poll',
  'http://localhost:3000/api/v1/second/poll',
  'http://localhost:3000/api/v1/third/poll',
]

function App() {
  const [marketData, setMarketData] = useState<IMarketDataType>(initialState)
  const [minValue, setMinValue] = useState<number | null>(null)

  const getData = async () => {
    try {
      const responses = await Promise.all(
        endpoints.map(endpoint => axios.get(endpoint))
      )
      
      const data = {
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

  usePollingUpdate(getData, 5000)

  return (
    <div className='container'>
      <CurrencyTable data={marketData} minValue={minValue} />
    </div>
  )
}

export default App
