// 所有可被「合計計算」的最小欄位集合
export interface CalculatableRow {
  betCount?: number
  betAmount?: number
  winLoss?: number
  validBetAmount?: number
  prizeAmount?: number
  netLossAmount?: number
  chain?: number
  rtp?: number
}

export type ViewMode = 'list' | 'gameDetail' | 'memberDetail'

// L1
export interface BettingData extends CalculatableRow {
  key: string
  gameId: number
  gameCode: string
  gameName: string
}

// L2
export interface GameDetailData extends BettingData {
  memberAccount: string
  memberName: string
}

// L3
export interface MemberDetailData extends CalculatableRow {
  key: string
  gameName: string
  tableId: string
  betId: string
  betTime: string
  memberAccount: string
  memberName: string
  betContent: string
  result: string
}
