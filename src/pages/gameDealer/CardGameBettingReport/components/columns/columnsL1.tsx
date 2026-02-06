import type { ColumnsType } from 'antd/es/table'
import type { CardGameBettingData, TotalSummary } from '../../types'
import { createMoneyColumns } from './commonMoneyColumns'

export const getColumnsL1 = (
  currentTotal: TotalSummary,
  onGoToDetail: (record: CardGameBettingData) => void
): ColumnsType<CardGameBettingData> => [
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
        width: 140,
        render: (t) => (
          <span className="font-mono text-xs text-gray-500">{t}</span>
        ),
      },
      {
        title: '遊戲名稱',
        dataIndex: 'gameName',
        align: 'center',
        width: 120,
      },
    ],
  },
  {
    title: (
      <div className="text-center font-bold text-gray-700">
        {currentTotal.betCount}
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
            onClick={() => onGoToDetail(record)}
            className="font-bold text-blue-600 underline hover:text-blue-500"
          >
            {val}
          </a>
        ),
      },
    ],
  },
  ...createMoneyColumns(currentTotal),
  {
    title: <div className="text-center font-bold text-gray-700">-</div>,
    children: [
      {
        title: '連贏最大場次',
        dataIndex: 'maxWinStreak',
        align: 'center',
        width: 110,
      },
    ],
  },
  {
    title: (
      <div className="text-center font-bold text-gray-700">
        {currentTotal.rtp}
      </div>
    ),
    children: [{ title: 'RTP', dataIndex: 'rtp', align: 'center', width: 80 }],
  },
]
