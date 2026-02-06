import type { ColumnsType } from 'antd/es/table'
import type { MemberBetDetailData } from '../../types'
import { createMoneyColumns } from './commonMoneyColumns'

interface Props {
  total: any
}

export const getColumnsL3 = ({
  total,
}: Props): ColumnsType<MemberBetDetailData> => [
  {
    title: (
      <div className="w-full pr-4 text-right font-bold text-gray-600">
        合計 :
      </div>
    ),
    fixed: 'left',
    width: 600,
    children: [
      {
        title: '遊戲名稱',
        dataIndex: 'gameName',
        align: 'center',
        width: 140,
        render: (t) => <div className="text-xs">{t}</div>,
      },
      {
        title: '注單號碼',
        dataIndex: 'betId',
        align: 'center',
        width: 110,
        render: (t) => <span className="text-xs">{t}</span>,
      },
      { title: '類型/玩法', dataIndex: 'playType', align: 'center', width: 90 },
      {
        title: '下注時間',
        dataIndex: 'betTime',
        align: 'center',
        width: 120,
        render: (t) => <div className="whitespace-pre-line text-xs">{t}</div>,
      },
      {
        title: '結算時間',
        dataIndex: 'settleTime',
        align: 'center',
        width: 120,
        render: (t) => <div className="whitespace-pre-line text-xs">{t}</div>,
      },
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
        width: 90,
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
  ...(createMoneyColumns(total) as any),
  {
    title: <div className="text-center font-bold text-gray-700">-</div>,
    children: [
      {
        title: '下注內容',
        dataIndex: 'betContent',
        align: 'left',
        width: 220,
        render: (t) => (
          <div className="whitespace-pre-line text-[11px] leading-tight">
            {t}
          </div>
        ),
      },
    ],
  },
  {
    title: (
      <div className="text-center font-bold text-gray-700">
        {total.maxStreak}
      </div>
    ),
    children: [
      { title: '連贏次數', dataIndex: 'streak', align: 'center', width: 90 },
    ],
  },
]
