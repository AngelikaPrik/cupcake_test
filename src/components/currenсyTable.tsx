import { IMarketDataType } from '../types'

const currencyTitle = ['RUB/CUPCAKE', 'USD/CUPCAKE', 'EUR/CUPCAKE']

export const CurrencyTable = (props: PropsType) => {
  const { data, minValue } = props
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
        {currencyTitle.map((cur, i) => (
          <tr key={i}>
            <td>{cur}</td>
            {data[cur as keyof IMarketDataType].map((num, i) => (
              <td className={num === minValue ? 'minimum' : ''} key={i}>
                {num}
              </td>
            ))}
          </tr>
        ))}
        <tr>
          <td>RUB/USD</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td>RUB/EUR</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td>EUR/RUB</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
  )
}

interface PropsType {
  data: IMarketDataType
  minValue: number | null
}