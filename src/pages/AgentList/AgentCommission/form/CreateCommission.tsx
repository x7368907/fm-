import { Button, Select, Input, Form } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'
import { useEffect } from 'react'

import type { CommissionData } from '../types'
import { useCommissionForm } from '../hooks/useCommissionForm'
import RebateSettings from './components/RebateSettings'

interface CreateCommissionProps {
  initialValues?: CommissionData | null
  onCancel: () => void
  onSuccess: () => void
}

export default function CreateCommission({
  initialValues,
  onCancel,
  onSuccess,
}: CreateCommissionProps) {
  const { form, handleSubmit } = useCommissionForm({
    initialValues,
    onSuccess,
  })

  const title = initialValues ? '編輯分潤' : '新增分潤'
  const system = Form.useWatch('system', form)

  const isShareMode = system === 'share'
  const isRebateMode = system === 'rebate'

  useEffect(() => {
    if (isShareMode) {
      form.setFieldsValue({ rebate: {} })
    }
    if (isRebateMode) {
      form.setFieldsValue({ ratio: undefined })
    }
  }, [isShareMode, isRebateMode, form])

  return (
    <div className="space-y-4">
      {/* 標題 */}
      <div className="rounded-sm bg-gray-100 px-4 py-3 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      </div>

      {/* 🔥 關鍵：relative，讓 sticky 以這個區塊為基準 */}
      <div className="relative rounded-lg bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6 pb-2">
          <h3 className="text-base font-bold text-gray-800">分潤條件設定</h3>
        </div>

        {/* ===== 表單內容 ===== */}
        {/* 🔥 關鍵：pb-32，預留 footer 高度 */}
        <div className="p-8 pb-32">
          <Form
            form={form}
            layout="horizontal"
            labelAlign="left"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 12, offset: 1 }}
            className="max-w-4xl"
            initialValues={{ system: 'share' }}
          >
            <Form.Item label="代理制度" name="system">
              <Select>
                <Select.Option value="share">佔成制</Select.Option>
                <Select.Option value="rebate">返水制</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="分潤名稱" name="name">
              <Input placeholder="請輸入" />
            </Form.Item>

            <Form.Item label="代理級別選擇" name="level">
              <Select placeholder="請選擇" />
            </Form.Item>

            <Form.Item label="代理名稱選擇" name="agentName">
              <Select placeholder="請選擇" />
            </Form.Item>

            <Form.Item label="代理佔成比例(%)" name="ratio">
              <Input suffix="%" disabled={isRebateMode} />
            </Form.Item>

            <RebateSettings disabled={isShareMode} />

            <Form.Item label="代理分潤結算" name="settlement">
              <Select>
                <Select.Option value="week">週結</Select.Option>
                <Select.Option value="month">月結</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </div>

        {/* ===== Sticky Footer（照 PointsCreate） ===== */}
        <div className="sticky bottom-0 z-10 flex justify-center gap-4 rounded-b-lg border-t border-gray-200 bg-white py-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <Button
            size="large"
            icon={<CloseOutlined />}
            className="h-10 w-32 border-red-500 text-red-500 hover:!border-red-600 hover:!text-red-600"
            onClick={onCancel}
          >
            取消
          </Button>

          <Button
            type="primary"
            size="large"
            icon={<SaveOutlined />}
            className="h-10 w-32 border-green-600 bg-green-600 hover:!bg-green-700"
            onClick={handleSubmit}
          >
            儲存
          </Button>
        </div>
      </div>
    </div>
  )
}
