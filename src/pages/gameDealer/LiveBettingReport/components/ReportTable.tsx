// src/pages/gameDealer/LiveBettingReport/components/ReportTable.tsx
import { useMemo } from 'react'
import { Table, Spin } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import type {
  BettingData,
  GameDetailData,
  MemberDetailData,
  ViewMode,
} from '../types'

import { useInfiniteTable } from './hooks/useInfiniteTable'
import { getColumnsL1, getColumnsL2, getColumnsL3 } from './columns'

// ✅ 內部統一用這個 Row 型別（Table/columns 都吃它）
type ReportRow = BettingData &
  Partial<GameDetailData> &
  Partial<MemberDetailData>

interface ReportTableProps {
  viewMode: ViewMode
  // ✅ 重點：外部傳進來允許是 union
  dataSource: BettingData[] | GameDetailData[] | MemberDetailData[]
  totalData: any
  loading?: boolean
  onGoToGameDetail: (record: BettingData) => void
  onGoToMemberDetail: (record: GameDetailData) => void
}

const SCROLL_HEIGHT = 600

export default function ReportTable({
  viewMode,
  dataSource,
  totalData,
  loading = false,
  onGoToGameDetail,
  onGoToMemberDetail,
}: ReportTableProps) {
  // ✅ 在這裡統一轉成 ReportRow[]（只轉一次，後面全部都用它）
  const normalizedDataSource = dataSource as unknown as ReportRow[]

  const { list, finished, loadingMore, containerRef, handleScroll } =
    useInfiniteTable<ReportRow>({
      dataSource: normalizedDataSource,
      resetDeps: [viewMode],
    })

  const columns: ColumnsType<ReportRow> = useMemo(() => {
    switch (viewMode) {
      case 'gameDetail':
        return getColumnsL2(
          totalData,
          onGoToMemberDetail
        ) as ColumnsType<ReportRow>
      case 'memberDetail':
        return getColumnsL3(totalData) as ColumnsType<ReportRow>
      default:
        return getColumnsL1(
          totalData,
          onGoToGameDetail
        ) as ColumnsType<ReportRow>
    }
  }, [viewMode, totalData, onGoToGameDetail, onGoToMemberDetail])

  const scrollX = viewMode === 'list' ? 1400 : 1800

  return (
    <div className="rounded border border-gray-300 bg-white">
      <div
        ref={containerRef}
        style={{ maxHeight: SCROLL_HEIGHT, overflowY: 'auto' }}
        onScroll={handleScroll}
      >
        <Table<ReportRow>
          loading={loading}
          columns={columns}
          dataSource={list}
          rowKey="key"
          size="small"
          bordered
          sticky
          pagination={false}
          scroll={{ x: scrollX }}
        />

        {loadingMore && (
          <div className="flex justify-center py-3">
            <Spin tip="載入中..." />
          </div>
        )}

        {!loading && finished && list.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-400">無資料</div>
        )}

        {!loading && finished && list.length > 0 && (
          <div className="py-3 text-center text-sm text-gray-400">
            已無更多資料
          </div>
        )}
      </div>
    </div>
  )
}
