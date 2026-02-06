import type { ColumnsType } from 'antd/es/table'
import type { GameDetailData } from '../../types'
import { createCommonMoneyColumns } from './commonMoneyColumns'

type ReportRow = GameDetailData & Record<string, any>

export function getColumnsL2(
  totalData: any,
  onGoToMemberDetail: (r: GameDetailData) => void
): ColumnsType<ReportRow> {
  return [
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
              onClick={() =>
                onGoToMemberDetail(record as unknown as GameDetailData)
              }
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
          {totalData.betCount}
        </div>
      ),
      children: [
        {
          title: '下注筆數',
          dataIndex: 'betCount',
          align: 'center',
          width: 100,
        },
      ],
    },
    ...createCommonMoneyColumns(totalData),
    {
      title: (
        <div className="text-center font-bold text-gray-700">
          {totalData.chain}
        </div>
      ),
      children: [
        { title: '連龍', dataIndex: 'chain', align: 'center', width: 80 },
      ],
    },
    {
      title: (
        <div className="text-center font-bold text-gray-700">
          {totalData.rtp}
        </div>
      ),
      children: [
        { title: 'RTP', dataIndex: 'rtp', align: 'center', width: 80 },
      ],
    },
  ]
}
