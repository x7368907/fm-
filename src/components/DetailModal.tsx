import React from 'react'
import { Modal, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

// 1. 擴充資料型別，支援各種詳細欄位
export interface DetailDataType {
  key: string
  label?: string // 通用顯示名稱
  value: number // 主要金額/數值
  betAmount?: number
  // --- 會員詳細模式專用欄位 ---
  time?: string // 時間 (下注時間 / 派發時間)
  gameType?: string // 遊戲類型
  vendor?: string // 遊戲廠商
  betCount?: number // 下注筆數
  validBetAmount?: number // 有效投注
  rate?: number // 比例 (返水% / 服務費% / 上繳%)
  name?: string // 名稱 (優惠名稱)
  baseAmount?: number // 基礎金額 (儲值金額 / 會員虧損金額)
  type?: string // 類別 (營運成本的費用類別)
}

interface DetailModalProps {
  open: boolean
  onCancel: () => void
  title: string
  subTitle: string
  data: DetailDataType[]
  // 擴充模式定義
  mode?:
    | 'category' // 公司獲利公式
    | 'agent' // 代理列表 (預設)
    | 'member'
    | 'member-detail'
    | 'member-bet' // 會員-注單 (下注/輸贏)
    | 'member-rebate' // 會員-返水
    | 'member-discount' // 會員-優惠
    | 'member-cost' // 會員-營運成本
    | 'member-gamefee' // 會員-遊戲上繳
    | 'member-transaction' // 會員-儲值/託售
}

const DetailModal: React.FC<DetailModalProps> = ({
  open,
  onCancel,
  title,
  subTitle,
  data,
  mode = 'agent',
}) => {
  // 2. 動態定義表格欄位
  const getColumns = (): ColumnsType<DetailDataType> => {
    // A. 會員-注單明細 (下注金額、中獎、虧損...)
    if (mode === 'member-bet') {
      return [
        {
          title: '下注時間',
          dataIndex: 'time',
          key: 'time',
          width: 160,
          align: 'center',
        },
        {
          title: '遊戲類型',
          dataIndex: 'gameType',
          key: 'gameType',
          width: 100,
          align: 'center',
        },
        {
          title: '遊戲廠商',
          dataIndex: 'vendor',
          key: 'vendor',
          width: 100,
          align: 'center',
        },
        {
          title: '下注筆數',
          dataIndex: 'betCount',
          key: 'betCount',
          align: 'center',
          render: (val) => val?.toLocaleString(),
        },
        {
          title: '有效投注金額',
          dataIndex: 'validBetAmount',
          key: 'validBetAmount',
          align: 'right',
          render: (val) => val?.toLocaleString(),
        },
        {
          title: title, // 動態標題 (例如：中獎金額)
          dataIndex: 'value',
          key: 'value',
          align: 'right',
          render: (val) => (
            <span className={val < 0 ? 'font-bold text-red-500' : 'font-bold'}>
              {val?.toLocaleString()}
            </span>
          ),
        },
      ]
    }

    // B. 會員-返水明細
    if (mode === 'member-rebate') {
      return [
        {
          title: '派發時間',
          dataIndex: 'time',
          key: 'time',
          width: 160,
          align: 'center',
        },
        {
          title: '遊戲類型',
          dataIndex: 'gameType',
          key: 'gameType',
          width: 100,
          align: 'center',
        },
        {
          title: '遊戲廠商',
          dataIndex: 'vendor',
          key: 'vendor',
          width: 100,
          align: 'center',
        },
        {
          title: '有效投注金額',
          dataIndex: 'validBetAmount',
          key: 'validBetAmount',
          align: 'right',
          render: (val) => val?.toLocaleString(),
        },
        {
          title: '返水比例(%)',
          dataIndex: 'rate',
          key: 'rate',
          align: 'center',
        },
        {
          title: '返水金額',
          dataIndex: 'value',
          key: 'value',
          align: 'right',
          render: (val) => val?.toLocaleString(),
        },
      ]
    }

    // C. 會員-優惠明細
    if (mode === 'member-discount') {
      return [
        {
          title: '派發時間',
          dataIndex: 'time',
          key: 'time',
          width: 180,
          align: 'center',
        },
        { title: '優惠名稱', dataIndex: 'name', key: 'name', align: 'center' },
        {
          title: '優惠金額',
          dataIndex: 'value',
          key: 'value',
          align: 'right',
          render: (val) => val?.toLocaleString(),
        },
      ]
    }

    // D. 會員-營運成本
    if (mode === 'member-cost') {
      return [
        {
          title: '派發時間',
          dataIndex: 'time',
          key: 'time',
          width: 180,
          align: 'center',
        },
        {
          title: '儲值金額',
          dataIndex: 'baseAmount',
          key: 'baseAmount',
          align: 'right',
          render: (val) => val?.toLocaleString(),
        },
        { title: '類別', dataIndex: 'type', key: 'type', align: 'center' },
        {
          title: '服務費比例(%)',
          dataIndex: 'rate',
          key: 'rate',
          align: 'center',
        },
        {
          title: '金額',
          dataIndex: 'value',
          key: 'value',
          align: 'right',
          render: (val) => val?.toLocaleString(),
        },
      ]
    }

    // E. 會員-遊戲上繳
    if (mode === 'member-gamefee') {
      return [
        {
          title: '遊戲類型',
          dataIndex: 'gameType',
          key: 'gameType',
          align: 'center',
        },
        {
          title: '遊戲廠商',
          dataIndex: 'vendor',
          key: 'vendor',
          align: 'center',
        },
        {
          title: '會員虧損金額',
          dataIndex: 'baseAmount',
          key: 'baseAmount',
          align: 'right',
          render: (val) => val?.toLocaleString(),
        },
        { title: '上繳%', dataIndex: 'rate', key: 'rate', align: 'center' },
        {
          title: '遊戲上繳金額',
          dataIndex: 'value',
          key: 'value',
          align: 'right',
          render: (val) => val?.toLocaleString(),
        },
      ]
    }

    // F. 會員-儲值/託售 (簡單交易紀錄)
    if (mode === 'member-transaction') {
      return [
        {
          title: '派發時間',
          dataIndex: 'time',
          key: 'time',
          width: 200,
          align: 'center',
        },
        {
          title: title,
          dataIndex: 'value',
          key: 'value',
          align: 'center',
          render: (val) => val?.toLocaleString(),
        },
      ]
    }

    // G. 代理/公司 預設模式
    // 根據 mode 決定第一欄標題
    let firstColTitle = '代理級別'
    if (mode === 'category') firstColTitle = '類別'

    return [
      {
        title: firstColTitle,
        dataIndex: 'label',
        key: 'label',
        align: 'center',
        render: (text) => <span className="text-gray-600">{text}</span>,
      },
      {
        title: mode === 'category' ? '金額' : title,
        dataIndex: 'value',
        key: 'value',
        align: 'center',
        render: (val) => (
          <span
            className={
              val < 0 ? 'font-bold text-red-500' : 'font-bold text-gray-800'
            }
          >
            {val.toLocaleString()}
          </span>
        ),
      },
    ]
  }

  const customHeader = (
    <div className="flex items-center gap-3 pr-8">
      <div className="rounded border border-gray-400 px-3 py-1 text-sm font-medium text-gray-700">
        {title}
      </div>
      <div className="text-sm text-gray-500">{subTitle}</div>
    </div>
  )

  // 3. 計算總計列 (針對不同模式顯示不同欄位)
  const renderFooter = () => {
    if (mode === 'category') return null // 公司獲利公式不需總計

    // 計算總金額
    const totalValue = data.reduce((acc, curr) => acc + curr.value, 0)

    // 複雜模式不顯示總計，或僅顯示金額總計 (可根據需求客製化)
    // 簡單起見，我們顯示一個通用的金額總計
    return (
      <div className="mt-2 flex justify-between border-b border-gray-100 bg-gray-50 px-4 py-3">
        <span className="text-gray-500">總計</span>
        <span
          className={`text-lg font-bold ${totalValue < 0 ? 'text-red-500' : ''}`}
        >
          {totalValue.toLocaleString()}
        </span>
      </div>
    )
  }

  return (
    <Modal
      title={customHeader}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={mode === 'agent' || mode === 'category' ? 600 : 800} // 詳細報表加寬
      centered
      destroyOnClose
    >
      <div className="mt-4">
        <Table
          columns={getColumns()}
          dataSource={data}
          pagination={false}
          size="middle"
          bordered={false}
          className="border-t border-gray-200"
          scroll={{ y: 400 }} // 如果資料多，支援垂直捲動
        />
        {renderFooter()}
      </div>
    </Modal>
  )
}

export default DetailModal
