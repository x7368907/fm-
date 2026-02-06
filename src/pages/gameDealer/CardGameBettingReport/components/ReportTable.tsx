import { useMemo } from 'react'
import { Table, Spin } from 'antd'
import type { ColumnsType } from 'antd/es/table'

// 引入棋牌報表的型別
import type {
  CardGameBettingData,
  GameDetailData,
  MemberDetailData,
  TotalSummary,
  ViewMode,
} from '../types'

import { useInfiniteTable } from './hooks/useInfiniteTable'
import { getColumnsL1 } from './columns/columnsL1'
import { getColumnsL2 } from './columns/columnsL2'
import { getColumnsL3 } from './columns/columnsL3'

// 統一用這個 Row 型別，包含所有層級的欄位，方便 Table 使用
type ReportRow = CardGameBettingData &
  Partial<GameDetailData> &
  Partial<MemberDetailData>

interface ReportTableProps {
  viewMode: ViewMode
  // 外部傳進來的可能是 L1, L2 或 L3 的陣列
  dataSource: CardGameBettingData[] | GameDetailData[] | MemberDetailData[]
  totalData: TotalSummary // 合計資料
  loading?: boolean
  onGoToGameDetail: (record: CardGameBettingData) => void
  onGoToMemberDetail: (record: GameDetailData) => void
  onViewDetail: (record: MemberDetailData) => void // L3 的檢視按鈕
}

const SCROLL_HEIGHT = 600

export default function ReportTable({
  viewMode,
  dataSource,
  totalData,
  loading = false,
  onGoToGameDetail,
  onGoToMemberDetail,
  onViewDetail,
}: ReportTableProps) {
  // 強制轉型：將外部資料統一視為 ReportRow
  const normalizedDataSource = dataSource as unknown as ReportRow[]

  // 使用無限滾動 Hook
  const { list, finished, loadingMore, containerRef, handleScroll } =
    useInfiniteTable<ReportRow>({
      dataSource: normalizedDataSource,
      resetDeps: [viewMode], // 當 viewMode 改變時重置滾動
    })

  // 取得對應的 Columns
  const columns: ColumnsType<ReportRow> = useMemo(() => {
    switch (viewMode) {
      case 'gameDetail':
        return getColumnsL2(
          totalData,
          onGoToMemberDetail
        ) as unknown as ColumnsType<ReportRow>
      case 'memberDetail':
        return getColumnsL3(
          totalData,
          onViewDetail
        ) as unknown as ColumnsType<ReportRow>
      default:
        // 'list'
        return getColumnsL1(
          totalData,
          onGoToGameDetail
        ) as unknown as ColumnsType<ReportRow>
    }
  }, [viewMode, totalData, onGoToGameDetail, onGoToMemberDetail, onViewDetail])

  // L3 欄位較多，需要比較寬的滾動範圍
  const scrollX = viewMode === 'list' ? 1400 : 1800

  return (
    <div className="rounded border border-gray-300 bg-white">
      {/* 滾動容器 */}
      <div
        ref={containerRef}
        style={{ maxHeight: SCROLL_HEIGHT, overflowY: 'auto' }}
        onScroll={handleScroll}
      >
        <Table<ReportRow>
          loading={loading}
          columns={columns}
          dataSource={list} // 使用 Hook 切割後的 list (分批顯示)
          rowKey="key"
          size="small"
          bordered
          sticky // 讓 Header 固定
          pagination={false} // 關閉原本的分頁，改用無限滾動
          scroll={{ x: scrollX }}
        />

        {/* 載入中動畫 */}
        {loadingMore && (
          <div className="flex justify-center py-3">
            <Spin tip="載入中..." />
          </div>
        )}

        {/* 無資料狀態 */}
        {!loading && finished && list.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-400">無資料</div>
        )}

        {/* 到底提示 */}
        {!loading && finished && list.length > 0 && (
          <div className="py-3 text-center text-sm text-gray-400">
            已無更多資料
          </div>
        )}
      </div>
    </div>
  )
}
