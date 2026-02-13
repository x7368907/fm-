import { useState } from 'react'
import { message, Modal } from 'antd'
import type { PeopleDataType, HandlerLogData } from '../types'
import { INITIAL_DATA } from '../utils/fakeData'

export const usePeopleManagement = () => {
  // === 狀態管理 ===
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list')
  const [editingRecord, setEditingRecord] = useState<PeopleDataType | null>(
    null
  )
  const [dataSource, setDataSource] = useState<PeopleDataType[]>(INITIAL_DATA)
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  // === 動作處理 ===

  // 1. 搜尋
  const handleSearch = (values: any) => {
    console.log('Search Condition:', values)
    message.success('執行搜尋更新列表')
    // 實作：過濾 dataSource
  }

  // 2. 切換新增模式
  const handleCreate = () => {
    setEditingRecord(null)
    setViewMode('form')
  }

  // 3. 切換編輯模式
  const handleEdit = (record: PeopleDataType) => {
    setEditingRecord(record)
    setViewMode('form')
  }

  // 4. 返回列表
  const handleBack = () => {
    setViewMode('list')
  }

  // 5. 儲存資料
  const handleSaveData = (values: PeopleDataType) => {
    if (editingRecord) {
      // 更新
      setDataSource((prev) =>
        prev.map((item) => {
          if (item.key === editingRecord.key) {
            return { ...item, ...values }
          }
          return item
        })
      )
      message.success(`更新成功：${values.name}`)
    } else {
      // 新增
      const newRecord: PeopleDataType = {
        ...values,
        key: Date.now().toString(),
      }
      setDataSource((prev) => [newRecord, ...prev])
      message.success(`新增成功：${values.name}`)
    }
    setViewMode('list')
  }

  // 6. 刪除資料
  const handleDelete = (key: string) => {
    Modal.confirm({
      title: '確定刪除此人員?',
      content: '刪除後將無法復原，請確認。',
      okText: '確認刪除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        setDataSource((prev) => prev.filter((item) => item.key !== key))
        message.success('已刪除人員')
      },
    })
  }

  // 7. 處理日誌
  const handleFetchLogs = (record: PeopleDataType) => {
    const mockLogs: HandlerLogData[] = [
      {
        key: 'log-1',
        time: '2026-01-30 14:20:00',
        handler: 'admin',
        status: '修改',
        details: `修改 [${record.name}] 的部門設定`,
      },
    ]
    setCurrentLogs(mockLogs)
    setIsHandlerModalOpen(true)
  }

  const closeHandlerModal = () => setIsHandlerModalOpen(false)

  return {
    // 狀態
    viewMode,
    editingRecord,
    dataSource,
    isHandlerModalOpen,
    currentLogs,
    // 方法
    handleSearch,
    handleCreate,
    handleEdit,
    handleBack,
    handleSaveData,
    handleDelete,
    handleFetchLogs,
    closeHandlerModal,
  }
}
