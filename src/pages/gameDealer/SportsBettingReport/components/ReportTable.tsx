import { useMemo } from 'react'
import { Table, Spin } from 'antd'
import type { ColumnsType } from 'antd/es/table'

// 引入體育報表的型別
import type {
  SportsBettingData,
  SportsGameDetailData,
  MemberBetDetailData,
  ViewMode,
} from '../types'

import { useInfiniteTable } from './hooks/useInfiniteTable'
import { getColumnsL1 } from './columns/columnsL1'
import { getColumnsL2 } from './columns/columnsL2'
import { getColumnsL3 } from './columns/columnsL3'

// ✅ 內部統一用這個 Row 型別，包含所有層級的欄位，解決 TS Union Type 問題
type ReportRow = SportsBettingData &
  Partial<SportsGameDetailData> &
  Partial<MemberBetDetailData>

interface ReportTableProps {
  viewMode: ViewMode
  // 外部傳進來的可能是 L1, L2 或 L3 的陣列
  dataSource:
    | SportsBettingData[]
    | SportsGameDetailData[]
    | MemberBetDetailData[]
  totalData: any // 合計資料
  loading?: boolean
  onGoToGameDetail: (record: SportsBettingData) => void
  onGoToMemberDetail: (record: SportsGameDetailData) => void
  onViewDetail?: (record: MemberBetDetailData) => void // 預留給 L3 檢視詳情 (如有需要)
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
  // ✅ 強制轉型：將外部資料統一視為 ReportRow
  const normalizedDataSource = dataSource as unknown as ReportRow[]

  // 使用無限滾動 Hook
  const { list, finished, loadingMore, containerRef, handleScroll } =
    useInfiniteTable<ReportRow>({
      dataSource: normalizedDataSource,
      resetDeps: [viewMode], // 當 viewMode 改變時重置滾動
    })

  // 取得對應的 Columns，並強制轉型為 ColumnsType<ReportRow>
  const columns: ColumnsType<ReportRow> = useMemo(() => {
    switch (viewMode) {
      case 'gameDetail':
        return getColumnsL2({
          total: totalData,
          onNavigate: onGoToMemberDetail,
        }) as unknown as ColumnsType<ReportRow>
      case 'memberDetail':
        return getColumnsL3({
          total: totalData,
        }) as unknown as ColumnsType<ReportRow>
      default:
        return getColumnsL1({
          total: totalData,
          onNavigate: onGoToGameDetail,
        }) as unknown as ColumnsType<ReportRow>
    }
  }, [viewMode, totalData, onGoToGameDetail, onGoToMemberDetail])

  // L3 欄位較多，給予較寬的滾動範圍
  const scrollX =
    viewMode === 'memberDetail' ? 1800 : viewMode === 'gameDetail' ? 1600 : 1300

  return (
    <div className="rounded border border-gray-300 bg-white">
      {/* 滾動容器 */}
      <div
        ref={containerRef}
        style={{ maxHeight: SCROLL_HEIGHT, overflowY: 'auto' }}
        onScroll={handleScroll}
        className="relative"
      >
        <Table<ReportRow>
          loading={loading}
          columns={columns}
          dataSource={list} // 使用 Hook 切割後的 list
          rowKey="key"
          size="small"
          bordered
          sticky // 讓 Header 固定
          pagination={false} // 關閉原本的分頁，改用無限滾動
          scroll={{ x: scrollX }}
        />

        {/* 載入中動畫 (滾動加載時顯示) */}
        {loadingMore && (
          <div className="flex justify-center border-t border-gray-100 bg-gray-50 py-4">
            <Spin tip="載入更多資料..." size="small" />
          </div>
        )}

        {/* 無資料狀態 (完全沒資料時) */}
        {!loading && finished && list.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-400">無資料</div>
        )}

        {/* ✅ 滑到底提示 (有資料且已載入完畢) */}
        {!loading && finished && list.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50 py-3 text-center text-xs text-gray-400">
            已無更多資料
          </div>
        )}
      </div>
    </div>
  )
}
