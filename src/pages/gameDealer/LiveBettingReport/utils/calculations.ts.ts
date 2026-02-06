// src/pages/LiveBettingReport/utils/calculations.ts

/**
 * 計算列表資料的各項合計值
 * @param data - 資料陣列 (需包含 betCount, betAmount 等欄位)
 */
export const calculateTotal = (data: any[]) => ({
  betCount: data.reduce((acc, cur) => acc + (cur.betCount || 0), 0),
  betAmount: data.reduce((acc, cur) => acc + (cur.betAmount || 0), 0),
  winLoss: data.reduce((acc, cur) => acc + (cur.winLoss || 0), 0),
  validBetAmount: data.reduce((acc, cur) => acc + (cur.validBetAmount || 0), 0),
  prizeAmount: data.reduce((acc, cur) => acc + (cur.prizeAmount || 0), 0),
  netLossAmount: data.reduce((acc, cur) => acc + (cur.netLossAmount || 0), 0),
  chain: data.reduce((acc, cur) => acc + (cur.chain || 0), 0),
  rtp: parseFloat(
    (
      data.reduce((acc, cur) => acc + (cur.rtp || 0), 0) / (data.length || 1)
    ).toFixed(1)
  ),
})
