import { useState } from 'react'
import {
  Breadcrumb,
  ConfigProvider,
  Card,
  Input,
  Select,
  Button,
  message,
} from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
// 1. 引入共用元件 (請確認路徑)
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
// 引入你原本使用的日期選擇器
import QuickRangePicker from '../../../components/QuickRangePicker'

import AgentCreate from './form/AgentCreate'
import HandlerModal from '../components/HandlerModal'
import AgentTable from './components/AgentTable'

import { useHandlerLogs } from './hooks/useHandlerLogs'
import type { DataType } from './types'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function AgentList() {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list')
  const [editing, setEditing] = useState<DataType | null>(null)

  const { logs, open, setOpen, fetchLogs } = useHandlerLogs()

  // 2. 定義搜尋欄位
  const searchFields: SearchField[] = [
    // --- 第一列 (共6個，設為 lg:4 剛好佔滿一行 24 格) ---
    {
      label: '代理級別',
      name: 'level',
      colProps: { xs: 24, sm: 12, md: 8, lg: 4 },
      render: () => (
        <Select placeholder="請選擇代理級別" allowClear>
          <Select.Option value="lvl1">1級總代理</Select.Option>
          <Select.Option value="lvl2">2級代理</Select.Option>
          <Select.Option value="lvl3">3級代理</Select.Option>
          <Select.Option value="lvl4">4級代理</Select.Option>
          <Select.Option value="lvl5">5級代理</Select.Option>
          <Select.Option value="lvl6">6級代理</Select.Option>
          <Select.Option value="lvl7">7級代理</Select.Option>
        </Select>
      ),
    },
    {
      label: '代理名稱',
      name: 'agentName',
      colProps: { xs: 24, sm: 12, md: 8, lg: 4 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '代理帳號',
      name: 'agentAccount',
      colProps: { xs: 24, sm: 12, md: 8, lg: 4 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '代理姓名',
      name: 'realName',
      colProps: { xs: 24, sm: 12, md: 8, lg: 4 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '帳號狀態',
      name: 'status',
      colProps: { xs: 24, sm: 12, md: 8, lg: 4 },
      render: () => (
        <Select placeholder="請選擇" allowClear>
          <Select.Option value={1}>啟用</Select.Option>
          <Select.Option value={0}>停用</Select.Option>
          <Select.Option value={2}>啟用(凍結錢包)</Select.Option>
          <Select.Option value={3}>啟用(停用儲值)</Select.Option>
          <Select.Option value={4}>啟用(停用託售)</Select.Option>
          <Select.Option value={5}>終身停權</Select.Option>
        </Select>
      ),
    },
    {
      label: '金流群組',
      name: 'cashGroup',
      colProps: { xs: 24, sm: 12, md: 8, lg: 4 }, // 這是第一列最後一個
      render: () => (
        <Select placeholder="請選擇" allowClear>
          <Select.Option value={1}>常規會員</Select.Option>
          <Select.Option value={2}>老會員</Select.Option>
          <Select.Option value={3}>信用代理</Select.Option>
          <Select.Option value={4}>USDT通道</Select.Option>
        </Select>
      ),
    },

    // --- 第二列 (自動換行) ---
    {
      label: '註冊時間', // 你的需求：往下移，放在第一個
      name: 'regDate',
      colProps: { xs: 24, sm: 24, md: 12, lg: 6 }, // 日期欄位寬一點
      render: () => <QuickRangePicker />,
    },
    {
      label: '最後登入時間', // 你的需求：放在註冊時間旁邊
      name: 'loginDate',
      colProps: { xs: 24, sm: 24, md: 12, lg: 6 },
      render: () => <QuickRangePicker />,
    },
    {
      label: '分潤制度',
      name: 'system',
      colProps: { xs: 24, sm: 12, md: 8, lg: 3 }, // 剩下空間分配
      render: () => (
        <Select placeholder="全部" allowClear>
          <Select.Option value="all">全部</Select.Option>
        </Select>
      ),
    },
    {
      label: '每頁筆數',
      name: 'pageSize',
      colProps: { xs: 24, sm: 12, md: 8, lg: 3 },
      render: () => (
        <Select>
          <Select.Option value="20">20</Select.Option>
          <Select.Option value="50">50</Select.Option>
        </Select>
      ),
    },
  ]

  // 設定初始值
  const initialValues = {
    system: 'all',
    pageSize: '20',
  }

  const handleCreate = () => {
    setEditing(null)
    setView('create')
  }

  const handleEdit = (record: DataType) => {
    setEditing(record)
    setView('edit')
  }

  const handleDownload = () => {
    message.success('下載 Excel 報表中...')
  }
  // 1. 先定義好對應的處理函式 (放在 Component 內)
  const handleViewFrontend = (record: DataType) => {
    console.log('點擊瀏覽前台:', record.name)
    // 未來這裡可以寫: window.open(...) 或 setFrontendModalOpen(true)
  }

  const handlePoints = (record: DataType) => {
    console.log('點擊點數加扣點:', record.name)
    // 未來這裡可以寫: setPointModalOpen(true)
  }
  // ★ 直接在 Feature 層定義下載按鈕 (樣式寫在這裡)
  const downloadBtn = (
    <Button
      icon={<DownloadOutlined />}
      onClick={handleDownload}
      className="border-green-500 bg-white text-green-500 hover:!border-green-400 hover:!text-green-400"
    >
      下載
    </Button>
  )

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>代理管理</Breadcrumb.Item>
          <Breadcrumb.Item>代理資料</Breadcrumb.Item>
        </Breadcrumb>

        {view !== 'list' ? (
          <AgentCreate
            initialValues={view === 'edit' ? editing : null}
            onCancel={() => setView('list')}
          />
        ) : (
          <>
            {/* 3. 使用共用元件 */}
            <SearchPanel
              fields={searchFields}
              initialValues={initialValues}
              onCreate={handleCreate} // 顯示紫色新增按鈕 (Header左側)
              onSearch={fetchLogs} // 顯示Teal搜尋按鈕 (Header右側)
              extra={downloadBtn} // ★ 將下載按鈕以 props 傳入
            />

            <Card title="1級總代理" className="shadow-sm">
              <AgentTable
                onEdit={handleEdit}
                onLogs={fetchLogs}
                onViewFrontend={handleViewFrontend}
                onPoints={handlePoints}
              />
            </Card>

            <HandlerModal
              open={open}
              onCancel={() => setOpen(false)}
              logs={logs}
            />
          </>
        )}
      </div>
    </ConfigProvider>
  )
}
