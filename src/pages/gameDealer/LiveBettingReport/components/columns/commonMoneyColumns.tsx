import type { ColumnsType } from 'antd/es/table'

export function createCommonMoneyColumns<T extends Record<string, any>>(
  total: T,
): ColumnsType<T> {
  const moneyCol = (
    totalValue: number,
    title: string,
    dataIndex: string,
    width = 100,
  ) => ({
    title: (
      <div className="text-center font-bold text-gray-700">
        {totalValue?.toLocaleString()}
      </div>
    ),
    children: [
      {
        title,
        dataIndex,
        align: 'center' as const,
        width,
        render: (v: number) => v?.toLocaleString(),
      },
    ],
  })

  return [
    moneyCol(total.betAmount, '下注金額', 'betAmount'),
    moneyCol(total.winLoss, '贈禮', 'winLoss'),
    moneyCol(total.validBetAmount, '有效投注金額', 'validBetAmount', 120),
    moneyCol(total.prizeAmount, '中獎金額', 'prizeAmount'),
    moneyCol(total.netLossAmount, '虧損金額', 'netLossAmount'),
  ]
}
