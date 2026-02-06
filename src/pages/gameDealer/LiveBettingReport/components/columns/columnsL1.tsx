import type { ColumnsType } from 'antd/es/table'
import type { BettingData } from '../../types'
import { createCommonMoneyColumns } from './commonMoneyColumns'

type ReportRow = BettingData & Record<string, any>

export function getColumnsL1(
  totalData: any,
  onGoToGameDetail: (r: BettingData) => void
): ColumnsType<ReportRow> {
  return [
    {
      title: (
        <div className="pr-4 text-right font-bold text-gray-600">合計 :</div>
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
          {totalData.betCount}
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
              onClick={() => onGoToGameDetail(record as unknown as BettingData)}
              className="font-bold text-blue-600 underline"
            >
              {val}
            </a>
          ),
        },
      ],
    },
    ...createCommonMoneyColumns(totalData),
  ]
}
