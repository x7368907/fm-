import React, { useEffect, useRef, useState, useMemo } from 'react'
import { Table, Tag, Button, Dropdown, Spin } from 'antd'
import {
  DownOutlined,
  EditOutlined,
  StopOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { MenuProps } from 'antd'
import type { PeopleDataType } from '../types'

interface PeopleTableProps {
  dataSource: PeopleDataType[]
  loading?: boolean
  onEdit: (record: PeopleDataType) => void
  onLogs: (record: PeopleDataType) => void
  onDelete: (key: string) => void
}

const PAGE_SIZE = 20
const SCROLL_HEIGHT = 600

const PeopleTable: React.FC<PeopleTableProps> = ({
  dataSource,
  loading = false,
  onEdit,
  onLogs,
  onDelete,
}) => {
  // ===== 無限滾動狀態 =====
  const [list, setList] = useState<PeopleDataType[]>([])
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)
  const [finished, setFinished] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMenuClick = (key: string, record: PeopleDataType) => {
    if (key === 'edit') onEdit(record)
    else if (key === 'logs') onLogs(record)
    else if (key === 'delete' && record.key) onDelete(record.key)
  }

  const columns: ColumnsType<PeopleDataType> = useMemo(
    () => [
      {
        title: '員工編號',
        dataIndex: 'employeeId',
        key: 'employeeId',
        width: 150,
        align: 'center',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 150,
        align: 'center',
        render: (text) => (
          <span className="font-medium text-gray-700">{text}</span>
        ),
      },
      {
        title: '部門',
        dataIndex: 'department',
        key: 'department',
        width: 150,
        align: 'center',
        render: (text) => (
          <Tag color={text === '風控部' ? 'red' : 'blue'}>{text}</Tag>
        ),
      },
      {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
        align: 'center',
        render: (text) => <span className="text-gray-500">{text}</span>,
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
              label: '編輯',
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
              label: '刪除',
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
    [onEdit, onLogs, onDelete]
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
        <Table<PeopleDataType>
          columns={columns}
          dataSource={list}
          rowKey="key"
          pagination={false}
          sticky
          size="middle"
          scroll={{ x: 1000 }}
          bordered
          rowClassName="hover:bg-gray-50 align-middle"
          loading={loading}
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

export default PeopleTable
