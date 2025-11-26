import React, { useState } from 'react'
import {
  Form,
  Input,
  Select,
  Button,
  Table,
  Collapse,
  ConfigProvider,
  Row,
  Col,
  Breadcrumb,
} from 'antd'
import {
  SearchOutlined,
  PlusOutlined,
  FileTextOutlined,
  DownOutlined,
} from '@ant-design/icons'

// ---------------------------------------------------------------------
// 引入外部元件
// 請確保這些路徑與你的專案結構相符
// ---------------------------------------------------------------------
import QuickRangePicker from '../../components/QuickRangePicker'
import HandlerModal, {
  type HandlerLogData,
} from '../AgentList/components/HandlerModal'
import PointsCreate, {
  type PointsFormData,
} from '../AgentList/components/PointCreat' // 上一步建立的新增/編輯元件

const { Panel } = Collapse
const { Option } = Select

// ==========================================
// 設定與模擬資料
// ==========================================

const themeConfig = {
  token: {
    colorPrimary: '#14b8a6', // Teal 色系
  },
}

// 模擬表格資料
const mockData = Array.from({ length: 6 }).map((_, i) => ({
  key: `${i}`, // 轉為字串，方便做為 ID
  type: i % 2 === 0 ? '獎勵點數發放' : '獎勵點數回收',
  issuingLevel: `1/${4 + i} (8)`,
  issuingAgentName: 'FMCA (金哥/成數代理-主站)',
  issuingAgent: '張大媽',
  issuingBalance: {
    change: i % 2 === 0 ? -2000 : 2000,
    before: '5,213,594',
    after: '5,211,594',
  },
  receivingLevel: `2/${4 + i} (3)`,
  receivingAgentName: 'FMCA2 (主站-股東)',
  receivingMember: '王大福',
  receivingBalance: {
    change: i % 2 === 0 ? 2000 : -2000,
    before: '99,999,999',
    after: '99,999,999',
  },
  turnoverMultiple: i % 2 === 0 ? 1 : 0,
  requiredTurnover: i % 2 === 0 ? 2000 : 0,
  remarks: i === 0 ? '手動補發獎勵測試備註' : '', // 第一筆給點內容
}))

