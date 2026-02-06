import type { ColumnsType } from 'antd/es/table'
import type { LotteryGameDetailData } from '../../types'
import { getMoneyColumns } from './commonMoneyColumns'

export const getColumnsL2 = (
  total: any,
  onGoToMember: (record: LotteryGameDetailData) => void
): ColumnsType<LotteryGameDetailData> => [
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
        width: 160,
        render: (t) => (
          <span className="font-mono text-xs text-gray-500">{t}</span>
        ),
      },
      { title: '遊戲名稱', dataIndex: 'gameName', align: 'center', width: 120 },
      {
        title: '會員帳號',
        dataIndex: 'memberAccount',
        align: 'center',
        width: 110,
      },
      {
        title: '會員姓名',
        dataIndex: 'memberName',
        align: 'center',
        width: 90,
        render: (text, record) => (
          <a
            onClick={() => onGoToMember(record)}
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
      { title: '下注筆數', dataIndex: 'betCount', align: 'center', width: 90 },
    ],
  },
  ...getMoneyColumns(total),
  {
    title: (
      <div className="text-center font-bold text-gray-700">
        {total.continuousWin}
      </div>
    ),
    children: [
      {
        title: '連續贏大場次',
        dataIndex: 'continuousWin',
        align: 'center',
        width: 110,
      },
    ],
  },
]
