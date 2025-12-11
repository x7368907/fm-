import { Radio } from 'antd'

// 定義 Props 介面，這就是為什麼之前會報錯的原因
interface Props {
  activeTab: string
  onTabChange: (val: string) => void
  totalAmount: number
}

export default function SummaryBar({
  activeTab,
  onTabChange,
  totalAmount,
}: Props) {
  return (
    <div className="flex items-center justify-between border-b bg-white p-4">
      <Radio.Group
        value={activeTab}
        onChange={(e) => onTabChange(e.target.value)}
        buttonStyle="solid"
      >
        <Radio.Button value="pending">待審核 (9)</Radio.Button>
        <Radio.Button value="approved">已發放 (0)</Radio.Button>
        <Radio.Button value="rejected">已拒絕 (0)</Radio.Button>
      </Radio.Group>
      <div className="font-bold text-gray-700">
        待審核總計：{' '}
        <span className="text-black">{totalAmount.toLocaleString()}</span>
      </div>
    </div>
  )
}
