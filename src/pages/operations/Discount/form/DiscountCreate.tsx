import { Form, Breadcrumb, Space, Button } from 'antd'
import { CloseOutlined, SaveOutlined } from '@ant-design/icons'

// 引入拆分後的元件
import CommonFields from './CommonFields'
import PrivilegeForm from './components/PrivilegeForm'
import DiscountForm from './components/DiscountForm'
import RedEnvForm from './components/RedEnvForm'

// 引入 Hook
import { useDiscountForm } from '../hook/useDiscountForm'
import type { DiscountDataType } from '../types'

interface DiscountCreateProps {
  onCancel: () => void
  onSave: () => void
  initialValues?: DiscountDataType
}

export default function DiscountCreate({
  onCancel,
  onSave,
  initialValues,
}: DiscountCreateProps) {
  const {
    form,
    discountType,
    isCheckAmountUnlimited,
    handleTypeChange,
    handleValuesChange,
  } = useDiscountForm(initialValues)

  const getTypeBtnClass = (type: string) => {
    const base =
      'px-8 py-1 rounded border text-sm transition-colors cursor-pointer outline-none'
    return discountType === type
      ? `${base} bg-[#7e22ce] text-white border-[#7e22ce]`
      : `${base} bg-white text-gray-500 border-gray-300 hover:text-[#7e22ce] hover:border-[#7e22ce]`
  }

  const renderFormContent = () => {
    switch (discountType) {
      case 'privilege':
        return <PrivilegeForm />
      case 'discount':
        return <DiscountForm isCheckAmountUnlimited={isCheckAmountUnlimited} />
      case 'redenv':
        return <RedEnvForm />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4 bg-gray-50 p-6">
      {/* Breadcrumb */}
      <Breadcrumb separator=">" className="mb-2">
        <Breadcrumb.Item>營運管理</Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={onCancel}
          className="cursor-pointer hover:text-teal-600"
        >
          優惠管理
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {initialValues ? '編輯優惠' : '新增優惠'}
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* ===== 外層卡片（sticky 以這層為基準） ===== */}
      <div className="relative rounded-lg bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-bold text-gray-800">
            {initialValues ? '編輯優惠' : '新增優惠'}
          </h2>
        </div>

        {/* ===== 表單內容（一定要預留 footer 高度） ===== */}
        <div className="p-8 pb-32">
          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 10 }}
            labelAlign="left"
            className="w-full"
            onValuesChange={handleValuesChange}
          >
            <div className="mb-4 text-sm font-bold text-gray-700">優惠設定</div>

            <Space size="middle" className="mb-4">
              {[
                { key: 'privilege', label: '特權' },
                { key: 'discount', label: '優惠' },
                { key: 'redenv', label: '紅包' },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={getTypeBtnClass(item.key)}
                  onClick={() => handleTypeChange(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </Space>

            <div className="my-6 border-t border-gray-100" />

            {renderFormContent()}

            <CommonFields />
          </Form>
        </div>

        {/* ===== Sticky Footer（統一樣式） ===== */}
        <div className="sticky bottom-0 z-10 flex justify-center gap-4 border-t border-gray-200 bg-white py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <Button
            icon={<CloseOutlined />}
            size="large"
            onClick={onCancel}
            className="h-10 w-32 border-red-500 font-bold text-red-500 hover:!border-red-400 hover:!text-red-400"
          >
            取消
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            size="large"
            onClick={onSave}
            className="h-10 w-32 border-green-500 bg-green-500 font-bold hover:!bg-green-400"
          >
            儲存
          </Button>
        </div>
      </div>
    </div>
  )
}
