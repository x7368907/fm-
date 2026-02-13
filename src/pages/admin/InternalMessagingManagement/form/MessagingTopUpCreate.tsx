import { Breadcrumb, Button, Form, Input, Select, Divider } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'

export default function MessagingTopUpCreate({ onCancel, onSave }: any) {
  const [form] = Form.useForm()
  return (
    <div className="flex h-[calc(100vh-64px)] flex-col overflow-hidden bg-gray-100 px-4">
      <Breadcrumb separator=">" className="shrink-0 px-4 py-4 text-sm">
        <Breadcrumb.Item>後台管理</Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={onCancel}
          className="cursor-pointer text-teal-600"
        >
          站內信管理
        </Breadcrumb.Item>
        <Breadcrumb.Item className="font-bold">儲值紀錄</Breadcrumb.Item>
        <Breadcrumb.Item className="font-bold text-gray-800">
          新增
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="relative mb-4 flex flex-1 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="shrink-0 border-b bg-gray-50 px-6 py-3 font-bold text-gray-700">
          新增儲值
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 10 }}
            labelAlign="left"
          >
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-bold text-gray-700">儲值設定</h3>
              <Divider className="my-0 border-gray-200" />
            </div>

            <Form.Item
              label="選擇訊息商"
              name="provider"
              rules={[{ required: true }]}
            >
              <Select options={[{ label: 'EngageLab', value: 'EngageLab' }]} />
            </Form.Item>
            <Form.Item label="剩餘點數">
              <span className="text-gray-800">11,259</span>
            </Form.Item>
            <Form.Item
              label="選擇寄送類型"
              name="sendType"
              initialValue="AppPush"
            >
              <Select
                options={[
                  { label: 'AppPush', value: 'AppPush' },
                  { label: 'OTP', value: 'OTP' },
                ]}
              />
            </Form.Item>
            <Form.Item label="充值點數" name="topUpAmount">
              <Input placeholder="請輸入" />
            </Form.Item>
            <Form.Item label="充值費用">
              <span className="font-bold text-black">$ 0.00</span>
            </Form.Item>
          </Form>
        </div>

        <div className="sticky bottom-0 z-10 flex shrink-0 justify-center gap-4 border-t bg-white py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <Button
            size="large"
            icon={<CloseOutlined />}
            onClick={onCancel}
            className="w-32 border-red-500 font-bold text-red-500"
          >
            取 消
          </Button>
          <Button
            size="large"
            type="primary"
            icon={<SaveOutlined />}
            onClick={() => onSave(form.getFieldsValue())}
            className="w-32 border-green-600 bg-green-600 font-bold"
          >
            儲 存
          </Button>
        </div>
      </div>
    </div>
  )
}
