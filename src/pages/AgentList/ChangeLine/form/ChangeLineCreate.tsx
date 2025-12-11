import React from 'react'
import { Breadcrumb, Button, Input, Select, Table } from 'antd'
import {
  CloseOutlined,
  SaveOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

const { Option } = Select

// ==========================================
// 模擬資料 (僅此頁面使用)
// ==========================================
const CREATE_MOCK_DATA = Array.from({ length: 6 }).map((_, i) => ({
  key: i,
  name: `代理名稱範例-${i}`,
  realName: `金池/成數代理-範例-${i}`,
  profitSystem: i % 2 === 0 ? '反水制\n(總投注額回饋)' : '佔成制',
  profitName:
    i % 2 === 0 ? '抽水代理(無下退水) 返水:0.7 其他:0.5' : '通用代理90%',
  cycle: '月結\n(每月最後天-23:59:59)',
  memberCount: Math.floor(Math.random() * 100),
}))

// ==========================================
// 元件定義
// ==========================================

interface ChangeLineCreateProps {
  onCancel: () => void
  onSave: () => void
}

const ChangeLineCreate: React.FC<ChangeLineCreateProps> = ({
  onCancel,
  onSave,
}) => {
  // 左側級別選單模擬
  const levels = [
    { label: '1級總代理', count: 23 },
    { label: '2級代理', count: 56 },
    { label: '3級代理', count: 97 },
    { label: '4級代理', count: 104, active: true }, // 預設選中範例
    { label: '5級代理', count: 2536 },
    { label: '6級代理', count: 3256 },
    { label: '7級代理', count: 1556 },
    { label: '8級代理', count: 2236 },
  ]

  // 表格欄位定義
  const columns: ColumnsType<any> = [
    {
      title: '名稱',
      dataIndex: 'name',
      width: 250,
      render: (text, record) => (
        <div>
          {/* 用 flex 模仿截圖中 (2/97) 的顯示方式 */}
          <div className="font-bold">
            {text}{' '}
            <span className="font-normal text-gray-400">
              ({record.memberCount})
            </span>
          </div>
          <div className="text-xs text-gray-400">{record.realName}</div>
        </div>
      ),
    },
    {
      title: '代理分潤制度',
      dataIndex: 'profitSystem',
      render: (text) => (
        <div className="whitespace-pre-wrap text-center text-xs">{text}</div>
      ),
    },
    {
      title: '分潤名稱',
      dataIndex: 'profitName',
      render: (text) => <div className="text-xs">{text}</div>,
    },
    {
      title: '代理分潤結算',
      dataIndex: 'cycle',
      align: 'center',
      render: (text) => (
        <div className="whitespace-pre-wrap text-xs">{text}</div>
      ),
    },
  ]

  // 渲染包含左側選單與右側表格的區塊 helper
  const renderSection = (
    title: string,
    selectionType: 'checkbox' | 'radio'
  ) => (
    <div className="mb-4 overflow-hidden rounded-md border border-gray-300 bg-white">
      {/* 區塊標題列 - 修改這裡 */}
      <div className="flex border-b border-gray-300 bg-gray-200 font-bold text-gray-700">
        {/* 左側標題：鎖定寬度 w-40，並加上右邊框，跟下方的選單區塊對齊 */}
        <div className="w-40 flex-shrink-0 border-r border-gray-300 px-4 py-2">
          來源代理級別
        </div>
        {/* 右側標題：佔據剩餘空間，文字自然會靠左顯示 */}
        <div className="flex-1 px-4 py-2">{title}</div>
      </div>

      <div className="flex">
        {/* 左側級別選單 */}
        <div className="w-40 flex-shrink-0 border-r border-gray-300 bg-gray-50">
          {levels.map((lvl, idx) => (
            <div
              key={idx}
              className={`flex cursor-pointer items-center justify-between border-b border-gray-200 px-3 py-3 text-sm hover:bg-gray-100 ${lvl.active ? 'border-l-4 border-l-teal-600 bg-white font-bold text-teal-600' : 'text-gray-600'} `}
            >
              <span>{lvl.label.split(' ')[0]}</span>
              <span className="rounded-full bg-gray-200 px-1.5 text-xs text-gray-500">
                {lvl.count}
              </span>
            </div>
          ))}
        </div>

        {/* 右側內容區 */}
        <div className="flex-1 p-4">
          {/* 搜尋列 */}
          <div className="mb-3 flex gap-2">
            <Input placeholder="請輸入代理名稱" className="max-w-xs" />
            <Button>清空</Button>
          </div>

          {/* 表格 */}
          <Table
            rowSelection={{
              type: selectionType,
            }}
            columns={columns}
            dataSource={CREATE_MOCK_DATA}
            pagination={false}
            size="small"
            scroll={{ y: 240 }}
            bordered
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className="pb-16">
      {' '}
      {/* 預留底部按鈕空間 */}
      <Breadcrumb separator=">" className="mb-4">
        <Breadcrumb.Item>營運商管理</Breadcrumb.Item>
        <Breadcrumb.Item>營運商換線紀錄</Breadcrumb.Item>
        <Breadcrumb.Item>新增換線</Breadcrumb.Item>
      </Breadcrumb>
      <div className="rounded-md border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="m-0 text-lg font-bold text-gray-800">新增換線</h2>
        </div>

        <div className="p-6">
          <div className="mb-4 font-bold text-gray-700">換線操作</div>

          {/* 1. 來源代理區塊 (Checkbox) */}
          {renderSection('來源代理名稱', 'checkbox')}

          {/* 2. 中間轉換區塊 */}
          <div className="flex flex-col items-center justify-center gap-2 py-6">
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-700">轉線類型</span>
              <Select defaultValue="all" className="w-64">
                <Option value="all">資料全部移轉至新代理</Option>
              </Select>
            </div>
            <ArrowDownOutlined className="mt-2 text-3xl font-bold text-black" />
          </div>

          {/* 3. 上級代理區塊 (Radio) */}
          {renderSection('上級代理名稱', 'radio')}
        </div>
      </div>
      {/* 底部固定按鈕 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center gap-4 border-t border-gray-200 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <Button
          size="large"
          danger
          className="flex w-32 items-center justify-center gap-1"
          onClick={onCancel}
        >
          <CloseOutlined /> 取消
        </Button>
        <Button
          type="primary"
          size="large"
          className="flex w-32 items-center justify-center gap-1 border-green-500 bg-green-500 hover:bg-green-400"
          onClick={onSave}
        >
          <SaveOutlined /> 儲存
        </Button>
      </div>
    </div>
  )
}

export default ChangeLineCreate
