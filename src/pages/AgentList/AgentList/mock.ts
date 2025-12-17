import type { DataType } from './types'

/**
 * ===== 基本假資料 =====
 */
const names = [
  '王大星',
  '陳小明',
  '林雅婷',
  '張書豪',
  '吳怡君',
  '趙建國',
  '周品妍',
  '許珮琪',
  '黃志偉',
]

const groups = ['常規會員', 'VIP會員']
const systems = ['佔成制', '反水制']
const statuses = ['啟用', '停用']

const randomPick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

const randomPhone = () => `09${Math.floor(10000000 + Math.random() * 90000000)}`

const randomDate = (start: Date, end: Date) => {
  const ts = start.getTime() + Math.random() * (end.getTime() - start.getTime())
  const d = new Date(ts)
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(
    d.getDate()
  )} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

/**
 * ===== 產生代理樹 =====
 */

let idCounter = 1
const allAgents: DataType[] = []

interface CreateNodeParams {
  parentKey: string | null
  currentLevel: number
  maxLevel: number
}

const createAgentNode = ({
  parentKey,
  currentLevel,
  maxLevel,
}: CreateNodeParams): DataType => {
  const key = String(idCounter++)
  const agent: DataType = {
    key,
    parentKey,
    name: `代理 ${key}`,
    account: randomPhone(),
    realName: randomPick(names),
    memberCount: Math.floor(Math.random() * 200) + 1,
    status: randomPick(statuses),
    group: randomPick(groups),
    regTime: randomDate(new Date(2024, 0, 1), new Date(2025, 3, 1)),
    loginTime: randomDate(new Date(2025, 3, 1), new Date(2025, 11, 1)),
    system: randomPick(systems),
    cycle: '週結 (每週日-23:59:59)',

    currentLevel,
    maxLevel,
    childCount: 0, // 下面會補
  }

  allAgents.push(agent)

  // ⭐ 只有沒到 maxLevel 才產生子代理
  if (currentLevel < maxLevel) {
    const childCount = Math.floor(Math.random() * 3) + 1 // 每層 1~3 個子代理
    agent.childCount = childCount

    for (let i = 0; i < childCount; i++) {
      createAgentNode({
        parentKey: key,
        currentLevel: currentLevel + 1,
        maxLevel,
      })
    }
  } else {
    agent.childCount = 0
  }

  return agent
}

/**
 * ===== 建立整棵代理樹 =====
 */

// 建立 3 個「1級總代理」，每個 maxLevel 不同
createAgentNode({ parentKey: null, currentLevel: 1, maxLevel: 5 })
createAgentNode({ parentKey: null, currentLevel: 1, maxLevel: 4 })
createAgentNode({ parentKey: null, currentLevel: 1, maxLevel: 6 })

/**
 * ===== 匯出 mock =====
 */
export const MOCK_DATA: DataType[] = allAgents
