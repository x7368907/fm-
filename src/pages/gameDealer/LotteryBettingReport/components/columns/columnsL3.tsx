import type { ColumnsType } from 'antd/es/table'
import type { LotteryMemberDetailData } from '../../types'
import { getMoneyColumns } from './commonMoneyColumns'

export const getColumnsL3 = (
  total: any,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onViewDetail?: (record: LotteryMemberDetailData) => void
): ColumnsType<LotteryMemberDetailData> => [
  {
    // --- 左側資訊區 (固定) ---
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
        width: 120,
      },
      {
        title: '期數',
        dataIndex: 'period',
        align: 'center',
        width: 100,
        render: (t) => <span className="text-xs">{t}</span>,
      },
      {
        title: '注單號碼',
        dataIndex: 'betId',
        align: 'center',
        width: 150,
        render: (t) => (
          <span className="whitespace-pre-wrap font-mono text-[11px] leading-tight text-gray-600">
            {t}
          </span>
        ),
      },
      {
        title: '玩法',
        dataIndex: 'playType',
        align: 'center',
        width: 80,
      },
      {
        title: '下注時間',
        dataIndex: 'betTime',
        align: 'center',
        width: 100,
        render: (t) => (
          <span className="whitespace-pre-wrap text-[11px] leading-tight text-gray-500">
            {t}
          </span>
        ),
      },
      {
        title: '結算時間',
        dataIndex: 'settleTime',
        align: 'center',
        width: 100,
        render: (t) => (
          <span className="whitespace-pre-wrap text-[11px] leading-tight text-gray-500">
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
        width: 80,
      },
      {
        title: '下注狀態',
        dataIndex: 'status',
        align: 'center',
        width: 80,
        render: (t) => (
          <span className="inline-block rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            {t}
          </span>
        ),
      },
    ],
  },

  // --- 中間數值區 ---
  {
    title: (
      <div className="text-center font-bold text-gray-700">
        {total.betCount}
      </div>
    ),
    children: [
      { title: '下注筆數', dataIndex: 'betCount', align: 'center', width: 80 },
    ],
  },

  // 展開金額欄位 (下注金額, 有效投注, 中獎金額, 虧損金額)
  ...getMoneyColumns(total),

  // --- 右側明細區 ---
  {
    title: <div className="text-center text-gray-400">-</div>,
    children: [
      {
        title: '下注內容',
        dataIndex: 'betContent',
        align: 'center',
        width: 100,
      },
      {
        title: '開獎結果',
        dataIndex: 'result',
        align: 'center',
        width: 100,
      },
      {
        title: '連贏次數',
        dataIndex: 'continuousWin',
        align: 'center',
        width: 80,
      },
    ],
  },
]
