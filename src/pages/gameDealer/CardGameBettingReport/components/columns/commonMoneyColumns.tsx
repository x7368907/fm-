import type { ColumnsType } from 'antd/es/table'
import type { TotalSummary } from '../../types'

export const createMoneyColumns = (total: TotalSummary): ColumnsType<any> => [
  {
    title: (
      <div className="text-center font-bold text-gray-700">
        {total.betAmount.toLocaleString()}
      </div>
    ),
    children: [
      {
        title: '下注金額',
        dataIndex: 'betAmount',
        align: 'center',
        width: 100,
        render: (v: number) => v.toLocaleString(),
      },
    ],
  },
  {
    title: (
      <div className="text-center font-bold text-gray-700">
        {total.validBetAmount.toLocaleString()}
      </div>
    ),
    children: [
      {
        title: '有效投注金額',
        dataIndex: 'validBetAmount',
        align: 'center',
        width: 110,
        render: (v: number) => v.toLocaleString(),
      },
    ],
  },
  {
    title: (
      <div className="text-center font-bold text-gray-700">
        {total.prizeAmount.toLocaleString()}
      </div>
    ),
    children: [
      {
        title: '中獎金額',
        dataIndex: 'prizeAmount',
        align: 'center',
        width: 100,
        render: (v: number) => v.toLocaleString(),
      },
    ],
  },
  {
    title: (
      <div className="text-center font-bold text-gray-700">
        {total.netLossAmount.toLocaleString()}
      </div>
    ),
    children: [
      {
        title: '虧損金額', // 截圖中用詞為 "虧損金額"
        dataIndex: 'netLossAmount',
        align: 'center',
        width: 100,
        render: (v: number) => (
          <span className={v < 0 ? 'text-red-500' : ''}>
            {v.toLocaleString()}
          </span>
        ),
      },
    ],
  },
]
