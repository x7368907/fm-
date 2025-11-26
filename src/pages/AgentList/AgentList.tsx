import React, { useState } from 'react'
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Collapse,
  Form,
  Input,
  Row,
  Select,
  Table,
  Space,
  ConfigProvider,
  Dropdown,
  Tag,
} from 'antd'
import type { MenuProps } from 'antd'
import {
  SearchOutlined,
  DownloadOutlined,
  PlusOutlined,
  DownOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

import QuickRangePicker from '../../components/QuickRangePicker'
import AgentCreate from '../AgentList/components/AgentCreate'
import HandlerModal, {
  type HandlerLogData,
} from '../AgentList/components/HandlerModal'

const { Panel } = Collapse
const { Option } = Select

// ==========================================
// 設定與模擬資料
// ==========================================

const themeConfig = {
  token: { colorPrimary: '#14b8a6' },
}

export interface DataType {
  key: React.Key
  level: string
  name: string
  memberCount: number
  account: string
  realName: string
  status: string
  group: string
  regTime: string
  loginTime: string
  system: string
  cycle: string
}

const MOCK_DATA: DataType[] = [
  {
    key: '1',
    level: '1/5(8)',
    name: 'FMCA (金流/成勤代理-主站)',
    memberCount: 56,
    account: '0976061431',
    realName: '王大星',
    status: '啟用',
    group: '常規會員',
    regTime: '2025/04/05 12:59:49',
    loginTime: '2025/05/20 13:48:39',
    system: '佔成制',
    cycle: '週結 (每週日-23:59:59)',
  },
  {
    key: '2',
    level: '1/6(3)',
    name: 'test123 (測試帳號)',
    memberCount: 9,
    account: 'test_acc',
    realName: '陳小明',
    status: '停用',
    group: '常規會員',
    regTime: '2025/04/06 10:00:00',
    loginTime: '2025/05/21 09:30:00',
    system: '反水制',
    cycle: '週結 (每週日-23:59:59)',
  },
]

// ==========================================
// 主頁面元件
// ==========================================

export default function AgentList() {
  const [form] = Form.useForm()

  // 頁面狀態: 'list' | 'create' | 'edit'
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list')
  // 編輯中的資料暫存
  const [editingData, setEditingData] = useState<DataType | null>(null)
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  // Collapse 收合狀態
  const [activeKey, setActiveKey] = useState<string | string[]>(['1'])
  const isActive = Array.isArray(activeKey) && activeKey.includes('1')
  // --- 新增：存放經手人資料的 state ---
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  // --- 新增：模擬 API 抓取經手人資料 ---
  const fetchLogs = (record: DataType) => {
    console.log('Fetching logs for:', record.name)

    // 這裡模擬從後端抓回來的資料
    // 為了讓你看起來不一樣，我們用隨機數產生不同筆數
    const randomCount = Math.floor(Math.random() * 5) + 1
    const newLogs: HandlerLogData[] = Array.from({ length: randomCount }).map(
      (_, i) => ({
        key: `${record.key}-${i}`,
        time: '2025-05-20 14:00:00', // 假時間
        handler: i % 2 === 0 ? 'admin' : 'system',
        status: i === 0 ? '新增' : '修改', // 第一筆是新增，後面是修改
        details: `針對代理 [${record.name}] 的欄位變更紀錄 - ${i + 1}`,
      })
    )

    setCurrentLogs(newLogs) // 1. 設定資料
    setIsHandlerModalOpen(true) // 2. 打開彈窗
  }
  // 切換回列表模式
  const handleBackToList = () => {
    setViewMode('list')
    setEditingData(null)
  }

  // 定義表格欄位 (包含操作按鈕邏輯)
  const columns: ColumnsType<DataType> = [
    {
      title: '代理級別',
      dataIndex: 'level',
      key: 'level',
      width: 100,
      fixed: 'left',
      render: (text) => (
        <span className="cursor-pointer text-blue-500">{text}</span>
      ),
    },
    {
      title: '代理名稱',
      dataIndex: 'name',
      key: 'name',
      width: 220,
      ellipsis: true,
    },
    {
      title: '會員數量',
      dataIndex: 'memberCount',
      key: 'memberCount',
      width: 90,
      align: 'center',
      render: (text) => (
        <span className="cursor-pointer text-blue-600 underline">{text}</span>
      ),
    },
    { title: '代理帳號', dataIndex: 'account', key: 'account', width: 120 },
    { title: '代理姓名', dataIndex: 'realName', key: 'realName', width: 90 },
    {
      title: '帳號狀態',
      dataIndex: 'status',
      key: 'status',
      width: 90,
      render: (text) => (
        <Tag color={text === '啟用' ? 'green' : 'red'}>{text}</Tag>
      ),
    },
    { title: '金流群組', dataIndex: 'group', key: 'group', width: 100 },
    {
      title: '註冊 / 登入時間',
      key: 'time',
      width: 180,
      render: (_, record) => (
        <div className="text-xs text-gray-500">
          <div>{record.regTime}</div>
          <div className="mt-1">{record.loginTime}</div>
        </div>
      ),
    },
    { title: '分潤制度', dataIndex: 'system', key: 'system', width: 90 },
    { title: '代理分潤結算', dataIndex: 'cycle', key: 'cycle', width: 180 },
    {
      title: '管理',
      key: 'action',
      fixed: 'right',
      width: 100,
      align: 'center',
      render: (_, record) => {
        const items: MenuProps['items'] = [
          {
            key: 'edit',
            label: '編輯',
            icon: <EditOutlined />,
            onClick: () => {
              setEditingData(record) // 1. 設定要編輯的資料
              setViewMode('edit') // 2. 切換到編輯模式
            },
          },
          {
            key: 'handler',
            label: '經手人',
            icon: <UserOutlined />,
            onClick: () => {
              fetchLogs(record)
            },
          },
          {
            key: 'delete',
            label: '刪除',
            icon: <DeleteOutlined />,
            danger: true,
            onClick: () => {
              console.log('執行刪除:', record.key)
            },
          },
        ]

        return (
          <Dropdown menu={{ items }} trigger={['click']}>
            <Button size="small">
              管理 <DownOutlined />
            </Button>
          </Dropdown>
        )
      },
    },
  ]

  // 1. 如果是新增或編輯模式，渲染 AgentCreate 元件
  if (viewMode === 'create' || viewMode === 'edit') {
    return (
      <ConfigProvider theme={themeConfig}>
        <AgentCreate
          onCancel={handleBackToList}
          initialValues={viewMode === 'edit' ? editingData : null}
        />
      </ConfigProvider>
    )
  }

  // 2. 否則渲染列表頁面
  const customHeader = (
    <div className="flex cursor-pointer select-none items-center gap-2">
      <span className="text-base font-bold">條件搜尋</span>
      <DownOutlined
        className={`text-xs text-gray-500 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
      />
    </div>
  )

  const panelExtra = (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      className="border-purple-200 bg-purple-100 text-purple-600 shadow-none hover:border-purple-300 hover:bg-purple-200"
      onClick={(e) => {
        e.stopPropagation()
        setEditingData(null)
        setViewMode('create')
      }}
    >
      新增
    </Button>
  )

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="mb-4">
          <Breadcrumb separator=">" className="mb-4">
            <Breadcrumb.Item>代理管理</Breadcrumb.Item>
            <Breadcrumb.Item>代理資料</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <Collapse
          activeKey={activeKey}
          onChange={setActiveKey}
          className="mb-4 rounded-md bg-white shadow-sm"
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
              initialValues={{ pageSize: '20' }}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12} md={3}>
                  <Form.Item label="代理級別" name="level">
                    <Select placeholder="1級總代理">
                      <Option value="lvl1">1級總代理</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Form.Item label="代理名稱" name="agentName">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Form.Item label="代理帳號" name="agentAccount">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Form.Item label="代理姓名" name="realName">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Form.Item label="帳號狀態" name="status">
                    <Select>
                      <Option value="all">全部</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Form.Item label="金流群組" name="cashGroup">
                    <Select>
                      <Option value="all">全部</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16} align="bottom">
                <Col xs={24} md={6}>
                  <Form.Item label="註冊時間" name="regDate">
                    {/* 使用引入的元件 */}
                    <QuickRangePicker />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item label="最後登入時間" name="loginDate">
                    {/* 使用引入的元件 */}
                    <QuickRangePicker />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Form.Item label="分潤制度" name="profitSystem">
                    <Select>
                      <Option value="all">全部</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Form.Item label="每頁顯示筆數" name="pageSize">
                    <Select>
                      <Option value="20">20</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={6} className="pb-7 text-right">
                  <Space size="middle">
                    <Button
                      icon={<DownloadOutlined />}
                      className="flex items-center border-green-500 bg-white text-green-500 hover:border-green-400 hover:text-green-400"
                    >
                      下載
                    </Button>
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      className="flex items-center px-6 font-bold"
                    >
                      搜尋
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Form>
          </Panel>
        </Collapse>

        <Card title="1級總代理" bordered={false} className="shadow-sm">
          <Table
            columns={columns}
            dataSource={MOCK_DATA}
            scroll={{ x: 1800 }}
            pagination={{
              position: ['bottomLeft'],
              total: 20,
              showTotal: (total) => `總計 ${total} 筆資料`,
              defaultPageSize: 20,
              showSizeChanger: true,
            }}
          />
        </Card>
        {/* 4. 在這裡放置 HandlerModal，受 state 控制 */}
        <HandlerModal
          open={isHandlerModalOpen}
          onCancel={() => setIsHandlerModalOpen(false)}
          logs={currentLogs} // --- 新增這行：傳遞資料 ---
        />
      </div>
    </ConfigProvider>
  )
}
