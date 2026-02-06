// components/columns/columnsL3.ts
import { Image, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { MemberDetailData } from '../../types'
import { createMoneyColumns } from './commonMoneyColumns'

type Props = {
  total: any
  onViewDetail?: (record: MemberDetailData) => void // 假設有檢視按鈕
}

export const getColumnsL3 = ({
  total,
  onViewDetail,
}: Props): ColumnsType<MemberDetailData> => [
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
        width: 120,
      },
      {
        title: '房/桌號',
        dataIndex: 'roomType',
        align: 'center',
        width: 90,
      },
      {
        title: '注單號碼',
        dataIndex: 'betId',
        align: 'center',
        width: 150,
        render: (t) => (
          console.log(onViewDetail),
          (
            <span className="whitespace-pre-wrap text-[11px] leading-tight">
              {t}
            </span>
          )
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
        dataIndex: 'status',
        align: 'center',
        width: 90,
        render: (t) => (
          <Tag color={t === '已結算' ? 'default' : 'orange'}>{t}</Tag>
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
      {
        title: '下注筆數',
        dataIndex: 'betCount',
        align: 'center',
        width: 80,
      },
    ],
  },
  ...createMoneyColumns(total),
  {
    title: <div className="text-center text-gray-400">-</div>,
    fixed: 'right',
    children: [
      {
        title: '下注明細',
        dataIndex: 'betDetailImg',
        align: 'center',
        width: 100,
        render: (url) => (
          <div className="flex justify-center">
            <Image
              width={50}
              height={30}
              src={url}
              alt="detail"
              className="rounded border object-cover"
              preview={false}
            />
          </div>
        ),
      },
      {
        title: '連贏次數',
        dataIndex: 'chainIndex',
        align: 'center',
        width: 90,
      },
    ],
  },
]
