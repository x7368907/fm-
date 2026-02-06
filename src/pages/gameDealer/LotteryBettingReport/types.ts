export type ViewMode = 'list' | 'gameDetail' | 'memberDetail'

// Level 1: 遊戲列表
export interface LotteryBettingData {
  key: string
  gameId: number
  gameCode: string
  gameName: string
  betCount: number
  betAmount: number
  validBetAmount: number
  prizeAmount: number
  netLossAmount: number
  continuousWin: number
  rtp?: number
}

// Level 2: 會員列表
export interface LotteryGameDetailData extends LotteryBettingData {
  memberAccount: string
  memberName: string
}

// Level 3: 注單明細 (對應截圖欄位)
export interface LotteryMemberDetailData {
  key: string
  gameName: string
  period: string // 期數 (e.g. 第 25202 期)
  betId: string // 注單號碼
  playType: string // 玩法 (e.g. 猜名次)
  betTime: string // 下注時間
  settleTime: string // 結算時間
  memberAccount: string
  memberName: string
  status: string // 下注狀態 (e.g. 已結算)
  betCount: number
  betAmount: number
  validBetAmount: number
  prizeAmount: number
  netLossAmount: number // 虧損金額 (或會員輸贏)
  betContent: string // 下注內容 (e.g. 第六名-5)
  result: string // 開獎結果 (e.g. 第六名-7)
  continuousWin: number // 連贏次數
}
