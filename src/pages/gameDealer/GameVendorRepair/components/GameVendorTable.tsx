// src/pages/GameVendorRepair/components/GameVendorTable.tsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Switch, Table, Dropdown, Spin } from 'antd'
import {
  DownOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { MenuProps } from 'antd'
import type { RepairDataType } from '../types'

interface Props {
  dataSource: RepairDataType[]
  loading?: boolean
  onStatusChange: (checked: boolean, key: string) => void
  onEdit: (record: RepairDataType) => void
  onDelete: (record: RepairDataType) => void
  onViewLog: (record: RepairDataType) => void
}

const PAGE_SIZE = 20
const SCROLL_HEIGHT = 600

export default function GameVendorTable({
  dataSource,
  loading = false,
  onStatusChange,
  onEdit,
  onDelete,
  onViewLog,
}: Props) {
  const columns: ColumnsType<RepairDataType> = useMemo(
    () => [
      {
        title: '遊戲類型',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        width: 100,
      },
      {
        title: '遊戲商',
        dataIndex: 'vendorCode',
        key: 'vendorCode',
        align: 'center',
        width: 120,
      },
      {
        title: '新增日期',
        dataIndex: 'addedDate',
        key: 'addedDate',
        align: 'center',
        width: 150,
        render: (text: string) => (
          <div className="flex flex-col items-center leading-tight">
            <span className="text-gray-600">{text.split(' ')[0]}</span>
            <span className="text-xs text-gray-400">{text.split(' ')[1]}</span>
          </div>
        ),
      },
      {
        title: '遊戲商Logo',
        key: 'logo',
        align: 'center',
        width: 100,
        render: () => <Button size="small">檢視</Button>,
      },
      {
        title: '維護頻率',
        dataIndex: 'frequency',
        key: 'frequency',
        align: 'center',
        width: 150,
      },
      {
        title: '維修時間(起)',
        dataIndex: 'startTime',
        key: 'startTime',
        align: 'center',
        width: 120,
      },
      {
        title: '維修時間(迄)',
        dataIndex: 'endTime',
        key: 'endTime',
        align: 'center',
        width: 120,
      },
      {
        title: '狀態',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: 100,
        render: (checked: boolean, record: RepairDataType) => (
          <Switch
            checked={checked}
            checkedChildren="ON"
            unCheckedChildren="OFF"
            onChange={(val) => onStatusChange(val, record.key)}
            style={{ backgroundColor: checked ? '#52c41a' : undefined }}
          />
        ),
      },
      {
        title: '管理',
        key: 'action',
        align: 'center',
        width: 120,
        render: (_: any, record: RepairDataType) => {
          const menuItems: MenuProps['items'] = [
            {
              key: 'edit',
              label: '編輯設定',
              icon: <EditOutlined />,
              onClick: () => onEdit(record),
            },
            {
              key: 'logs',
              label: '經手人',
              icon: <FileTextOutlined />,
              onClick: () => onViewLog(record),
            },
            { type: 'divider' },
            {
              key: 'delete',
              label: '刪除設定',
              icon: <DeleteOutlined />,
              danger: true,
              onClick: () => onDelete(record),
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
    [onStatusChange, onEdit, onDelete, onViewLog]
  )

  // ===== 無限滾動狀態 =====
  const [list, setList] = useState<RepairDataType[]>([])
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)
  const [finished, setFinished] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // ✅ dataSource 變動就重置（搜尋/切 tab/重拉資料）
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

    // 之後接 API：把 setTimeout 換成 await fetchMore()
    setTimeout(() => {
      const nextLimit = limit + PAGE_SIZE
      const next = dataSource.slice(0, nextLimit)

      setList(next)
      setLimit(nextLimit)
      setLoadingMore(false)

      if (next.length >= dataSource.length) setFinished(true)
    }, 350)
  }

  const handleScroll = () => {
    const el = containerRef.current
    if (!el || loading || loadingMore || finished) return
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) loadMore()
  }

  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* ✅ 這層不要 padding，sticky 才不會跑 */}
      <div
        ref={containerRef}
        style={{ maxHeight: SCROLL_HEIGHT, overflowY: 'auto' }}
        onScroll={handleScroll}
      >
        <Table<RepairDataType>
          columns={columns}
          dataSource={list}
          rowKey="key"
          loading={loading}
          pagination={false}
          sticky
          size="middle"
          scroll={{ x: 1000 }}
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
