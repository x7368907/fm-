export type ViewMode = 'list' | 'gameDetail' | 'memberDetail'

export interface CardGameBettingData {
  key: string
  gameId: number
  gameCode: string
  gameName: string
  betCount: number
  betAmount: number
  validBetAmount: number
  prizeAmount: number
  netLossAmount: number
  maxWinStreak?: number
  rtp?: number
}

export interface GameDetailData extends CardGameBettingData {
  memberAccount: string
  memberName: string
}

export interface MemberDetailData {
  key: string
  gameName: string
  roomTable: string
  betId: string
  betTime: string
  memberAccount: string
  memberName: string
  betStatus: string
  betCount: number
  betAmount: number
  validBetAmount: number
  prizeAmount: number
  netLossAmount: number
  betContent: string
  gameResult: string
  winStreak: number
}

// 用於計算合計的物件介面
export interface TotalSummary {
  betCount: number
  betAmount: number
  validBetAmount: number
  prizeAmount: number
  netLossAmount: number
  maxWinStreak: string | number
  rtp: string | number
}
