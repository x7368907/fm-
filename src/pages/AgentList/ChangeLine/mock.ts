import type { ChangeLineDataType } from './types'

export const MOCK_DATA: ChangeLineDataType[] = Array.from({ length: 60 }).map(
  (_, i) => ({
    key: i,
    sourceLevel: '4/5',
    memberCount: 23,
    sourceAgentName: 'yaya520',
    sourceAgentRealName: '金池/成數代理-外代-yaya',
    upperLevel: '2/5',
    upperAgentName: 'FMCA2\n(主站-總代)',
    profitSetting: [
      {
        type: '反水',
        detail: '(總投注額回饋)',
        val: '抽水代理(無下退水) 返水:0.6 總彩:0.5 彩票:0',
      },
      {
        type: '反水',
        detail: '(總投注額回饋)',
        val: '抽水代理(無下退水) 返水: 真人1 其他0.5 彩票0',
      },
    ],
    profitName: '週結\n(每週日-23:59:59)',
    handler: 'Admin',
  })
)
