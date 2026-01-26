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

  /** ✅ 監聽代理制度 */
  const system = Form.useWatch('system', form)

  const isShareMode = system === 'share'
  const isRebateMode = system === 'rebate'

  /** ✅ 切換制度時，自動清空不該存在的欄位 */
  useEffect(() => {
    if (isShareMode) {
      form.setFieldsValue({
        rebate: {},
      })
    }

    if (isRebateMode) {
      form.setFieldsValue({
        ratio: undefined,
      })
    }
  }, [isShareMode, isRebateMode, form])

  return (
    <div className="rounded-lg bg-white shadow-sm">
      {/* 標題 */}
      <div className="border-b border-gray-200 bg-gray-50 p-4">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      </div>

      <div className="p-8">
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-700">分潤條件設定</h3>
          <div className="mt-2 h-[1px] w-full bg-gray-200" />
        </div>

        <Form
          form={form}
          layout="vertical"
          className="max-w-4xl"
          initialValues={{ system: 'share' }}
        >
          {/* 代理制度 */}
          <Form.Item label="代理制度" name="system">
            <Select>
              <Select.Option value="share">佔成制</Select.Option>
              <Select.Option value="rebate">返水制</Select.Option>
            </Select>
          </Form.Item>

          {/* 分潤名稱 */}
          <Form.Item
            label="分潤名稱"
            name="name"
            rules={[{ required: true, message: '請輸入分潤名稱' }]}
          >
            <Input placeholder="請輸入" />
          </Form.Item>

          {/* 代理級別 */}
          <Form.Item label="代理級別選擇" name="level">
            <Select
              placeholder="請選擇"
              options={[
                { label: '任一層級', value: 'all' },
                { label: '1級總代理', value: '1' },
                { label: '2級代理', value: '2' },
                { label: '3級代理', value: '3' },
                { label: '4級代理', value: '4' },
                { label: '5級代理', value: '5' },
              ]}
            />
          </Form.Item>

          {/* 代理名稱 */}
          <Form.Item label="代理名稱選擇" name="agentName">
            <Select
              placeholder="請選擇"
              options={[
                { label: '任一代理', value: 'all' },
                { label: 'FMCA(金流/成數代理-主站)', value: 'FMCA' },
                { label: 'test123(測試帳號線)', value: 'test123' },
                { label: 'XFW(金流/成數+返水代理-外單位)', value: 'XFW' },
                { label: 'W02週結-(信用/成數代理-外單位)', value: 'W02' },
                { label: 'W01週結-(信用/成數+返水代理-外單位)', value: 'W01' },
              ]}
            />
          </Form.Item>

          {/* ✅ 代理佔成比例（返水制時禁用） */}
          <Form.Item label="代理佔成比例(%)" name="ratio">
            <Input placeholder="請輸入" suffix="%" disabled={isRebateMode} />
          </Form.Item>

          {/* ✅ 代理返水條件（佔成制時禁用） */}
          <RebateSettings disabled={isShareMode} />

          {/* 結算方式 */}
          <Form.Item label="代理分潤結算" name="settlement">
            <Select placeholder="請選擇">
              <Select.Option value="week">週結(每週日-23:59:59)</Select.Option>
              <Select.Option value="month">
                月結(每月最後一天-23:59:59)
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </div>

      {/* 底部按鈕 */}
      <div className="flex justify-center gap-4 border-t border-gray-200 bg-gray-50 p-4">
        <Button
          size="large"
          icon={<CloseOutlined />}
          className="border-red-500 text-red-500 hover:!border-red-600 hover:!text-red-600"
          onClick={onCancel}
        >
          取消
        </Button>

        <Button
          type="primary"
          size="large"
          icon={<SaveOutlined />}
          className="border-green-600 bg-green-600 hover:!bg-green-700"
          onClick={handleSubmit}
        >
          儲存
        </Button>
      </div>
    </div>
  )
}
