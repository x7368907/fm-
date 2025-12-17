export interface DataType {
  key: string

  // ⭐ 樹狀結構（重點）
  parentKey: string | null

  // 基本代理資料
  name: string
  account: string
  realName: string
  memberCount: number
  status: string
  group: string
  regTime: string
  loginTime: string
  system: string
  cycle: string

  // ⭐ 層級資訊（組成 1/5(8) 用）
  currentLevel: number
  maxLevel: number
  childCount: number
}
