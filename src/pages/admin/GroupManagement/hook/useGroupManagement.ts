// src/pages/GroupManagement/hook/useGroupManagement.ts
import { useState } from 'react'
import { message, Modal } from 'antd'
import type { GroupListType, GroupDataType } from '../types'
import { INITIAL_DATA } from '../utils/fakeData'
import type { HandlerLogData } from '../../../AgentList/components/HandlerModal' // 請依實際路徑調整

export default function useGroupManagement() {
  // --- States ---
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list')
  const [dataSource, setDataSource] = useState<GroupListType[]>(INITIAL_DATA)
  const [editingRecord, setEditingRecord] = useState<GroupListType | null>(null)

  // 經手人彈窗狀態
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  // --- Actions ---

  // 1. 搜尋
  const handleSearch = (values: any) => {
    console.log('Search Condition:', values)
    message.loading({ content: '搜尋中...', key: 'search', duration: 1 })
    // 模擬 API 請求
    setTimeout(() => {
      message.success({ content: '列表已更新', key: 'search' })
    }, 500)
  }

  // 2. 切換新增模式
  const handleCreate = () => {
    setEditingRecord(null)
    setViewMode('form')
  }

  // 3. 切換編輯模式
  const handleEdit = (record: GroupListType) => {
    setEditingRecord(record)
    setViewMode('form')
  }

  // 4. 返回列表
  const handleCancelForm = () => {
    setViewMode('list')
  }

  // 5. 儲存資料
  const handleSaveData = (values: GroupDataType) => {
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
      message.success(`更新成功：${values.groupName}`)
    } else {
      // 新增
      const newRecord: GroupListType = {
        ...values,
        key: Date.now().toString(),
        memberCount: 0,
      }
      setDataSource((prev) => [newRecord, ...prev])
      message.success(`新增成功：${values.groupName}`)
    }
    setViewMode('list')
  }

  // 6. 刪除資料
  const handleDelete = (key: string) => {
    Modal.confirm({
      title: '確定刪除此群組?',
      content: '刪除後該部門成員可能需要重新分配。',
      okText: '確認刪除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        setDataSource((prev) => prev.filter((item) => item.key !== key))
        message.success('已刪除群組')
      },
    })
  }

  // 7. 經手人日誌
  const fetchLogs = (record: GroupListType) => {
    const mockLogs: HandlerLogData[] = [
      {
        key: 'log-1',
        time: '2026-01-30 15:00:00',
        handler: 'admin',
        status: '修改',
        details: `調整 [${record.groupName}] 權限設定`,
      },
    ]
    setCurrentLogs(mockLogs)
    setIsHandlerModalOpen(true)
  }

  return {
    viewMode,
    dataSource,
    editingRecord,
    isHandlerModalOpen,
    currentLogs,
    setIsHandlerModalOpen, // 用於關閉 Modal
    handleSearch,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSaveData,
    handleCancelForm,
    fetchLogs,
  }
}
