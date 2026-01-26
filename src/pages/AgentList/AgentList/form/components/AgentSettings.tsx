import { Card, Form, Select, Input, Checkbox } from 'antd'
const { TextArea } = Input

interface AgentSettingsProps {
  isEditMode: boolean
}

export default function AgentSettings({ isEditMode }: AgentSettingsProps) {
  return (
    <Card title="代理設定" className="mb-4 shadow-sm">
      {/* 👇 1. 在這裡包一層 Form，統一設定排版 */}
      <Form
        layout="horizontal"
        labelAlign="left" // 強制標籤文字靠左
        labelCol={{ span: 6 }} // 標籤寬度
        wrapperCol={{ span: 14 }} // 欄位寬度
      >
        <Form.Item
          label="上級代理級別選擇"
          name="parentLevel"
          rules={[{ required: true }]}
        >
          <Select placeholder="請選擇">
            <Select.Option value="lvl1">1級總代理</Select.Option>
            <Select.Option value="lvl2">2級代理</Select.Option>
            <Select.Option value="lvl3">3級代理</Select.Option>
            <Select.Option value="lvl4">4級代理</Select.Option>
            <Select.Option value="lvl5">5級代理</Select.Option>
            <Select.Option value="lvl6">6級代理</Select.Option>
            <Select.Option value="lvl7">7級代理</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="上級代理選擇"
          name="parentAgent"
          rules={[{ required: true }]}
          style={{ marginBottom: 0 }}
        >
          <Select placeholder="請選擇">
            <Select.Option value="fmca">FMCA-(主站-總代)</Select.Option>
            <Select.Option value="test123">test123-(測試帳號線)</Select.Option>
            <Select.Option value="fxout">
              FXOUT-(金流/成數代理-外單位)
            </Select.Option>
            <Select.Option value="fmca2">
              FMCA02-(金流/返水代理-主站)
            </Select.Option>
          </Select>
        </Form.Item>

        {/* 👇 2. Checkbox 特殊處理：因為它沒有 Label，要加 offset 讓它往右縮排對齊 */}
        <Form.Item
          name="isNewLevel"
          valuePropName="checked"
          style={{ marginBottom: 24 }}
          wrapperCol={{ offset: 6, span: 18 }}
        >
          <Checkbox>新增代理級別</Checkbox>
        </Form.Item>

        <Form.Item
          label="代理名稱"
          name="agentName"
          rules={[{ required: true }]}
        >
          <Input placeholder="請輸入" />
        </Form.Item>

        <Form.Item label="代理帳號" name="account" rules={[{ required: true }]}>
          <Input placeholder="請輸入" disabled={isEditMode} />
        </Form.Item>

        <Form.Item
          label="代理前台網址"
          name="frontendUrl"
          rules={[{ required: true }]}
          help={
            <span className="text-xs text-red-500">
              請將代理網址後綴輸入您想要的會員帳號
            </span>
          }
        >
          <Input addonBefore="https://fuma888.com/" placeholder="請輸入" />
        </Form.Item>

        <Form.Item
          label="登入密碼"
          name="password"
          rules={[{ required: !isEditMode }]}
        >
          <Input.Password placeholder="請輸入" />
        </Form.Item>

        <Form.Item
          label="再輸入一次登入密碼"
          name="confirmPassword"
          rules={[{ required: !isEditMode }]}
        >
          <Input.Password placeholder="請輸入" />
        </Form.Item>

        <Form.Item
          label="預設會員VIP等級"
          name="defaultVip"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="請選擇"
            options={[
              { label: 'VIP0-遊客', value: 'VIP0' },
              { label: 'VIP1-一般會員', value: 'VIP1' },
              { label: 'VIP2-BOK會員', value: 'VIP2' },
              { label: 'VIP3-青銅會員', value: 'VIP3' },
              { label: 'VIP4-白銀會員', value: 'VIP4' },
              { label: 'VIP5-黃金會員', value: 'VIP5' },
              { label: 'VIP6-鑽石會員', value: 'VIP6' },
              { label: 'VIP7-特邀會員', value: 'VIP7' },
              { label: 'VIP10-無返水線', value: 'VIP10' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="預設會員返水結算條件"
          name="returnWater"
          rules={[{ required: true }]}
        >
          <Select placeholder="請選擇">
            <Select.Option value="daily">日結</Select.Option>
            <Select.Option value="week">週結</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="預設金流群組"
          name="cashGroup"
          rules={[{ required: true }]}
        >
          <Select placeholder="請選擇">
            <Select.Option value="regular">常規會員</Select.Option>
            <Select.Option value="old">老會員</Select.Option>
            <Select.Option value="credit">信用代理</Select.Option>
            <Select.Option value="usdt">USDT通道</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="預設帳號狀態"
          name="status"
          rules={[{ required: true }]}
        >
          <Select placeholder="請選擇">
            <Select.Option value="active">啟用</Select.Option>
            <Select.Option value="disabled">停用</Select.Option>
            <Select.Option value="frozen_wallet">啟用(凍結錢包)</Select.Option>
            <Select.Option value="no_deposit">啟用(停用儲值)</Select.Option>
            <Select.Option value="no_withdraw">啟用(停用託售)</Select.Option>
            <Select.Option value="banned">終身停權</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="備註" name="memo">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Card>
  )
}
