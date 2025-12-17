import { useEffect, useState } from 'react'
import { message } from 'antd'
import type { DataType } from '../types'

export type ViewMode = 'search' | 'hierarchy'

export function useAgentHierarchy() {
  const [agentList, setAgentList] = useState<DataType[]>([])
  const [cardLevelPath, setCardLevelPath] = useState<number[]>([1])
  const [parentKeyPath, setParentKeyPath] = useState<(string | null)[]>([null])
  const [viewMode, setViewMode] = useState<ViewMode>('search')
  const [loading, setLoading] = useState(false)

  // 共用 API 呼叫
  const fetchAgents = async (params: Record<string, any>) => {
    setLoading(true)
    try {
      const query = new URLSearchParams(params).toString()
      const res = await fetch(`/api/agents?${query}`)
      const json = await res.json()
      return json.data as DataType[]
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      message.error('取得代理資料失敗')
      return []
    } finally {
      setLoading(false)
    }
  }

  // 初始化：預設 1 級（搜尋模式）
  const initDefaultLevel = async () => {
    const list = await fetchAgents({ level: 1 })
    setAgentList(list)
    setCardLevelPath([1])
    setParentKeyPath([null])
    setViewMode('search')
  }

  useEffect(() => {
    initDefaultLevel()
  }, [])

  // 搜尋：依代理級別
  const searchByLevel = async (levelValue: string) => {
    if (!levelValue || levelValue === 'all') {
      message.warning('請選擇代理級別')
      return
    }

    const level = Number(levelValue.replace('lvl', ''))
    const list = await fetchAgents({ level })

    setAgentList(list)
    setCardLevelPath([level])
    setParentKeyPath([null])
    setViewMode('search')
  }

  // 層級導覽：下一層
  const goNextLevel = async (record: DataType) => {
    if (record.currentLevel >= record.maxLevel) return

    const list = await fetchAgents({ parentId: record.key })

    if (list.length === 0) {
      message.info('此代理沒有下線代理')
      return
    }

    setAgentList(list)
    setCardLevelPath((prev) => [...prev, record.currentLevel + 1])
    setParentKeyPath((prev) => [...prev, record.key])
    setViewMode('hierarchy')
  }

  // Card title 點擊返回
  const goBackToLevel = async (index: number) => {
    const parentKey = parentKeyPath[index]
    const level = cardLevelPath[index]

    const list =
      parentKey === null
        ? await fetchAgents({ level })
        : await fetchAgents({ parentId: parentKey })

    setAgentList(list)
    setCardLevelPath(cardLevelPath.slice(0, index + 1))
    setParentKeyPath(parentKeyPath.slice(0, index + 1))
  }

  // Card title
  const cardTitle =
    viewMode === 'search' ? (
      levelTitle(cardLevelPath[0])
    ) : (
      <div className="flex flex-wrap items-center gap-1">
        {cardLevelPath.map((level, idx) => (
          <span key={idx}>
            <span
              onClick={() => goBackToLevel(idx)}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              {levelTitle(level)}
            </span>
            {idx < cardLevelPath.length - 1 && ' > '}
          </span>
        ))}
      </div>
    )

  return {
    agentList,
    cardTitle,
    loading,
    searchByLevel,
    goNextLevel,
  }
}

function levelTitle(level: number) {
  return level === 1 ? '1級總代理' : `${level}級代理`
}
