import { useEffect, useState } from 'react'
import { message } from 'antd'
import type { DataType } from '../types'
import { MOCK_DATA } from '../mock'

export type ViewMode = 'search' | 'hierarchy'

interface UseAgentHierarchyReturn {
  agentList: DataType[]
  cardTitle: React.ReactNode
  viewMode: ViewMode

  // actions
  initDefaultLevel: () => void
  searchByLevel: (levelValue: string) => void
  goNextLevel: (record: DataType) => void
  goBackToLevel: (index: number) => void
}

const levelLabel = (level: number) =>
  level === 1 ? '1級總代理' : `${level}級代理`

/**
 * 代理層級 / 搜尋狀態管理
 */
export function useAgentHierarchy(): UseAgentHierarchyReturn {
  // ⭐ Table 資料
  const [agentList, setAgentList] = useState<DataType[]>([])

  // ⭐ 目前列表級別（現在正在看第幾級）
  const [currentLevel, setCurrentLevel] = useState<number>(1)

  // ⭐ 點擊路徑上的「代理」（只存代理，不存級別 label）
  const [agentPath, setAgentPath] = useState<DataType[]>([])

  // ⭐ 每層對應的 parentKey（返回用）

  const [parentKeyPath, setParentKeyPath] = useState<(string | null)[]>([null])

  // ⭐ 搜尋 / 層級 模式
  const [viewMode, setViewMode] = useState<ViewMode>('search')

  /**
   * =========================
   * 初始化：預設 1 級（搜尋模式）
   * =========================
   */
  const initDefaultLevel = () => {
    const list = MOCK_DATA.filter((a) => a.currentLevel === 1)

    setAgentList(list)
    setCurrentLevel(1)
    setAgentPath([])
    setParentKeyPath([null])
    setViewMode('search')
  }

  useEffect(() => {
    initDefaultLevel()
  }, [])

  /**
   * =========================
   * 搜尋：依代理級別
   * =========================
   */
  const searchByLevel = (levelValue: string) => {
    if (!levelValue || levelValue === 'all') {
      message.warning('請選擇代理級別')
      return
    }

    const levelNumber = Number(levelValue.replace('lvl', ''))
    const list = MOCK_DATA.filter((a) => a.currentLevel === levelNumber)

    setAgentList(list)
    setCurrentLevel(levelNumber)
    setAgentPath([])
    setParentKeyPath([null])
    setViewMode('search')
  }

  /**
   * =========================
   * 層級導覽：往下一層
   * =========================
   */
  const goNextLevel = (record: DataType) => {
    const nextLevel = record.currentLevel + 1
    if (nextLevel > record.maxLevel) return

    const list = MOCK_DATA.filter((a) => a.parentKey === record.key)

    if (list.length === 0) {
      message.info('此代理沒有下線代理')
      return
    }

    setAgentList(list)

    // ⭐ 路徑加入「被點擊的代理」
    setAgentPath((prev) => [...prev, record])

    // ⭐ parentKeyPath 也加入（用於回上一層）
    setParentKeyPath((prev) => [...prev, record.key])

    // ⭐ 現在正在看的是 nextLevel（被點代理的下線級別）
    setCurrentLevel(nextLevel)

    setViewMode('hierarchy')
  }

  /**
   * =========================
   * Breadcrumb 點擊返回（點代理名稱返回）
   * index：agentPath 的 index
   * =========================
   */
  const goBackToLevel = (index: number) => {
    // 點 agentPath[index]，代表要回到「這個代理的下線列表」
    const targetAgent = agentPath[index]
    const list = MOCK_DATA.filter((a) => a.parentKey === targetAgent.key)

    setAgentList(list)

    // 截斷路徑到該代理
    setAgentPath(agentPath.slice(0, index + 1))
    setParentKeyPath(parentKeyPath.slice(0, index + 2)) // [null, ...target.key]

    // 回到該代理的下一層級
    setCurrentLevel(targetAgent.currentLevel + 1)
  }

  /**
   * =========================
   * Card title render
   * =========================
   */
  const cardTitle =
    viewMode === 'search' ? (
      levelLabel(currentLevel)
    ) : (
      <div className="flex flex-wrap items-center gap-1">
        {/* ⭐ 只顯示代理路徑（可點回去） */}
        {agentPath.map((agent, idx) => (
          <span key={agent.key}>
            <span
              onClick={() => goBackToLevel(idx)}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              {agent.name}
            </span>
            {' > '}
          </span>
        ))}

        {/* ⭐ 最後顯示目前級別（不可點） */}
        <span className="text-gray-700">{levelLabel(currentLevel)}</span>
      </div>
    )

  return {
    agentList,
    cardTitle,
    viewMode,

    initDefaultLevel,
    searchByLevel,
    goNextLevel,
    goBackToLevel,
  }
}
