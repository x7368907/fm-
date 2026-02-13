import { useState } from 'react'
import type { ViewMode, MessagingRow } from '../types'

export const useMessagingManagement = () => {
  const [activeTab, setActiveTab] = useState<string>('') // 初始為總覽
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [editingRecord, setEditingRecord] = useState<any>(null)
  const [isMsgModalOpen, setIsMsgModalOpen] = useState(false)

  const handleAction = (tab: string, record?: MessagingRow) => {
    if (tab === '3') {
      setViewMode('topup')
    } else if (tab === '2') {
      setEditingRecord(record || null)
      setIsMsgModalOpen(true)
    } else {
      setEditingRecord(
        record
          ? { ...record, isEnabled: record.status ? '啟用' : '停用' }
          : null
      )
      setViewMode('form')
    }
  }

  const handleTabChange = (id: string) => {
    setActiveTab(id)
    setViewMode('list')
  }

  return {
    activeTab,
    setActiveTab,
    handleTabChange,
    viewMode,
    setViewMode,
    editingRecord,
    isMsgModalOpen,
    setIsMsgModalOpen,
    handleAction,
  }
}
