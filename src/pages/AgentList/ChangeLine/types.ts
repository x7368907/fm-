export interface ProfitItem {
  type: string
  detail: string
  val: string
}

export interface ChangeLineDataType {
  key: React.Key
  sourceLevel: string
  memberCount: number
  sourceAgentName: string
  sourceAgentRealName: string
  upperLevel: string
  upperAgentName: string
  profitSetting: ProfitItem[]
  profitName: string
  handler: string
}
