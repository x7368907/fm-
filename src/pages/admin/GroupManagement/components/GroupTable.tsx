// src/pages/GroupManagement/components/GroupTable.tsx
import { useEffect, useRef, useState, useMemo } from 'react'
import { Table, Button, Dropdown, Spin } from 'antd'
import {
  DownOutlined,
  EditOutlined,
  StopOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { MenuProps } from 'antd'
import type { GroupListType } from '../types'

interface GroupTableProps {
  dataSource: GroupListType[]
  loading?: boolean
  onEdit: (record: GroupListType) => void
  onDelete: (key: string) => void
  onShowLogs: (record: GroupListType) => void
}

const PAGE_SIZE = 20
const SCROLL_HEIGHT = 600

export default function GroupTable({
  dataSource,
  loading = false,
  onEdit,
  onDelete,
  onShowLogs,
}: GroupTableProps) {
  // ===== 無限滾動狀態 =====
  const [list, setList] = useState<GroupListType[]>([])
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)
  const [finished, setFinished] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 定義 Dropdown 的點擊行為
  const handleMenuClick = (key: string, record: GroupListType) => {
    if (key === 'edit') onEdit(record)
    else if (key === 'logs') onShowLogs(record)
    else if (key === 'delete') onDelete(record.key!)
  }

  const columns: ColumnsType<GroupListType> = useMemo(
    () => [
      {
        title: '部門編號',
        dataIndex: 'groupId',
        key: 'groupId',
        width: 200,
        align: 'center',
        render: (text) => <span className="text-gray-600">{text}</span>,
      },
      {
        title: '部門名稱',
        dataIndex: 'groupName',
        key: 'groupName',
        align: 'center',
        render: (text) => (
          <span className="font-medium text-gray-800">{text}</span>
        ),
      },
      {
        title: '人數',
        dataIndex: 'memberCount',
        key: 'memberCount',
        width: 150,
        align: 'center',
        render: (count) => (
          <span className="flex items-center justify-center gap-1 text-gray-600">
            {count}
          </span>
        ),
      },
      {
        title: '管理',
        key: 'action',
        width: 120,
        align: 'center',
        render: (_, record) => {
          const menuItems: MenuProps['items'] = [
            {
              key: 'edit',
              label: '編輯群組',
              icon: <EditOutlined />,
              onClick: () => handleMenuClick('edit', record),
            },
            {
              key: 'logs',
              label: '經手人',
              icon: <FileTextOutlined />,
              onClick: () => handleMenuClick('logs', record),
            },
            { type: 'divider' },
            {
              key: 'delete',
              label: '刪除群組',
              icon: <StopOutlined />,
              danger: true,
              onClick: () => handleMenuClick('delete', record),
            },
          ]

          return (
            <Dropdown menu={{ items: menuItems }} trigger={['click']}>
              <Button className="flex w-24 items-center justify-between px-3 text-gray-600">
                管理 <DownOutlined className="text-[10px]" />
              </Button>
            </Dropdown>
          )
        },
      },
    ],
    [onEdit, onDelete, onShowLogs]
  )

  // ✅ dataSource 變動：重置（搜尋/切 tab/重拉資料）
  useEffect(() => {
    const init = dataSource.slice(0, PAGE_SIZE)
    setList(init)
    setLimit(PAGE_SIZE)
    setLoadingMore(false)
    setFinished(dataSource.length <= PAGE_SIZE)
    containerRef.current?.scrollTo({ top: 0 })
  }, [dataSource])

  const loadMore = () => {
    if (loading || loadingMore || finished) return
    setLoadingMore(true)

    // 之後接 API：把 setTimeout 這段換成 await fetchMore()
    setTimeout(() => {
      const nextLimit = limit + PAGE_SIZE
      const next = dataSource.slice(0, nextLimit)

      setList(next)
      setLimit(nextLimit)
      setLoadingMore(false)

      if (next.length >= dataSource.length) setFinished(true)
    }, 300)
  }

  const handleScroll = () => {
    const el = containerRef.current
    if (!el || loading || loadingMore || finished) return
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) loadMore()
  }

  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* ✅ 滾動容器不要 padding（sticky 才不會跑） */}
      <div
        ref={containerRef}
        style={{ maxHeight: SCROLL_HEIGHT, overflowY: 'auto' }}
        onScroll={handleScroll}
      >
        <Table<GroupListType>
          columns={columns}
          dataSource={list}
          loading={loading}
          rowKey="key"
          pagination={false}
          sticky
          size="middle"
          scroll={{ x: 800 }}
          bordered
          rowClassName="hover:bg-gray-50 align-middle"
        />

        {loadingMore && (
          <div className="flex justify-center py-3">
            <Spin tip="載入中..." />
          </div>
        )}

        {!loading && finished && list.length > 0 && (
          <div className="py-3 text-center text-sm text-gray-400">
            已無更多資料
          </div>
        )}

        {!loading && finished && list.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-400">無資料</div>
        )}
      </div>
    </div>
  )
}
