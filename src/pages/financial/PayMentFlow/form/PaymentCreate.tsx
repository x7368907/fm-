import React, { useEffect } from 'react'
import { Form, Button, Breadcrumb } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'

// 引入拆分後的子元件
import PaymentBasicInfo from './components/PaymentBasicInfo'
import PaymentFeeSettings from './components/PaymentFeeSettings'

interface PaymentCreateProps {
  initialValues?: any
  onCancel: () => void
}

const PaymentCreate: React.FC<PaymentCreateProps> = ({
  initialValues,
  onCancel,
}) => {
  const [form] = Form.useForm()

  // 監聽 category，用來控制手續費區塊顯示
  const category = Form.useWatch('category', form)

  const isEdit = !!initialValues
  const pageTitle = isEdit ? '編輯金流串接' : '新增金流串接'

  // 單欄式 Layout
  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 4 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
  }

  // 初始化表單
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
      form.setFieldsValue({
        category: 'deposit',
        status: true,
        resetCondition: 'daily',
      })
    }
  }, [initialValues, form])

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log('Submit:', values)
      onCancel()
    })
  }

  return (
    <div className="space-y-4 bg-gray-100 px-4">
      {/* ===== Breadcrumb ===== */}
      <Breadcrumb separator=">" className="px-4 py-4">
        <Breadcrumb.Item>財務管理</Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={onCancel}
          className="cursor-pointer hover:text-teal-600"
        >
          金流串接管理
        </Breadcrumb.Item>
        <Breadcrumb.Item>{pageTitle}</Breadcrumb.Item>
      </Breadcrumb>

      {/* ===== 外層卡片（sticky 以這層為基準） ===== */}
      <div className="relative rounded-lg bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="text-lg font-bold text-gray-800">{pageTitle}</div>
        </div>

        {/* ===== 表單內容（一定要預留 footer 高度） ===== */}
        <div className="p-6 pb-32">
          <Form
            form={form}
            {...formItemLayout}
            labelAlign="left"
            className="w-full"
          >
            {/* 1. 基本設定區塊 */}
            <PaymentBasicInfo />

            {/* 2. 手續費設定區塊 (只有託售時顯示) */}
            {category === 'withdraw' && <PaymentFeeSettings />}
          </Form>
        </div>

        {/* ===== Sticky Footer（統一樣式） ===== */}
        <div className="sticky bottom-0 z-10 flex justify-center gap-4 border-t border-gray-200 bg-white py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <Button
            icon={<CloseOutlined />}
            onClick={onCancel}
            className="h-10 w-32 border-red-500 font-bold text-red-500 hover:!border-red-400 hover:bg-red-50 hover:!text-red-400"
          >
            取 消
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSubmit}
            className="h-10 w-32 border-green-500 bg-green-500 font-bold shadow-sm hover:!border-green-400 hover:!bg-green-400"
          >
            儲 存
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PaymentCreate
