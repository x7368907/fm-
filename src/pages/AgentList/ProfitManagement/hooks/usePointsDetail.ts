import { useState } from 'react'
import type { DataType } from '../types'
import { initialData } from '../mock'

export function usePointsDetail() {
  const [dataSource, setDataSource] = useState<DataType[]>(initialData)
  const [activeTab, setActiveTab] = useState('pending')

  // 彈窗狀態
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [detailModalType, setDetailModalType] = useState<'bet' | 'loss'>('bet')

  const [isProfitModalOpen, setIsProfitModalOpen] = useState(false)
  const [currentProfitMode, setCurrentProfitMode] = useState('')

  // --- Handlers ---
  const handleUpdateNote = (key: string, newNote: string) => {
    const newData = dataSource.map((item) => {
      if (item.key === key) return { ...item, note: newNote }
      return item
    })
    setDataSource(newData)
  }

  const handleOpenDetail = (_record: DataType, type: 'bet' | 'loss') => {
    setDetailModalType(type)
    setIsDetailModalOpen(true)
  }

  const handleOpenProfit = (record: DataType) => {
    setCurrentProfitMode(record.profitMode)
    setIsProfitModalOpen(true)
  }

  return {
    dataSource,
    activeTab,
    setActiveTab,
    // 狀態
    isDetailModalOpen,
    setIsDetailModalOpen,
    detailModalType,
    isProfitModalOpen,
    setIsProfitModalOpen,
    currentProfitMode,
    // 功能
    handleUpdateNote,
    handleOpenDetail,
    handleOpenProfit,
  }
}
