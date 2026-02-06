// src/pages/ElectronicBettingReport/components/columns/columnsL2.tsx
import type { ColumnsType } from 'antd/es/table'
import type { GameDetailData } from '../../types'
import { createMoneyColumns } from './commonMoneyColumns'

interface Props {
  total: any
  onGoToMemberDetail: (record: GameDetailData) => void
}

export const getColumnsL2 = ({
  total,
  onGoToMemberDetail,
}: Props): ColumnsType<GameDetailData> => [
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
      { title: '遊戲名稱', dataIndex: 'gameName', align: 'center', width: 120 },
      {
        title: '會員帳號',
        dataIndex: 'memberAccount',
        align: 'center',
        width: 120,
      },
      {
        title: '會員姓名',
        dataIndex: 'memberName',
        align: 'center',
        width: 100,
        render: (text, record) => (
          <a
            onClick={() => onGoToMemberDetail(record)}
            className="font-bold text-blue-600 hover:underline"
          >
            {text}
          </a>
        ),
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
      { title: '下注筆數', dataIndex: 'betCount', align: 'center', width: 100 },
    ],
  },
  ...createMoneyColumns(total),
]
