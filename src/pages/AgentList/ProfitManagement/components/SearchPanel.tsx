import { useState } from 'react'
import { Form, Input, Select, Button, Collapse } from 'antd'
import { SearchOutlined, DownOutlined } from '@ant-design/icons'
// 假設這是你的共用元件路徑，請依實際位置調整
import QuickRangePicker from '../../../../components/QuickRangePicker'

const { Option } = Select
const { Panel } = Collapse

export default function SearchPanel() {
  const [form] = Form.useForm()
  const [activeKey, setActiveKey] = useState<string | string[]>(['1'])
  const isActive = Array.isArray(activeKey) && activeKey.includes('1')

  const customHeader = (
    <div className="flex cursor-pointer select-none items-center gap-2">
      <span className="font-bold">條件搜尋</span>
      <DownOutlined
        className={`text-xs text-gray-500 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
      />
    </div>
  )

  return (
    <Collapse
      activeKey={activeKey}
      onChange={setActiveKey}
      className="mb-4 rounded-md bg-white shadow-sm"
    >
      <Panel
        header={customHeader}
        key="1"
        showArrow={false}
        className="border-none"
      >
        <Form form={form} layout="vertical">
          {/* 使用 grid 排版：大螢幕一行 5 個欄位 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Form.Item label="代理級別" name="level">
              <Select placeholder="1級總代理" defaultValue="lvl1">
                <Option value="lvl1">1級總代理</Option>
              </Select>
            </Form.Item>

            <Form.Item label="代理名稱" name="agentName">
              <Input placeholder="" />
            </Form.Item>

            <Form.Item label="代理帳號" name="agentAccount">
              <Input placeholder="" />
            </Form.Item>

            <Form.Item label="代理姓名" name="realName">
              <Input placeholder="" />
            </Form.Item>

            <Form.Item label="帳號狀態" name="status">
              <Select placeholder="全部" defaultValue="all">
                <Option value="all">全部</Option>
                <Option value="active">啟用</Option>
              </Select>
            </Form.Item>

            <Form.Item label="分潤制度" name="profitType">
              <Select placeholder="全部" defaultValue="all">
                <Option value="all">全部</Option>
              </Select>
            </Form.Item>

            <Form.Item label="代理分潤結算" name="settlement">
              <Select placeholder="全部" defaultValue="all">
                <Option value="all">全部</Option>
              </Select>
            </Form.Item>

            {/* 日期選擇器跨兩個欄位 */}
            <Form.Item
              label="結算起訖日"
              name="dateRange"
              className="lg:col-span-2"
            >
              <QuickRangePicker />
            </Form.Item>

            <Form.Item label="每頁顯示筆數" name="pageSize">
              <Select defaultValue="20">
                <Option value="20">20</Option>
                <Option value="50">50</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="mt-2 flex justify-end">
            <Button
              type="primary"
              icon={<SearchOutlined />}
              className="border-teal-500 bg-teal-500 hover:bg-teal-400"
            >
              搜尋
            </Button>
          </div>
        </Form>
      </Panel>
    </Collapse>
  )
}
