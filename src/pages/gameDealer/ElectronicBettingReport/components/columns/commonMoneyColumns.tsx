// src/pages/ElectronicBettingReport/components/columns/commonMoneyColumns.tsx
import type { ColumnsType } from 'antd/es/table'

export const createMoneyColumns = (total: any): ColumnsType<any> => [
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
        {total.buyBonusAmount.toLocaleString()}
      </div>
    ),
    children: [
      {
        title: '購買免費遊戲',
        dataIndex: 'buyBonusAmount',
        align: 'center',
        width: 110,
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
        title: '虧損金額',
        dataIndex: 'netLossAmount',
        align: 'center',
        width: 100,
        render: (v: number) => v.toLocaleString(),
      },
    ],
  },
  {
    title: (
      <div className="text-center font-bold text-gray-700">
        {total.jackpotContribution.toLocaleString()}
      </div>
    ),
    children: [
      {
        title: 'Jackpot貢獻金額',
        dataIndex: 'jackpotContribution',
        align: 'center',
        width: 130,
        render: (v: number) => v.toLocaleString(),
      },
    ],
  },
]
