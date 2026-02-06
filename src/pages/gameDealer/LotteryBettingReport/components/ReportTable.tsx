import { Table, Spin } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useInfiniteTable } from './hooks/useInfiniteTable'

interface ReportTableProps {
  columns: ColumnsType<any>
  dataSource: any[]
  viewMode: string
}

export default function ReportTable({
  columns,
  dataSource,
  viewMode,
}: ReportTableProps) {
  // 1. 使用 Hook 取得狀態：list (目前顯示的資料), finished (是否全部載入), loadingMore (載入中)
  const { list, finished, loadingMore, containerRef, handleScroll } =
    useInfiniteTable({
      dataSource,
      pageSize: 20,
      resetDeps: [viewMode],
    })

  // 為了配合電子報表的邏輯，這裡定義一個 loading 變數
  // 如果您的主檔有傳入初始 loading，也可以從 Props 接進來，這裡預設為 false
  const loading = false

  return (
    <div className="rounded border border-gray-300 bg-white">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        // 設定固定高度與垂直滾動
        style={{ height: 'calc(100vh - 300px)', overflowY: 'auto' }}
      >
        <Table<any>
          columns={columns}
          dataSource={list}
          rowKey="key"
          size="small"
          pagination={false}
          scroll={{ x: viewMode === 'list' ? 1400 : 1600 }}
          bordered
          // ★ 修改點 1: 移除 footer 屬性
          // footer={...}  <-- 刪除這行

          // 讓表頭固定 (電子報表有加這個)
          sticky
        />

        {/* ★ 修改點 2: 將提示訊息放在 Table 下方 */}

        {/* 載入更多時的轉圈圈 */}
        {loadingMore && (
          <div className="flex justify-center py-3">
            <Spin tip="載入中..." size="small" />
          </div>
        )}

        {/* 無資料狀態 (當不是載入中、已結束、且資料長度為 0) */}
        {!loading && finished && list.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-400">無資料</div>
        )}

        {/* 到底提示 (當不是載入中、已結束、且有資料) */}
        {!loading && finished && list.length > 0 && (
          <div className="py-3 text-center text-sm text-gray-400">
            已無更多資料
          </div>
        )}
      </div>
    </div>
  )
}
