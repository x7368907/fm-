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
  // 定義選項，方便之後如果要改文字或接動態數量
  const tabs = [
    { label: '待審核', value: 'pending', count: 9 },
    { label: '已發放', value: 'approved', count: 0 },
    { label: '已拒絕', value: 'rejected', count: 0 },
  ]

  return (
    <div className="flex items-center justify-between border-b bg-white p-4">
      {/* 左側：按鈕群組 */}
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.value
          return (
            <div
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              className={`cursor-pointer rounded border px-6 py-2 text-sm transition-all ${
                isSelected
                  ? 'border-teal-500 bg-white font-bold text-teal-600' // 選中樣式
                  : 'border-gray-200 bg-white text-gray-500 hover:border-teal-300 hover:text-teal-500' // 未選中樣式
              }`}
            >
              {tab.label} ({tab.count})
            </div>
          )
        })}
      </div>

      {/* 右側：金額統計 */}
      <div className="font-bold text-gray-700">
        待審核總計：{' '}
        <span className="text-black">{totalAmount.toLocaleString()}</span>
      </div>
    </div>
  )
}
