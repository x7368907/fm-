import { useEffect } from 'react'
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Select,
  Checkbox,
  Row,
  Col,
  Divider,
} from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'

export default function MessagingProviderCreate({
  onCancel,
  onSave,
  initialValues,
}: any) {
  const [form] = Form.useForm()
  const isEdit = !!initialValues

  useEffect(() => {
    if (initialValues) form.setFieldsValue(initialValues)
    else form.resetFields()
  }, [initialValues, form])

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col overflow-hidden bg-gray-100 px-4">
      {/* ===== Breadcrumb ===== */}
      <Breadcrumb separator=">" className="shrink-0 px-4 py-4 text-sm">
        <Breadcrumb.Item>後台管理</Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={onCancel}
          className="cursor-pointer text-teal-600"
        >
          站內信管理
        </Breadcrumb.Item>
        <Breadcrumb.Item className="font-bold">訊息商串接</Breadcrumb.Item>
        <Breadcrumb.Item className="font-bold text-gray-800">
          {isEdit ? '修改' : '新增'}
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* ===== Main Card ===== */}
      <div className="relative mb-4 flex flex-1 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="shrink-0 border-b bg-gray-50 px-6 py-3 font-bold text-gray-700">
          {isEdit ? '修改訊息商' : '新增訊息商'}
        </div>

        {/* ===== Scrollable Content ===== */}
        <div className="flex-1 overflow-y-auto p-8">
          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 12 }}
            labelAlign="left"
          >
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-bold text-gray-700">
                訊息商設定
              </h3>
              <Divider className="my-0 border-gray-200" />
            </div>

            <Form.Item
              label="選擇訊息商"
              name="provider"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { label: 'EngageLab', value: 'EngageLab' },
                  { label: 'Telesign', value: 'Telesign' },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="API 渠道名稱"
              name="apiName"
              rules={[{ required: true }]}
            >
              <Input placeholder="API token" />
            </Form.Item>
            <Form.Item label="AppPush Key" name="appPushKey">
              <Input placeholder="AppPush Key / code" />
            </Form.Item>
            <Form.Item label="WebPush Key" name="webPushKey">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="emailKey">
              <Input />
            </Form.Item>
            <Form.Item label="SMS" name="smsKey">
              <Input />
            </Form.Item>
            <Form.Item label="WhatsApp" name="whatsappKey">
              <Input />
            </Form.Item>
            <Form.Item label="OTP" name="otpKey">
              <Input />
            </Form.Item>

            <Form.Item label="寄送類型啟停用" name="activeTypes">
              <div className="rounded border border-gray-200 p-4">
                <Checkbox.Group className="w-full">
                  <Row gutter={[16, 16]}>
                    {[
                      'AppPush',
                      'Email',
                      'WhatsApp',
                      'WebPush',
                      'SMS',
                      'OTP',
                    ].map((v) => (
                      <Col span={6} key={v}>
                        <Checkbox value={v}>{v}</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </div>
            </Form.Item>

            <Form.Item label="點數警示下限" name="alertLimit">
              <Input placeholder="請輸入" />
            </Form.Item>
            <Form.Item label="自動儲值" name="autoTopUp">
              <Select
                options={[
                  { label: '啟用', value: '啟用' },
                  { label: '停用', value: '停用' },
                ]}
              />
            </Form.Item>
            <Form.Item label="啟用" name="isEnabled">
              <Select
                options={[
                  { label: '啟用', value: '啟用' },
                  { label: '停用', value: '停用' },
                ]}
              />
            </Form.Item>
          </Form>
        </div>

        {/* ===== Sticky Footer ===== */}
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
