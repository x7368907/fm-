import type { DataType } from './types'

const MAX_LEVEL = 5
const ROOT_COUNT = 3
const CHILD_RANGE = [1, 3]

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const randomFrom = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

let id = 1
export const MOCK_DATA: DataType[] = []

function createAgent(level: number, parentKey: string | null): DataType {
  const key = String(id++)
  const childCount =
    level < MAX_LEVEL ? random(CHILD_RANGE[0], CHILD_RANGE[1]) : 0

  // ⭐ 先決定制度
  const profitSystem = randomFrom<'佔成制' | '反水制'>(['佔成制', '反水制'])

  // ⭐ 依制度決定數值
  const isShare = profitSystem === '佔成制'

  return {
    key,
    parentKey,
    currentLevel: level,
    maxLevel: MAX_LEVEL,
    childCount,

    name: `agent_${key}`,
    account: `09${random(10000000, 99999999)}`,
    realName: randomFrom(['王大尾', '林測試', '張代理', '陳小明']),
    memberCount: random(0, 300),

    status: randomFrom(['啟用', '停用']),
    cashGroup: '常規會員',

    registerTime: '2025/04/05 12:59:49',
    lastLoginTime: '2025/05/20 13:48:39',

    // ===== 分潤制度 =====
    profitSystem,

    // ⭐ 佔成制才有分潤比例
    profitRate: isShare ? randomFrom([70, 80, 90]) : 0,

    // ⭐ 反水制才有返水比例
    liveRate: isShare ? 0 : randomFrom([0.3, 0.4, 0.5]),
    slotRate: isShare ? 0 : randomFrom([0.3, 0.4, 0.5]),
    sportRate: isShare ? 0 : randomFrom([0.2, 0.3]),
    lotteryRate: 0, // 通常彩票為 0
    chessRate: isShare ? 0 : randomFrom([0.3, 0.4]),
    fishRate: isShare ? 0 : randomFrom([0.3, 0.4]),

    settlement: randomFrom(['週結', '月結']),
  }
}

// 🌳 遞迴產生樹狀代理
function generate(level: number, parentKey: string | null) {
  const count = level === 1 ? ROOT_COUNT : random(1, 3)

  for (let i = 0; i < count; i++) {
    const agent = createAgent(level, parentKey)
    MOCK_DATA.push(agent)

    if (agent.childCount > 0) {
      generate(level + 1, agent.key)
    }
  }
}

// 🚀 初始化
generate(1, null)
