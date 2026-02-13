// src/pages/GroupManagement/GroupManagement.tsx
import { useMemo } from 'react'
import { Breadcrumb, ConfigProvider, Select, Input } from 'antd'

// --- Hooks & Utils ---
import useGroupManagement from './hook/useGroupManagement'
import { DEPARTMENT_OPTIONS } from './utils/fakeData'

// --- Components ---
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import HandlerModal from '../../AgentList/components/HandlerModal'
import GroupTable from './components/GroupTable'
import GroupCreate from './form/GroupCreate' // 假設你的 GroupCreate 放在 form 資料夾下

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function GroupManagement() {
  // 1. 使用 Hook 取得所有狀態與邏輯
  const {
    viewMode,
    dataSource,
    editingRecord,
    isHandlerModalOpen,
    currentLogs,
    setIsHandlerModalOpen,
    handleSearch,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSaveData,
    handleCancelForm,
    fetchLogs,
  } = useGroupManagement()

  // 2. 定義搜尋欄位 (純 UI 設定)
  const searchFields: SearchField[] = useMemo(
    () => [
      {
        label: '員工編號',
        name: 'employeeId',
        render: () => <Input placeholder="請輸入" allowClear />,
      },
      {
        label: '姓名',
        name: 'name',
        render: () => <Input placeholder="請輸入" allowClear />,
      },
      {
        label: '部門',
        name: 'department',
        render: () => (
          <Select
            placeholder="請選擇"
            options={DEPARTMENT_OPTIONS}
            allowClear
          />
        ),
      },
    ],
    []
  )

  return (
    <ConfigProvider theme={theme}>
      {viewMode === 'form' ? (
        // === Form Mode ===
        <GroupCreate
          initialValues={editingRecord}
          onCancel={handleCancelForm}
          onSave={handleSaveData}
        />
      ) : (
        // === List Mode ===
        <div className="min-h-screen bg-gray-50 p-4">
          <Breadcrumb separator=">" className="mb-4">
            <Breadcrumb.Item>後台管理</Breadcrumb.Item>
            <Breadcrumb.Item className="font-bold text-gray-800">
              群組管理
            </Breadcrumb.Item>
          </Breadcrumb>

          <SearchPanel
            title="條件搜尋"
            fields={searchFields}
            initialValues={{
              employeeId: '',
              name: '',
              department: 'all',
              pageSize: 20,
            }}
            onSearch={handleSearch}
            onCreate={handleCreate}
          />

          <GroupTable
            dataSource={dataSource}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onShowLogs={fetchLogs}
          />
        </div>
      )}

      {/* Shared Modal */}
      <HandlerModal
        open={isHandlerModalOpen}
        onCancel={() => setIsHandlerModalOpen(false)}
        logs={currentLogs}
      />
    </ConfigProvider>
  )
}
