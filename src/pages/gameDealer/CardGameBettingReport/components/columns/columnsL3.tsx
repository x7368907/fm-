/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ColumnsType } from 'antd/es/table'
import type { MemberDetailData, TotalSummary } from '../../types'
import { createMoneyColumns } from './commonMoneyColumns'

export const getColumnsL3 = (
  currentTotal: TotalSummary,

  _onViewDetail?: (record: MemberDetailData) => void
): ColumnsType<MemberDetailData> => [
  {
    title: (
      <div className="w-full pr-4 text-right font-bold text-gray-600">
        合計 :
      </div>
    ),
    fixed: 'left',
    children: [
      {
        title: '遊戲名稱',
        dataIndex: 'gameName',
        align: 'center',
        width: 100,
      },
      {
        title: '房間 / 桌號',
        dataIndex: 'roomTable',
        align: 'center',
        width: 90,
      },
      {
        title: '注單號碼',
        dataIndex: 'betId',
        align: 'center',
        width: 160,
        render: (t) => (
          <span className="whitespace-pre-wrap font-mono text-[11px] leading-tight text-gray-600">
            {t}
          </span>
        ),
      },
      {
        title: '下注時間',
        dataIndex: 'betTime',
        align: 'center',
        width: 100,
        render: (t) => (
          <span className="whitespace-pre-wrap text-[11px] leading-tight">
            {t}
          </span>
        ),
      },
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
      },
      {
        title: '下注狀態',
        dataIndex: 'betStatus',
        align: 'center',
        width: 90,
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
        width: 80,
      },
    ],
  },
  ...createMoneyColumns(currentTotal),
  {
    title: <div className="text-center text-gray-400">-</div>,
    children: [
      {
        title: '下注內容',
        dataIndex: 'betContent',
        align: 'center',
        width: 100,
      },
    ],
  },
  {
    title: <div className="text-center text-gray-400">-</div>,
    children: [
      {
        title: '開獎結果',
        dataIndex: 'gameResult',
        align: 'center',
        width: 100,
      },
    ],
  },
  {
    title: <div className="text-center text-gray-400">-</div>,
    children: [
      {
        title: '連贏次數',
        dataIndex: 'winStreak',
        align: 'center',
        width: 80,
      },
    ],
  },
]
