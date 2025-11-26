import React, { useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import type { MenuProps } from 'antd'

import {
  Table,
  Button,
  Select,
  Breadcrumb,
  Dropdown,
  Tag,
  Collapse,
  Form,
  Row,
  Col,
  ConfigProvider,
} from 'antd'

import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
  UserOutlined,
} from '@ant-design/icons'

import CreateCommission from '../AgentList/components/CreateCommission'
import HandlerModal, {
  type HandlerLogData,
} from '../AgentList/components/HandlerModal'

const { Panel } = Collapse
const { Option } = Select

const themeConfig = {
  token: { colorPrimary: '#14b8a6' },
}

// --- 資料型別 ---
interface CommissionData {
  key: string
  system: string
  name: string
  agentLevel: string
  agentName: string
  shareRatio: number
  rebateLive: number
  rebateElec: number
  rebateSport: number
  rebateLottery: number
  rebateChess: number
  rebateFish: number
  settlement: string
}

// --- 模擬資料 ---
const mockData: CommissionData[] = Array.from({ length: 50 }).map((_, i) => ({
  key: `${i + 1}`,
  system: i % 2 === 0 ? '佔成制' : '反水制',
  name: i % 2 === 0 ? `合營計畫 ${i + 1}` : `退水方案 ${i + 1}`,
  agentLevel: '任一層級',
  agentName: '任一代理',
  shareRatio: i % 2 === 0 ? 90 : 0,
  rebateLive: 0.4,
  rebateElec: 0.4,
  rebateSport: 0.3,
  rebateLottery: 0,
  rebateChess: 0.4,
  rebateFish: 0.4,
  settlement: i % 3 === 0 ? '月結' : '週結',
}))

