import { MarketDataType } from '../types'

export const CurrencyTable = (props: PropsType) => {
  const { data, minValues } = props

  return (
    <table>
      <thead>
        <tr>
          <th>Pair name/market</th>
          <th>First</th>
          <th>Second</th>
          <th>Third</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map(key => (
          <tr key={key}>
            <td>{key}</td>
            {data[key as DataKey].map((num, i) => (
              <td
                className={num === minValues[key as DataKey] ? 'minimum' : ''}
                key={i}
              >
                {num}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

interface PropsType {
  data: MarketDataType<number[]>
  minValues: MarketDataType<number>
}

type DataKey = keyof MarketDataType<number>
