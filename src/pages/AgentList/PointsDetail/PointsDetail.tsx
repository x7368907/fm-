import { useState } from 'react'
import { ConfigProvider, Breadcrumb, Input, Select } from 'antd'

// 1. 引入共用元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'

import PointsCreate from './form/PointCreat'
import HandlerModal from '../components/HandlerModal'
import PointsTable from './components/PointsTable'

import { MOCK_DATA } from './mock'
import { useHandlerLogs } from './hooks/useHandlerLogs'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function PointsDetail() {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list')

  // 使用 Hook 處理 Modal 與 Log 邏輯
  const { logs, open, setOpen, fetchLogs } = useHandlerLogs()

  // 模擬資料更新 (依需求保留)
  const [, setDataSource] = useState(MOCK_DATA)
  const updateNote = (key: string, val: string) => {
    setDataSource((prev) =>
      prev.map((i) => (i.key === key ? { ...i, remarks: val } : i))
    )
  }

  // 2. 定義搜尋欄位 (全部依序排列，不強制換行)
  const searchFields: SearchField[] = [
    {
      label: '獎勵類型',
      name: 'rewardType',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => (
        <Select placeholder="請選擇" allowClear>
          <Select.Option value="reward_add">獎勵點數發放</Select.Option>
          <Select.Option value="credit_add">信用點數上分</Select.Option>
          <Select.Option value="reward_deduct">獎勵點數收回</Select.Option>
          <Select.Option value="credit_deduct">信用點數收回</Select.Option>
        </Select>
      ),
    },
    {
      label: '發放代理級別',
      name: 'agentLevel',
      colProps: { xs: 24, sm: 12, md: 4 },
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
      label: '發放代理名稱',
      name: 'agentName',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '發放代理',
      name: 'agentAccount',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '發放時間',
      name: 'dateRange',
      colProps: { xs: 24, sm: 24, md: 8 },
      render: () => <QuickRangePicker />,
    },
  ]

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>營運商管理</Breadcrumb.Item>
          <Breadcrumb.Item>點數加扣點紀錄</Breadcrumb.Item>
        </Breadcrumb>

        {view !== 'list' ? (
          <PointsCreate
            onCancel={() => setView('list')}
            onSave={() => setView('list')}
          />
        ) : (
          <>
            {/* 3. 使用共用 SearchPanel */}
            <SearchPanel
              fields={searchFields}
              onCreate={() => setView('create')}
              onSearch={fetchLogs}
            />

            <PointsTable onUpdateNote={updateNote} onLogs={fetchLogs} />

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