export default function AgentCommission() {
  const [form] = Form.useForm()
  const [page, setPage] = useState<'list' | 'form'>('list')

  // Collapse 狀態
  const [activeKey, setActiveKey] = useState<string | string[]>(['1'])
  const isActive = Array.isArray(activeKey) && activeKey.includes('1')

  const [editingRecord, setEditingRecord] = useState<CommissionData | null>(
    null
  )

  // 經手人彈窗 state
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  const handleCreateClick = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setEditingRecord(null)
    setPage('form')
  }

  const handleEditClick = (record: CommissionData) => {
    setEditingRecord(record)
    setPage('form')
  }

  const handleFormClose = () => {
    setEditingRecord(null)
    setPage('list')
  }

  const fetchLogs = (record: CommissionData) => {
    console.log('Fetching logs for:', record.name)
    const randomCount = Math.floor(Math.random() * 5) + 1
    const newLogs: HandlerLogData[] = Array.from({ length: randomCount }).map(
      (_, i) => ({
        key: `${record.key}-${i}`,
        time: '2025-11-26 10:00:00',
        handler: i % 2 === 0 ? 'admin' : 'system',
        status: i === 0 ? '新增' : '修改',
        details: `針對 [${record.name}] 進行了 ${i === 0 ? '建立' : '修改'} 操作 - 紀錄 ${i + 1}`,
      })
    )
    setCurrentLogs(newLogs)
    setIsHandlerModalOpen(true)
  }

  const getActionItems = (record: CommissionData): MenuProps['items'] => [
    {
      key: 'edit',
      label: '編輯',
      icon: <EditOutlined />,
      onClick: () => handleEditClick(record),
    },
    {
      key: 'handler',
      label: '經手人',
      icon: <UserOutlined />,
      onClick: () => fetchLogs(record),
    },
    {
      key: 'delete',
      label: '刪除',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => console.log('Delete', record.key),
    },
  ]

  const columns: ColumnsType<CommissionData> = [
    {
      title: '分潤制度',
      dataIndex: 'system',
      key: 'system',
      width: 100,
      render: (text) => (
        <Tag color={text === '佔成制' ? 'blue' : 'cyan'}>{text}</Tag>
      ),
    },
    {
      title: '分潤名稱',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      ellipsis: true,
    },
    {
      title: '代理層級',
      dataIndex: 'agentLevel',
      key: 'agentLevel',
      width: 100,
    },
    { title: '代理名稱', dataIndex: 'agentName', key: 'agentName', width: 100 },
    {
      title: '代理佔成比例(%)',
      dataIndex: 'shareRatio',
      key: 'shareRatio',
      align: 'center',
      width: 140,
    },
    {
      title: '代理反水比例 (%)',
      children: [
        {
          title: '真人',
          dataIndex: 'rebateLive',
          key: 'rebateLive',
          align: 'center',
          width: 80,
        },
        {
          title: '電子',
          dataIndex: 'rebateElec',
          key: 'rebateElec',
          align: 'center',
          width: 80,
        },
        {
          title: '體育',
          dataIndex: 'rebateSport',
          key: 'rebateSport',
          align: 'center',
          width: 80,
        },
        {
          title: '彩票',
          dataIndex: 'rebateLottery',
          key: 'rebateLottery',
          align: 'center',
          width: 80,
        },
        {
          title: '棋牌',
          dataIndex: 'rebateChess',
          key: 'rebateChess',
          align: 'center',
          width: 80,
        },
        {
          title: '捕魚',
          dataIndex: 'rebateFish',
          key: 'rebateFish',
          align: 'center',
          width: 80,
        },
      ],
    },
    {
      title: '代理分潤結算',
      dataIndex: 'settlement',
      key: 'settlement',
      width: 150,
      render: (text) => (
        <div className="flex flex-col items-center">
          <span className="font-medium">{text}</span>
          <span className="scale-90 text-xs text-gray-400">
            (每週日-23:59:59)
          </span>
        </div>
      ),
    },
    {
      title: '管理',
      key: 'action',
      fixed: 'right',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Dropdown menu={{ items: getActionItems(record) }} trigger={['click']}>
          {/* 修改這裡：將原本的 <a> 改為 <Button> */}
          <Button size="small">
            管理 <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ]

  // Header 樣式
  const customHeader = (
    <div className="flex cursor-pointer select-none items-center gap-2">
      <span className="text-base font-bold">條件搜尋</span>
      <DownOutlined
        className={`text-xs text-gray-500 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
      />
    </div>
  )

  // 右側按鈕樣式
  const panelExtra = (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      className="border-purple-200 bg-purple-100 text-purple-600 shadow-none hover:border-purple-300 hover:bg-purple-200"
      onClick={handleCreateClick}
    >
      新增
    </Button>
  )

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mb-4">
          <Breadcrumb separator=">">
            <Breadcrumb.Item>代理管理</Breadcrumb.Item>
            <Breadcrumb.Item>分潤管理</Breadcrumb.Item>
            {page === 'form' && (
              <Breadcrumb.Item className="font-bold text-black">
                {editingRecord ? '編輯分潤' : '新增分潤'}
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
        </div>

        {page === 'list' ? (
          <>
            <Collapse
              activeKey={activeKey}
              onChange={setActiveKey}
              className="mb-4 rounded-md border-2 bg-white shadow-sm"
            >
              <Panel
                header={customHeader}
                key="1"
                showArrow={false}
                extra={panelExtra}
              >
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={{
                    profitRate: 'all',
                    settlement: 'all',
                    pageSize: '20',
                  }}
                >
                  <Row gutter={16} align="bottom">
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item label="分潤比例(%)" name="profitRate">
                        <Select>
                          <Option value="all">全部</Option>
                          <Option value="10">10%</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item label="代理分潤結算" name="settlement">
                        <Select>
                          <Option value="all">全部</Option>
                          <Option value="week">週結</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item label="每頁顯示筆數" name="pageSize">
                        <Select>
                          <Option value="20">20</Option>
                          <Option value="50">50</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={6} className="pb-6 text-right">
                      <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        className="px-8 font-bold"
                        onClick={() =>
                          console.log('搜尋:', form.getFieldsValue())
                        }
                      >
                        搜尋
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Panel>
            </Collapse>

            <div className="rounded-lg bg-white shadow-sm">
              <div className="p-4">
                <Table
                  className="[&_.ant-table-pagination]:!justify-start"
                  columns={columns}
                  dataSource={mockData}
                  bordered
                  scroll={{ x: 1300 }}
                  pagination={{
                    position: ['bottomLeft'],
                    total: mockData.length,
                    showTotal: (total) => `總計 ${total} 筆資料`,
                    defaultPageSize: 20,
                    showSizeChanger: true,
                  }}
                />
              </div>
            </div>

            <HandlerModal
              open={isHandlerModalOpen}
              onCancel={() => setIsHandlerModalOpen(false)}
              logs={currentLogs}
            />
          </>
        ) : (
          <CreateCommission
            initialValues={editingRecord}
            onCancel={handleFormClose}
            onSuccess={handleFormClose}
          />
        )}
      </div>
    </ConfigProvider>
  )
}
