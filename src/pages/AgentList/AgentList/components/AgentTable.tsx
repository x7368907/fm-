import { useEffect, useRef, useState } from 'react'
import { Table, Spin } from 'antd'

import { MOCK_DATA } from '../mock'
import { getColumns } from '../columns'
import type { DataType } from '../types'

export default function AgentTable({
  onEdit,
  onLogs,
  onViewFrontend,
  onPoints,
}: {
  onEdit: (r: DataType) => void
  onLogs: (r: DataType) => void
  onViewFrontend: (r: DataType) => void
  onPoints: (r: DataType) => void
}) {
  const [list, setList] = useState<DataType[]>([])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // ★ 初始載入 20 筆
  useEffect(() => {
    setList(MOCK_DATA.slice(0, 20))
  }, [])

  // ★ 無限滾動偵測
  const handleScroll = () => {
    const el = containerRef.current
    if (!el || loading || finished) return

    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20
    if (isBottom) loadMore()
  }

  const loadMore = () => {
    if (loading) return
    setLoading(true)

    // 模擬延遲（未來換成 API 就放 fetch）
    setTimeout(() => {
      const newLimit = limit + 20
      const nextData = MOCK_DATA.slice(0, newLimit)

      setList(nextData)
      setLimit(newLimit)
      setLoading(false)

      if (nextData.length >= MOCK_DATA.length) {
        setFinished(true)
      }
    }, 700)
  }

  return (
    <div
      ref={containerRef}
      style={{ maxHeight: '600px', overflowY: 'auto' }}
      onScroll={handleScroll}
    >
      <Table
        columns={getColumns({ onEdit, onLogs, onViewFrontend, onPoints })}
        dataSource={list}
        scroll={{ x: 1800 }}
        pagination={false} // ★ 關掉 pagination
      />

      {/* ★ Loading UI */}
      {loading && (
        <div className="flex justify-center py-3">
          <Spin tip="載入中..." />
        </div>
      )}

      {/* ★ 已經載完 */}
      {finished && (
        <div className="py-3 text-center text-sm text-gray-400">
          已無更多資料
        </div>
      )}
    </div>
  )
}
