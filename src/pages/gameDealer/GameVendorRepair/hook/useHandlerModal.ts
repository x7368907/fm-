// src/pages/GameVendorRepair/hook/useHandlerModal.ts
import { useState } from 'react'
// 假設這是全域共用的型別
import { type HandlerLogData } from '../../../AgentList/components/HandlerModal'

export const useHandlerModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [logs, setLogs] = useState<HandlerLogData[]>([])

  const openModal = (recordKey: string) => {
    // 這裡模擬打 API 取得日誌
    console.log(`Fetching logs for ${recordKey}`)
    const mockLogs: HandlerLogData[] = [
      {
        key: '1',
        time: '2026-01-13 10:00:00',
        handler: 'admin',
        status: '修改',
        details: '修改維修時間 09:00 -> 10:00',
      },
    ]
    setLogs(mockLogs)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setLogs([])
  }

  return {
    isOpen,
    logs,
    openModal,
    closeModal,
  }
}
