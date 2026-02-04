import { useEffect, useState } from 'react'
import { Breadcrumb, Button, Form, Card, Divider } from 'antd'
import { CloseOutlined, SaveOutlined } from '@ant-design/icons'

// 子元件
import LiveForm from './LiveForm'
import SportForm from './SportForm'

interface Props {
  onCancel: () => void
  onSave: (values: any) => void
  initialValues?: any
}

export default function RedLimitCreate({
  onCancel,
  onSave,
  initialValues,
}: Props) {
  const [form] = Form.useForm()

  // 狀態
  const [activeType, setActiveType] = useState<'live' | 'sport'>('live')
  const [activeProvider, setActiveProvider] = useState('DG')

  // 類型切換時同步廠商（保留你原本邏輯）
  useEffect(() => {
    if (activeType === 'live') {
      if (activeProvider === 'Super') setActiveProvider('DG')
    } else {
      setActiveProvider('Super')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeType])

  // 初始化 / 編輯模式
  useEffect(() => {
    if (initialValues) {
      if (initialValues.type) setActiveType(initialValues.type)
      if (initialValues.provider) setActiveProvider(initialValues.provider)
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
      setActiveType('live')
      setActiveProvider('DG')
      form.setFieldsValue({})
    }
  }, [initialValues, form])

  const handleFinish = (values: any) => {
    onSave({
      ...values,
      type: activeType,
      provider: activeProvider,
    })
  }

  return (
    // ⭐ 外層一定要是 flex + min-h-screen
    <div className="flex min-h-screen flex-col bg-gray-50 p-4">
      {/* ===== Breadcrumb ===== */}
      <Breadcrumb separator=">" className="mb-2">
        <Breadcrumb.Item>遊戲商管理</Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer hover:text-teal-600"
          onClick={onCancel}
        >
          遊戲限紅設定
        </Breadcrumb.Item>
        <Breadcrumb.Item className="font-bold text-gray-800">
          {initialValues ? '編輯遊戲限紅設定' : '新增遊戲限紅設定'}
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* ===== 主 Card（重點）===== */}
      <Card
        className="flex flex-1 flex-col border border-gray-200 shadow-sm"
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        {/* Header */}
        <div className="border-b border-gray-200 bg-gray-100 px-6 py-3">
          <h2 className="mb-0 text-base font-bold text-gray-700">
            {initialValues ? '編輯遊戲限紅' : '新增遊戲限紅'}
          </h2>
        </div>

        {/* ===== 可捲動內容區（關鍵）===== */}
        <div className="flex-1 overflow-y-auto p-8 pb-32">
          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            labelAlign="left"
            colon={false}
            onFinish={handleFinish}
          >
            {/* 區塊標題 */}
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-bold text-gray-700">
                遊戲限紅設定
              </h3>
              <Divider className="my-0" />
            </div>

            {/* 類型切換 */}
            <Form.Item wrapperCol={{ span: 24 }} className="mb-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveType('live')}
                  className={`h-8 w-24 rounded border text-sm transition-colors ${
                    activeType === 'live'
                      ? 'border-[#7c3aed] bg-[#7c3aed] text-white'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-[#7c3aed] hover:text-[#7c3aed]'
                  }`}
                >
                  真人
                </button>
                <button
                  type="button"
                  onClick={() => setActiveType('sport')}
                  className={`h-8 w-24 rounded border text-sm transition-colors ${
                    activeType === 'sport'
                      ? 'border-[#7c3aed] bg-[#7c3aed] text-white'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-[#7c3aed] hover:text-[#7c3aed]'
                  }`}
                >
                  體育
                </button>
              </div>
            </Form.Item>

            {/* 子表單 */}
            {activeType === 'live' ? (
              <LiveForm
                activeProvider={activeProvider}
                setActiveProvider={setActiveProvider}
              />
            ) : (
              <SportForm
                activeProvider={activeProvider}
                setActiveProvider={setActiveProvider}
              />
            )}
          </Form>
        </div>

        {/* ===== Sticky Footer（永遠可見）===== */}
        <div className="sticky bottom-0 z-10 flex justify-center gap-4 border-t border-gray-200 bg-white py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <Button
            size="large"
            icon={<CloseOutlined />}
            onClick={onCancel}
            className="h-10 w-32 border-red-500 font-bold text-red-500 hover:!border-red-400 hover:bg-red-50 hover:!text-red-400"
          >
            取 消
          </Button>
          <Button
            size="large"
            type="primary"
            icon={<SaveOutlined />}
            onClick={() => form.submit()}
            className="h-10 w-32 border-green-500 bg-green-500 font-bold shadow-sm hover:!border-green-400 hover:!bg-green-400"
          >
            儲 存
          </Button>
        </div>
      </Card>
    </div>
  )
}
