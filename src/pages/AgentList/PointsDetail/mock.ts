import type { PointsRecord } from './types'

export const MOCK_DATA: PointsRecord[] = Array.from({ length: 100 }).map(
  (_, i) => ({
    key: `${i}`,
    type: i % 2 === 0 ? '獎勵點數發放' : '獎勵點數回收',
    issuingLevel: `1/${4 + i} (8)`,
    issuingAgentName: 'FMCA (金哥/成數代理-主站)',
    issuingAgent: '張大媽',
    issuingBalance: {
      change: i % 2 === 0 ? -2000 : 2000,
      before: '5,213,594',
      after: '5,211,594',
    },
    receivingLevel: `2/${4 + i} (3)`,
    receivingAgentName: 'FMCA2 (主站-股東)',
    receivingMember: '王大福',
    receivingBalance: {
      change: i % 2 === 0 ? 2000 : -2000,
      before: '99,999,999',
      after: '99,999,999',
    },
    turnoverMultiple: i % 2 === 0 ? 1 : 0,
    requiredTurnover: i % 2 === 0 ? 2000 : 0,
    remarks: i === 0 ? '手動補發獎勵測試備註' : '',
  })
)
