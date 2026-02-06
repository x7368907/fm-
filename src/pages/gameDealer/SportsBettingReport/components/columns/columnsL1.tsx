import type { ColumnsType } from 'antd/es/table'
import type { SportsBettingData } from '../../types'
import { createMoneyColumns } from './commonMoneyColumns'

interface Props {
  total: any
  onNavigate: (record: SportsBettingData) => void
}

export const getColumnsL1 = ({
  total,
  onNavigate,
}: Props): ColumnsType<SportsBettingData> => [
  {
    title: (
      <div className="w-full pr-4 text-right font-bold text-gray-600">
        合計 :
      </div>
    ),
    fixed: 'left',
    width: 340,
    children: [
      { title: 'Game ID', dataIndex: 'gameId', align: 'center', width: 80 },
      {
        title: 'Game code',
        dataIndex: 'gameCode',
        align: 'center',
        width: 140,
        render: (t) => (
          <span className="font-mono text-xs text-gray-500">{t}</span>
        ),
      },
      { title: '遊戲名稱', dataIndex: 'gameName', align: 'center', width: 180 },
    ],
  },
  {
    title: (
      <div className="text-center font-bold text-gray-700">
        {total.betCount}
      </div>
    ),
    children: [
      {
        title: '下注筆數',
        dataIndex: 'betCount',
        align: 'center',
        width: 100,
        render: (val, record) => (
          <a
            onClick={() => onNavigate(record)}
            className="font-bold text-blue-600 underline hover:text-blue-500"
          >
            {val}
          </a>
        ),
      },
    ],
  },
  ...(createMoneyColumns(total) as any),
  {
    title: <div className="text-center font-bold text-gray-700">-</div>,
    children: [
      {
        title: '連贏最大場次',
        dataIndex: 'maxStreak',
        align: 'center',
        width: 110,
      },
    ],
  },
  {
    title: (
      <div className="text-center font-bold text-gray-700">{total.rtp}</div>
    ),
    children: [{ title: 'RTP', dataIndex: 'rtp', align: 'center', width: 80 }],
  },
]
