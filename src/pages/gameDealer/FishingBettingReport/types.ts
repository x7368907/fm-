// types.ts

export type ViewMode = 'list' | 'gameDetail' | 'memberDetail'

export interface FishingBettingData {
  key: string
  gameId: number
  gameCode: string
  gameName: string
  betCount: number
  betAmount: number
  validBetAmount: number
  prizeAmount: number
  netLossAmount: number
  maxChainIndex: number
  rtp?: number
}

export interface GameDetailData extends FishingBettingData {
  memberAccount: string
  memberName: string
}

export interface MemberDetailData {
  key: string
  gameName: string
  roomType: string
  betId: string
  betTime: string
  memberAccount: string
  memberName: string
  status: string
  betCount: number
  betAmount: number
  validBetAmount: number
  prizeAmount: number
  netLossAmount: number
  betDetailImg: string
  chainIndex: number
}
