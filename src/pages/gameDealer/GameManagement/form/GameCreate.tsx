import { useEffect } from 'react'
import { Breadcrumb, Select, Button, Input, Form, Divider } from 'antd'
import { CloseOutlined, SaveOutlined } from '@ant-design/icons'

const { TextArea } = Input

interface Props {
  onCancel: () => void
  onSave: (values: any) => void
  initialValues?: any
}

export default function GameCreate({ onCancel, onSave, initialValues }: Props) {
  const [form] = Form.useForm()
  const isEdit = !!initialValues

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
      form.setFieldsValue({
        gameType: 'electronic',
        status: true,
      })
    }
  }, [initialValues, form])

  const handleFinish = (values: any) => {
    onSave(values)
  }

  return (
    <div className="space-y-4 bg-gray-50 px-4">
      {/* Breadcrumb */}
      <Breadcrumb separator=">" className="px-4 py-4">
        <Breadcrumb.Item>遊戲商管理</Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer hover:text-teal-600"
          onClick={onCancel}
        >
          遊戲管理
        </Breadcrumb.Item>
        <Breadcrumb.Item>{isEdit ? '編輯遊戲' : '新增遊戲'}</Breadcrumb.Item>
      </Breadcrumb>

      {/* 🔥 外層容器（跟其他頁面一樣） */}
      <div className="relative rounded-lg bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 bg-gray-100 px-6 py-3">
          <h2 className="text-base font-bold text-gray-700">
            {isEdit ? '編輯遊戲' : '新增遊戲'}
          </h2>
        </div>

        {/* 表單內容 */}
        <div className="p-8 pb-32">
          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
            labelAlign="left"
            colon={false}
            onFinish={handleFinish}
          >
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-bold text-gray-700">遊戲設定</h3>
              <Divider className="my-0" />
            </div>

            <Form.Item label="遊戲類型" name="gameType">
              <Select
                style={{ width: 400 }}
                options={[
                  { label: '真人', value: 'live' },
                  { label: '電子', value: 'electronic' },
                  { label: '體育', value: 'sport' },
                ]}
              />
            </Form.Item>

            <Form.Item label="Game ID" name="gameId">
              <Input style={{ width: 400 }} />
            </Form.Item>

            <Form.Item label="Game code" name="gameCode">
              <Input style={{ width: 400 }} />
            </Form.Item>

            <Form.Item label="遊戲名稱" name="gameName">
              <Input style={{ width: 400 }} />
            </Form.Item>

            <Form.Item label="遊戲Logo" name="gameLogo">
              <div className="flex gap-2" style={{ width: 400 }}>
                <Input className="flex-1" />
                <Button>瀏覽</Button>
              </div>
            </Form.Item>

            <Form.Item label="RTP(%)" name="rtp">
              <Input style={{ width: 400 }} />
            </Form.Item>

            <Form.Item label="啟/停用" name="status">
              <Select
                style={{ width: 400 }}
                options={[
                  { label: '啟用', value: true },
                  { label: '停用', value: false },
                ]}
              />
            </Form.Item>

            <Form.Item label="備註" name="remark">
              <TextArea style={{ width: 400 }} autoSize={{ minRows: 3 }} />
            </Form.Item>
          </Form>
        </div>

        {/* ✅ Sticky Footer（跟其他頁面同款） */}
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
            className="h-10 w-32 border-green-500 bg-green-500 font-bold hover:!border-green-400 hover:!bg-green-400"
          >
            儲 存
          </Button>
        </div>
      </div>
    </div>
  )
}
