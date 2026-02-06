export interface SportsBettingData {
  key: string
  gameId: number
  gameCode: string
  gameName: string
  betCount: number
  betAmount: number
  validBetAmount: number
  prizeAmount: number
  netLossAmount: number
  maxStreak: number
  rtp: number
}

export interface SportsGameDetailData extends SportsBettingData {
  memberAccount: string
  memberName: string
}

export interface MemberBetDetailData {
  key: string
  gameName: string
  betId: string
  playType: string
  betTime: string
  settleTime: string
  memberAccount: string
  memberName: string
  betCount: number
  betAmount: number
  validBetAmount: number
  prizeAmount: number
  netLossAmount: number
  betContent: string
  streak: number
}

export type ViewMode = 'list' | 'gameDetail' | 'memberDetail'
