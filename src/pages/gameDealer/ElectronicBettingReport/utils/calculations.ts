// src/pages/ElectronicBettingReport/utils/calculations.ts

export const calculateTotal = (data: any[]) => ({
  betCount: data.reduce((acc, cur) => acc + (cur.betCount || 0), 0),
  betAmount: data.reduce((acc, cur) => acc + (cur.betAmount || 0), 0),
  buyBonusAmount: data.reduce((acc, cur) => acc + (cur.buyBonusAmount || 0), 0),
  validBetAmount: data.reduce((acc, cur) => acc + (cur.validBetAmount || 0), 0),
  prizeAmount: data.reduce((acc, cur) => acc + (cur.prizeAmount || 0), 0),
  netLossAmount: data.reduce((acc, cur) => acc + (cur.netLossAmount || 0), 0),
  jackpotContribution: data.reduce(
    (acc, cur) => acc + (cur.jackpotContribution || 0),
    0
  ),
  rtp: parseFloat(
    (
      data.reduce((acc, cur) => acc + (cur.rtp || 0), 0) / (data.length || 1)
    ).toFixed(1)
  ),
})
