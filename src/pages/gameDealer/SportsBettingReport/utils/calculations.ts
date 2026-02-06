export const calculateTotal = (data: any[]) => ({
  betCount: data.reduce((acc, cur) => acc + (cur.betCount || 0), 0),
  betAmount: data.reduce((acc, cur) => acc + (cur.betAmount || 0), 0),
  validBetAmount: data.reduce((acc, cur) => acc + (cur.validBetAmount || 0), 0),
  prizeAmount: data.reduce((acc, cur) => acc + (cur.prizeAmount || 0), 0),
  netLossAmount: data.reduce((acc, cur) => acc + (cur.netLossAmount || 0), 0),
  maxStreak: data.reduce(
    (acc, cur) => Math.max(acc, cur.streak || cur.maxStreak || 0),
    0
  ),
  rtp: parseFloat(
    (
      data.reduce((acc, cur) => acc + (cur.rtp || 0), 0) / (data.length || 1)
    ).toFixed(1)
  ),
})
