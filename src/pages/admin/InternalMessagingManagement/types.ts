/** 統一資料模型 */
export interface MessagingRow {
  key: string
  month?: string
  pointsUsed?: string
  provider?: string
  apiName?: string
  remainingPoints?: number
  sendTypes?: string[]
  status?: boolean
  subject?: string
  target?: string
  msgType?: string
  smsStatus?: boolean
  internalStatus?: boolean
  topUpFee?: string
  sendTime?: string
  receiveTime?: string
  handler?: string
  phone?: string
  sendStatus?: string
  costPoints?: string
}

export type ViewMode = 'list' | 'form' | 'topup'
