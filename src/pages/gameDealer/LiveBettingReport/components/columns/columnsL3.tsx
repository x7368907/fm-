import type { ColumnsType } from 'antd/es/table'
import type { MemberDetailData } from '../../types'
import { createCommonMoneyColumns } from './commonMoneyColumns'

type ReportRow = MemberDetailData & Record<string, any>

export function getColumnsL3(totalData: any): ColumnsType<ReportRow> {
  return [
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
          title: '桌號/局號',
          dataIndex: 'tableId',
          align: 'center',
          width: 100,
          render: (t) => <div className="whitespace-pre-line">{t}</div>,
        },
        {
          title: '注單號碼',
          dataIndex: 'betId',
          align: 'center',
          width: 140,
          render: (t) => <span className="text-xs">{t}</span>,
        },
        {
          title: '下注時間',
          dataIndex: 'betTime',
          align: 'center',
          width: 120,
          render: (t) => <div className="whitespace-pre-line text-xs">{t}</div>,
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
      ],
    },
    {
      title: (
        <div className="text-center font-bold text-gray-700">
          {totalData.betCount}
        </div>
      ),
      children: [
        {
          title: '下注筆數',
          dataIndex: 'betCount',
          align: 'center',
          width: 90,
        },
      ],
    },
    ...createCommonMoneyColumns(totalData),
    {
      title: <div className="text-center text-gray-400">-</div>,
      children: [
        {
          title: '下注內容',
          dataIndex: 'betContent',
          align: 'center',
          width: 80,
        },
      ],
    },
    {
      title: <div className="text-center text-gray-400">-</div>,
      children: [
        {
          title: '開獎結果',
          dataIndex: 'result',
          align: 'left',
          width: 200,
          render: (text) => (
            <div className="whitespace-pre-line text-[11px] leading-tight">
              {text}
            </div>
          ),
        },
      ],
    },
    {
      title: (
        <div className="text-center font-bold text-gray-700">
          {totalData.chain}
        </div>
      ),
      children: [
        { title: '連龍', dataIndex: 'chain', align: 'center', width: 70 },
      ],
    },
    {
      title: (
        <div className="text-center font-bold text-gray-700">
          {totalData.rtp}
        </div>
      ),
      children: [
        { title: 'RTP', dataIndex: 'rtp', align: 'center', width: 70 },
      ],
    },
  ]
}
