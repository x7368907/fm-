// components/columns/columnsL1.tsx
import type { ColumnsType } from 'antd/es/table'
import type { FishingBettingData } from '../../types'
import { createMoneyColumns } from './commonMoneyColumns'

type Props = {
  total: any
  onGoToDetail: (record: FishingBettingData) => void
}

export const getColumnsL1 = ({
  total,
  onGoToDetail,
}: Props): ColumnsType<FishingBettingData> => [
  {
    title: (
      <div className="w-full pr-4 text-right font-bold text-gray-600">
        合計 :
      </div>
    ),
    fixed: 'left',
    children: [
      { title: 'Game ID', dataIndex: 'gameId', align: 'center', width: 80 },
      {
        title: 'Game code',
        dataIndex: 'gameCode',
        align: 'center',
        width: 180,
        render: (t) => (
          <span className="font-mono text-xs text-gray-500">{t}</span>
        ),
      },
      {
        title: '遊戲名稱',
        dataIndex: 'gameName',
        align: 'center',
        width: 140,
      },
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
        width: 90,
        render: (val, record) => (
          <a
            onClick={() => onGoToDetail(record)}
            className="font-bold text-blue-600 underline hover:text-blue-500"
          >
            {val}
          </a>
        ),
      },
    ],
  },
  ...createMoneyColumns(total),
  {
    title: <div className="text-center font-bold text-gray-700">-</div>,
    children: [
      {
        title: '連贏最大場次',
        dataIndex: 'maxChainIndex',
        align: 'center',
        width: 110,
        render: (v) => v || 0,
      },
    ],
  },
]
