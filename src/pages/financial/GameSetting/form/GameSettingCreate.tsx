import { useEffect, useState } from 'react'
import { Breadcrumb, Button, Form, Input, Select, Card } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'
import type { GameSettingData } from '../types'

interface GameSettingFormProps {
  initialValues?: GameSettingData | null
  onCancel: () => void
  onSave: (values: any) => void
}

export default function GameSettingForm({
  initialValues,
  onCancel,
  onSave,
}: GameSettingFormProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const isEdit = !!initialValues
  const pageTitle = isEdit ? '編輯遊戲上繳' : '新增遊戲上繳'

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [initialValues, form])

  const handleFinish = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)

      console.log('Submit Values:', values)

      setTimeout(() => {
        setLoading(false)
        onSave(values)
      }, 800)
    } catch (error) {
      console.log('Validation Failed:', error)
    }
  }

  const cardHeadStyle = {
    background: '#fafafa',
    fontWeight: 'bold',
    borderBottom: '1px solid #f0f0f0',
    fontSize: '16px',
  }

  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 4 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
  }

  return (
    <div className="space-y-4 bg-gray-100 px-4">
      {/* ===== Breadcrumb ===== */}
      <Breadcrumb separator=">" className="px-4 py-4">
        <Breadcrumb.Item>遊戲商管理</Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={onCancel}
          className="cursor-pointer hover:text-teal-600"
        >
          遊戲上繳設定
        </Breadcrumb.Item>
        <Breadcrumb.Item>{pageTitle}</Breadcrumb.Item>
      </Breadcrumb>

      {/* ===== 外層卡片（sticky 以這層為基準） ===== */}
      <div className="relative rounded-lg bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="text-lg font-bold text-gray-800">{pageTitle}</div>
        </div>

        {/* ===== 表單內容（預留 footer 高度） ===== */}
        <div className="p-6 pb-32">
          <Form form={form} {...formItemLayout} labelAlign="left" size="large">
            <Card
              title="遊戲上繳設定"
              size="small"
              headStyle={cardHeadStyle}
              className="shadow-sm"
            >
              <Form.Item
                label="站別"
                name="station"
                rules={[{ required: true, message: '請選擇站別' }]}
              >
                <Select
                  placeholder="請選擇"
                  options={[{ label: 'FM', value: 'FM' }]}
                  disabled={isEdit}
                />
              </Form.Item>

              <Form.Item
                label="遊戲類別選擇"
                name="category"
                rules={[{ required: true, message: '請選擇遊戲類別' }]}
              >
                <Select
                  placeholder="請選擇"
                  options={[
                    { label: '電子', value: '電子' },
                    { label: '真人', value: '真人' },
                  ]}
                  disabled={isEdit}
                />
              </Form.Item>

              <Form.Item
                label="遊戲商選擇"
                name="vendorName"
                rules={[{ required: true, message: '請選擇遊戲商' }]}
              >
                <Select
                  placeholder="請選擇"
                  options={[
                    { label: 'ATG', value: 'ATG' },
                    { label: 'QT', value: 'QT' },
                    { label: 'RSG', value: 'RSG' },
                    { label: 'BNG', value: 'BNG' },
                  ]}
                  disabled={isEdit}
                />
              </Form.Item>

              <Form.Item
                label="彩金結算"
                name="jackpotSettlement"
                rules={[{ required: true, message: '請選擇彩金結算狀態' }]}
              >
                <Select
                  placeholder="請選擇"
                  options={[
                    { label: '啟用', value: '啟用' },
                    { label: '停用', value: '停用' },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label="彩金貢獻值(JC / %)"
                name="contribution"
                rules={[{ required: true, message: '請輸入彩金貢獻值' }]}
              >
                <Input placeholder="請輸入" />
              </Form.Item>

              <Form.Item
                label="遊戲上繳(%)"
                name="gameCap"
                rules={[{ required: true, message: '請輸入遊戲上繳比例' }]}
              >
                <Input placeholder="請輸入" />
              </Form.Item>

              <Form.Item
                label="負營利狀態"
                name="negativeProfit"
                rules={[{ required: true, message: '請選擇負營利狀態' }]}
              >
                <Select
                  placeholder="請選擇"
                  options={[
                    { label: '承擔', value: '承擔' },
                    { label: '不承擔', value: '不承擔' },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label="遊戲上繳結算日"
                name="settlementType"
                rules={[{ required: true, message: '請選擇結算日' }]}
              >
                <Select
                  placeholder="請選擇"
                  options={[
                    { label: '週結 (每週日)', value: '週結' },
                    { label: '月結 (每月最後一天)', value: '月結' },
                  ]}
                />
              </Form.Item>
            </Card>
          </Form>
        </div>

        {/* ===== Sticky Footer（統一樣式） ===== */}
        <div className="sticky bottom-0 z-10 flex justify-center gap-4 border-t border-gray-200 bg-white py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <Button
            icon={<CloseOutlined />}
            onClick={onCancel}
            size="large"
            className="h-10 w-32 border-red-500 font-bold text-red-500 hover:!border-red-400 hover:bg-red-50 hover:!text-red-400"
          >
            取 消
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleFinish}
            loading={loading}
            size="large"
            className="h-10 w-32 border-green-500 bg-green-500 font-bold shadow-sm hover:!border-green-400 hover:!bg-green-400"
          >
            儲 存
          </Button>
        </div>
      </div>
    </div>
  )
}