export default function PointsDetail() {
  const [form] = Form.useForm()

  // -----------------------------------------------------
  // State 定義
  // -----------------------------------------------------

  // 頁面顯示模式：'list' (列表) | 'create' (新增) | 'edit' (編輯)
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list')

  // 暫存要編輯的資料 (傳給 PointsCreate 用)
  const [editingData, setEditingData] = useState<PointsFormData | null>(null)

  // Collapse 收合狀態
  const [activeKey, setActiveKey] = useState<string | string[]>(['1'])
  const isActive = Array.isArray(activeKey) && activeKey.includes('1')

  // 經手人彈窗狀態
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  // -----------------------------------------------------
  // 處理函式
  // -----------------------------------------------------

  // 切換回列表模式
  const handleBackToList = () => {
    setViewMode('list')
    setEditingData(null)
  }

  // 處理表單儲存 (從 PointsCreate 觸發)
  const handleSave = (values: any) => {
    console.log('表單已儲存，資料為:', values)
    // TODO: 這裡實作呼叫後端 API 的邏輯 (Create 或 Update)
    handleBackToList()
  }

  // 點擊「編輯」按鈕
  const handleEditClick = (record: any) => {
    // 將表格的 Row Data 轉換成 Form Data 格式
    const formData: PointsFormData = {
      id: record.key,
      type: record.type, // 這裡僅示範，實際欄位對應需視後端 API 而定
      rewardType: 'gift', // 假設預設值
      points: Math.abs(record.issuingBalance.change),
      turnoverMultiple: record.turnoverMultiple,
      requiredTurnover: record.requiredTurnover,
      remarks: record.remarks,

      // 模擬選擇器選中的狀態 (實際專案中，後端通常會回傳 ID)
      issuerId: 'A01',
      receiverIds: ['B01', 'B02'],
    }

    setEditingData(formData) // 設定編輯資料
    setViewMode('edit') // 切換視圖
  }

  // 模擬 API 抓取經手人資料
  const fetchLogs = (record: any) => {
    console.log('Fetching logs for:', record.key)
    const randomCount = Math.floor(Math.random() * 4) + 1
    const newLogs: HandlerLogData[] = Array.from({ length: randomCount }).map(
      (_, i) => ({
        key: `${record.key}-${i}`,
        time: '2025-05-20 14:00:00',
        handler: i % 2 === 0 ? 'admin' : 'system',
        status: i === 0 ? '新增' : '修改',
        details: `針對單號 [${record.key}] 的變更紀錄 - ${i + 1}`,
      })
    )
    setCurrentLogs(newLogs)
    setIsHandlerModalOpen(true)
  }

  // -----------------------------------------------------
  // Render: 1. 新增/編輯模式
  // -----------------------------------------------------
  if (viewMode === 'create' || viewMode === 'edit') {
    return (
      <ConfigProvider theme={themeConfig}>
        <PointsCreate
          onCancel={handleBackToList}
          onSave={handleSave}
          initialValues={editingData} // 傳入編輯資料 (如果是新增則為 null)
        />
      </ConfigProvider>
    )
  }

  // -----------------------------------------------------
  // Render: 2. 列表模式 (Table & Search)
  // -----------------------------------------------------

  // 表格欄位定義
  const columns = [
    { title: '類型', dataIndex: 'type', key: 'type', width: 120 },
    {
      title: '發放代理級別',
      dataIndex: 'issuingLevel',
      key: 'issuingLevel',
      width: 120,
    },
    {
      title: '發放代理名稱',
      dataIndex: 'issuingAgentName',
      key: 'issuingAgentName',
      width: 180,
      render: (text: string) => (
        <div className="whitespace-pre-wrap break-words">{text}</div>
      ),
    },
    {
      title: '發放代理',
      dataIndex: 'issuingAgent',
      key: 'issuingAgent',
      width: 100,
    },
    {
      title: '發放帳戶餘額',
      dataIndex: 'issuingBalance',
      key: 'issuingBalance',
      width: 180,
      render: (balance: any) => (
        <div className="text-xs">
          <div
            className={
              balance.change < 0
                ? 'font-bold text-red-500'
                : 'font-bold text-green-600'
            }
          >
            {balance.change.toLocaleString()}
          </div>
          <div className="text-gray-500">異動前：{balance.before}</div>
          <div className="text-gray-900">異動後：{balance.after}</div>
        </div>
      ),
    },
    {
      title: '接收代理級別',
      dataIndex: 'receivingLevel',
      key: 'receivingLevel',
      width: 120,
    },
    {
      title: '接收代理名稱',
      dataIndex: 'receivingAgentName',
      key: 'receivingAgentName',
      width: 180,
      render: (text: string) => (
        <div className="whitespace-pre-wrap break-words">{text}</div>
      ),
    },
    {
      title: '接收會員',
      dataIndex: 'receivingMember',
      key: 'receivingMember',
      width: 100,
    },
    {
      title: '接收帳戶餘額',
      dataIndex: 'receivingBalance',
      key: 'receivingBalance',
      width: 180,
      render: (balance: any) => (
        <div className="text-xs">
          <div
            className={
              balance.change < 0
                ? 'font-bold text-red-500'
                : 'font-bold text-green-600'
            }
          >
            {balance.change > 0
              ? `+${balance.change.toLocaleString()}`
              : balance.change.toLocaleString()}
          </div>
          <div className="text-gray-500">異動前：{balance.before}</div>
          <div className="text-gray-900">異動後：{balance.after}</div>
        </div>
      ),
    },
    {
      title: '流水倍數',
      dataIndex: 'turnoverMultiple',
      key: 'turnoverMultiple',
      width: 80,
      align: 'center' as const,
    },
    {
      title: '必須流水',
      dataIndex: 'requiredTurnover',
      key: 'requiredTurnover',
      width: 100,
      render: (val: number) => val.toLocaleString(),
    },

    // --- 備註欄位 (灰色區塊 + 編輯按鈕) ---
    {
      title: '備註',
      dataIndex: 'remarks',
      key: 'remarks',
      width: 200,
      render: (text: string, record: any) => (
        <div className="flex flex-col gap-1">
          {/* 灰色顯示區塊 */}
          <div className="h-12 w-full overflow-hidden break-words rounded-sm bg-gray-300 p-1 text-xs text-gray-700">
            {text}
          </div>
          {/* 編輯按鈕 */}
          <div>
            <Button
              size="small"
              className="h-6 rounded border-gray-400 bg-white px-3 text-xs text-gray-700 hover:border-teal-600 hover:text-teal-600"
              onClick={() => handleEditClick(record)} // 觸發編輯模式
            >
              編輯
            </Button>
          </div>
        </div>
      ),
    },
    // ------------------------------------

    {
      title: '經手人',
      key: 'action',
      width: 80,
      fixed: 'right' as const,
      align: 'center' as const,
      render: (_: any, record: any) => (
        <Button
          type="text"
          icon={<FileTextOutlined className="text-2xl text-black" />}
          onClick={() => fetchLogs(record)} // 觸發彈窗
        />
      ),
    },
  ]

  // Header 標題與收合箭頭
  const customHeader = (
    <div className="flex cursor-pointer select-none items-center gap-2">
      <span className="text-base font-bold">條件搜尋</span>
      <DownOutlined
        className={`text-xs text-gray-500 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
      />
    </div>
  )

  // Header 右側新增按鈕
  const panelExtra = (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      className="border-purple-200 bg-purple-100 text-purple-600 shadow-none hover:border-purple-300 hover:bg-purple-200"
      onClick={(e) => {
        e.stopPropagation()
        setEditingData(null) // 新增前清空暫存
        setViewMode('create') // 切換到新增模式
      }}
    >
      新增
    </Button>
  )

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>營運商管理</Breadcrumb.Item>
          <Breadcrumb.Item>點數加扣點紀錄</Breadcrumb.Item>
        </Breadcrumb>
        {/* 搜尋區塊 */}
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
            <Form form={form} layout="vertical">
              <Row gutter={16} align="bottom">
                <Col xs={24} sm={12} md={3}>
                  <Form.Item
                    label="獎勵類型"
                    name="rewardType"
                    className="mb-2 md:mb-0"
                  >
                    <Select placeholder="請選擇">
                      <Option value="gift">贈點</Option>
                      <Option value="manual">手動補點</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={3}>
                  <Form.Item
                    label="發放代理級別"
                    name="agentLevel"
                    className="mb-2 md:mb-0"
                  >
                    <Select placeholder="1級總代理">
                      <Option value="lvl1">1級總代理</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={4}>
                  <Form.Item
                    label="發放代理名稱"
                    name="agentName"
                    className="mb-2 md:mb-0"
                  >
                    <Input placeholder="請輸入" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={4}>
                  <Form.Item
                    label="發放代理"
                    name="agentAccount"
                    className="mb-2 md:mb-0"
                  >
                    <Input placeholder="請輸入" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={7}>
                  <Form.Item label="發放時間" name="dateRange" className="mb-0">
                    <QuickRangePicker />
                  </Form.Item>
                </Col>

                {/* 按鈕底部對齊修正 pb-7 */}
                <Col xs={24} sm={24} md={3} className="flex justify-end pb-7">
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    className="w-full font-bold md:w-auto"
                  >
                    搜尋
                  </Button>
                </Col>
              </Row>
            </Form>
          </Panel>
        </Collapse>

        {/* 表格區塊 */}
        <div className="rounded-md bg-white p-4 shadow-sm">
          <div className="mb-2 flex justify-end text-sm text-gray-500">
            <div className="space-y-1 text-right">
              <div>
                發放金額總計：
                <span className="font-medium text-gray-700">2,354,684</span>
              </div>
              <div>
                收回金額總計：
                <span className="font-medium text-gray-700">25,689</span>
              </div>
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={mockData}
            pagination={{
              position: ['bottomLeft'],
              total: 20,
              showTotal: (total) => `總計 ${total} 筆資料`,
              defaultPageSize: 20,
              showSizeChanger: true,
            }}
            scroll={{ x: 1500 }}
            rowClassName="align-top"
            size="middle"
          />
        </div>

        {/* 經手人彈窗 (與 AgentList 共用) */}
        <HandlerModal
          open={isHandlerModalOpen}
          onCancel={() => setIsHandlerModalOpen(false)}
          logs={currentLogs}
        />
      </div>
    </ConfigProvider>
  )
}
