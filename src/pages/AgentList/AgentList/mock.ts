import type { DataType } from './types'

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

function randomDate(start: Date, end: Date) {
  const ts = start.getTime() + Math.random() * (end.getTime() - start.getTime())
  const d = new Date(ts)
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

export const MOCK_DATA: DataType[] = Array.from({ length: 100 }).map((_, i) => {
  const idx = i + 1
  const realName = names[Math.floor(Math.random() * names.length)]
  const account =
    Math.random() > 0.5
      ? `09${Math.floor(10000000 + Math.random() * 90000000)}`
      : `test_${idx}`
  const status = statuses[Math.floor(Math.random() * statuses.length)]
  const system = systems[Math.floor(Math.random() * systems.length)]
  const group = groups[Math.floor(Math.random() * groups.length)]
  const memberCount = Math.floor(Math.random() * 200) + 1
  const levelPool = ['1/5(8)', '1/6(3)', '2/3(5)', '3/4(2)']
  const level = levelPool[Math.floor(Math.random() * levelPool.length)]

  return {
    key: `${idx}`,
    level,
    name: `代理 ${idx}`,
    memberCount,
    account,
    realName,
    status,
    group,
    regTime: randomDate(new Date(2024, 0, 1), new Date(2025, 3, 1)),
    loginTime: randomDate(new Date(2025, 3, 1), new Date(2025, 11, 1)),
    system,
    cycle: '週結 (每週日-23:59:59)',
  }
})
