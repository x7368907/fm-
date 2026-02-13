import { useEffect } from 'react'
import { Breadcrumb, Button, Form, Input, Select } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'
import type { PeopleDataType } from '../types'
import { DEPARTMENT_OPTIONS } from '../utils/fakeData'

interface PeopleCreateProps {
  onCancel: () => void
  onSave: (values: PeopleDataType) => void
  initialValues?: PeopleDataType | null
}

export default function PeopleCreate({
  onCancel,
  onSave,
  initialValues,
}: PeopleCreateProps) {
  const [form] = Form.useForm()
  const isEdit = !!initialValues
  const pageTitle = isEdit ? '編輯人員' : '新增人員'

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [initialValues, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      onSave({
        ...initialValues,
        ...values,
      })
    } catch (error) {
      console.log('Validate Failed:', error)
    }
  }

  // 過濾掉 "全部" 選項，只保留實際部門
  const formDepartmentOptions = DEPARTMENT_OPTIONS.filter(
    (opt) => opt.value !== 'all'
  )

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 px-4">
      <Breadcrumb separator=">" className="px-4 py-4">
        <Breadcrumb.Item>後台管理</Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={onCancel}
          className="cursor-pointer hover:text-teal-600"
        >
          人員管理
        </Breadcrumb.Item>
        <Breadcrumb.Item>{pageTitle}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="relative flex min-h-[calc(100vh-140px)] flex-col rounded-lg bg-white shadow-sm">
        <div className="rounded-t-lg border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-800">{pageTitle}</h2>
        </div>

        <div className="flex-1 p-6">
          <Form
            form={form}
            layout="horizontal"
            labelAlign="left"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            className="max-w-4xl"
          >
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-bold text-gray-700">人員設定</h3>
              <div className="border-b border-gray-200" />
            </div>

            <Form.Item
              label="員工編號"
              name="employeeId"
              rules={[{ required: true, message: '請輸入員工編號' }]}
            >
              <Input placeholder="請輸入" />
            </Form.Item>

            <Form.Item
              label="姓名"
              name="name"
              rules={[{ required: true, message: '請輸入姓名' }]}
            >
              <Input placeholder="請輸入" />
            </Form.Item>

            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                { required: true, message: '請輸入 E-mail' },
                { type: 'email', message: '請輸入正確的 E-mail 格式' },
              ]}
            >
              <Input placeholder="請輸入" />
            </Form.Item>

            <Form.Item
              label="部門"
              name="department"
              rules={[{ required: true, message: '請選擇部門' }]}
            >
              <Select placeholder="請選擇" options={formDepartmentOptions} />
            </Form.Item>
          </Form>
        </div>

        <div className="sticky bottom-0 z-10 flex justify-center gap-4 rounded-b-lg border-t border-gray-200 bg-white py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
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
            onClick={handleSubmit}
            className="h-10 w-32 border-green-500 bg-green-500 font-bold hover:!border-green-400 hover:!bg-green-400"
          >
            儲 存
          </Button>
        </div>
      </div>
    </div>
  )
}
