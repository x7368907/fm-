export interface BalanceInfo {
  change: number
  before: string
  after: string
}

export interface PointsRecord {
  key: string
  type: string
  issuingLevel: string
  issuingAgentName: string
  issuingAgent: string
  issuingBalance: BalanceInfo

  receivingLevel: string
  receivingAgentName: string
  receivingMember: string
  receivingBalance: BalanceInfo

  turnoverMultiple: number
  requiredTurnover: number

  remarks: string
}
