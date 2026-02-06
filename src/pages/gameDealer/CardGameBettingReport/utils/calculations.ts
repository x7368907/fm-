import type { TotalSummary } from '../types'

// 這裡接受 any[] 是為了通用性，確保各層級資料若有相關欄位都能加總
export const calculateTotal = (data: any[]): TotalSummary => {
  return {
    betCount: data.reduce((acc, cur) => acc + (cur.betCount || 0), 0),
    betAmount: data.reduce((acc, cur) => acc + (cur.betAmount || 0), 0),
    validBetAmount: data.reduce(
      (acc, cur) => acc + (cur.validBetAmount || 0),
      0
    ),
    prizeAmount: data.reduce((acc, cur) => acc + (cur.prizeAmount || 0), 0),
    netLossAmount: data.reduce((acc, cur) => acc + (cur.netLossAmount || 0), 0),
    maxWinStreak: '-',
    rtp: '-',
  }
}
