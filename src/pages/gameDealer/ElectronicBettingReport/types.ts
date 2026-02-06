// src/pages/ElectronicBettingReport/types.ts

export interface ElectronicBettingData {
  key: string
  gameId: number
  gameCode: string
  gameName: string
  betCount: number
  betAmount: number
  buyBonusAmount: number
  validBetAmount: number
  prizeAmount: number
  netLossAmount: number
  jackpotContribution: number
  rtp?: number
}

export interface GameDetailData extends ElectronicBettingData {
  memberAccount: string
  memberName: string
}

export interface MemberDetailData {
  key: string
  gameName: string
  betId: string
  betTime: string
  memberAccount: string
  memberName: string
  betCount: number
  betAmount: number
  buyBonusAmount: number
  validBetAmount: number
  prizeAmount: number
  netLossAmount: number
  jackpotContribution: number
}

// 用於切換視圖的狀態
export type ViewMode = 'list' | 'gameDetail' | 'memberDetail'
