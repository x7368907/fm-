import React, { useMemo } from 'react'
import { Breadcrumb, ConfigProvider, Input, Select } from 'antd'

// 引入 Hook
import { usePeopleManagement } from './hook/usePeopleManagement'
// 引入 Components
import PeopleCreate from './form/PeopleCreate'
import PeopleTable from './components/PeopleTable'
// 引入 Constants
import { DEPARTMENT_OPTIONS } from './utils/fakeData'

// 外部共用元件 (假設路徑正確)
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import HandlerModal from '../../AgentList/components/HandlerModal'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function PeopleManagement() {
  const {
    viewMode,
    editingRecord,
    dataSource,
    isHandlerModalOpen,
    currentLogs,
    handleSearch,
    handleCreate,
    handleEdit,
    handleBack,
    handleSaveData,
    handleDelete,
    handleFetchLogs,
    closeHandlerModal,
  } = usePeopleManagement()

  // 搜尋欄位配置
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
        <PeopleCreate
          initialValues={editingRecord}
          onCancel={handleBack}
          onSave={handleSaveData}
        />
      ) : (
        <div className="min-h-screen bg-gray-50 p-4">
          <Breadcrumb separator=">" className="mb-4">
            <Breadcrumb.Item>後台管理</Breadcrumb.Item>
            <Breadcrumb.Item className="font-bold text-gray-800">
              人員管理
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

          <PeopleTable
            dataSource={dataSource}
            onEdit={handleEdit}
            onLogs={handleFetchLogs}
            onDelete={handleDelete}
          />
        </div>
      )}

      <HandlerModal
        open={isHandlerModalOpen}
        onCancel={closeHandlerModal}
        logs={currentLogs}
      />
    </ConfigProvider>
  )
}
