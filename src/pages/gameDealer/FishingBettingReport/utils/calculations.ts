// utils/calculations.ts

/**
 * 計算列表資料的合計值
 * @param data - 包含下注數據的陣列
 */
export const calculateTotal = (data: any[]) => ({
  // 累加整數欄位
  betCount: data.reduce((acc, cur) => acc + (cur.betCount || 0), 0),
  betAmount: data.reduce((acc, cur) => acc + (cur.betAmount || 0), 0),
  validBetAmount: data.reduce((acc, cur) => acc + (cur.validBetAmount || 0), 0),
  prizeAmount: data.reduce((acc, cur) => acc + (cur.prizeAmount || 0), 0),
  netLossAmount: data.reduce((acc, cur) => acc + (cur.netLossAmount || 0), 0),

  // 連贏次數合計 (通常不累加，這邊設為 0 或根據需求調整)
  chainIndex: 0,
  maxChainIndex: 0,

  // RTP 計算平均值
  rtp: parseFloat(
    (
      data.reduce((acc, cur) => acc + (cur.rtp || 0), 0) / (data.length || 1)
    ).toFixed(1)
  ),
})
