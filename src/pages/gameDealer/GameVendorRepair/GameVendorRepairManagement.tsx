// src/pages/GameVendorRepair/index.tsx
import { useState, useMemo } from 'react'
import { Breadcrumb, ConfigProvider, Select, message } from 'antd'

// 1. 引入共用元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import HandlerModal from '../../AgentList/components/HandlerModal'

// 2. 引入內部模組 (Components & Forms)
import GameVendorTable from './components/GameVendorTable'
import GameVendorCreate from './form/GameVendorCreate'

// 3. 引入邏輯 Hook 與 資料
import { useHandlerModal } from './hook/useHandlerModal'
import { MOCK_DATA } from './utils/fakeData'
import type { RepairDataType } from './types'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function GameVendorRepairManagement() {
  // --- State ---
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list')
  const [editingRecord, setEditingRecord] = useState<RepairDataType | null>(
    null
  )
  const [dataSource, setDataSource] = useState<RepairDataType[]>(MOCK_DATA)

  // --- Logic Hooks ---
  const handlerModal = useHandlerModal() // 使用自定義 Hook

  // --- Actions ---
  const handleSearch = (values: any) => {
    console.log('Search:', values)
    message.success('執行搜尋更新列表')
  }

  const handleCreate = () => {
    setEditingRecord(null)
    setViewMode('form')
  }

  const handleEdit = (record: RepairDataType) => {
    // 簡單資料轉換
    const formValues = {
      ...record,
      gameType: 'live',
      logoOpen: '',
      logoMaintain: '',
      isStartUnfixed: false,
      isEndUnfixed: false,
    }
    setEditingRecord(formValues as any)
    setViewMode('form')
  }

  const handleDelete = (record: RepairDataType) => {
    message.warning(`模擬刪除: ${record.vendorCode}`)
    // 這裡呼叫 setDataSource 更新畫面
  }

  const handleStatusChange = (checked: boolean, key: string) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, status: checked } : item
      )
    )
    message.success(`狀態已${checked ? '開啟' : '關閉'}`)
  }

  const handleSaveForm = (values: any) => {
    console.log(editingRecord ? 'Update' : 'Create', values)
    message.success(editingRecord ? '更新成功' : '新增成功')
    setViewMode('list')
    setEditingRecord(null)
  }

  // --- Search Config ---
  const searchFields: SearchField[] = useMemo(
    () => [
      {
        label: '遊戲類型',
        name: 'gameType',
        render: () => (
          <Select
            style={{ width: 200 }}
            placeholder="請選擇"
            defaultValue="live"
            options={[{ label: '真人', value: 'live' }]}
          />
        ),
      },
    ],
    []
  )

  // --- Render ---

  // 1. 表單模式
  if (viewMode === 'form') {
    return (
      <ConfigProvider theme={theme}>
        <GameVendorCreate
          initialValues={editingRecord}
          onCancel={() => setViewMode('list')}
          onSave={handleSaveForm}
        />
      </ConfigProvider>
    )
  }

  // 2. 列表模式
  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>遊戲商管理</Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold text-gray-800">
            遊戲商維修管理
          </Breadcrumb.Item>
        </Breadcrumb>

        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ gameType: 'live', pageSize: 20 }}
          onSearch={handleSearch}
          onCreate={handleCreate}
        />

        {/* 這裡只負責傳遞資料與事件，不處理 UI 細節 */}
        <GameVendorTable
          dataSource={dataSource}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewLog={(record) => handlerModal.openModal(record.key)}
        />

        {/* 彈窗邏輯被封裝在 Hook 中，這裡只需傳入狀態 */}
        <HandlerModal
          open={handlerModal.isOpen}
          onCancel={handlerModal.closeModal}
          logs={handlerModal.logs}
        />
      </div>
    </ConfigProvider>
  )
}
