import { useEffect, useState } from 'react'
import {
  Breadcrumb,
  Select,
  Button,
  Input,
  Form,
  Card,
  Divider,
  TimePicker,
  Radio,
  Space,
} from 'antd'
import { CloseOutlined, SaveOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const { TextArea } = Input

interface Props {
  onCancel: () => void
  onSave: (values: any) => void
  initialValues?: any
}

export default function GameVendorCreate({
  onCancel,
  onSave,
  initialValues,
}: Props) {
  const [form] = Form.useForm()

  const [startUnfixed, setStartUnfixed] = useState(false)
  const [endUnfixed, setEndUnfixed] = useState(false)

  const isEdit = !!initialValues

  useEffect(() => {
    if (initialValues) {
      const formattedValues = {
        ...initialValues,
        startTime: initialValues.startTime
          ? dayjs(initialValues.startTime, 'HH:mm')
          : null,
        endTime: initialValues.endTime
          ? dayjs(initialValues.endTime, 'HH:mm')
          : null,
      }
      form.setFieldsValue(formattedValues)
    } else {
      form.resetFields()
      form.setFieldsValue({
        gameType: 'live',
        status: 'on',
        frequency: 'monthly_1st_mon',
      })
    }
  }, [initialValues, form])

  const handleFinish = (values: any) => {
    const submitData = {
      ...values,
      startTime: values.startTime ? values.startTime.format('HH:mm') : '',
      endTime: values.endTime ? values.endTime.format('HH:mm') : '',
    }
    onSave(submitData)
  }

  return (
    // ⭐ 外層一定要 flex + min-h-screen
    <div className="flex min-h-screen flex-col bg-gray-50 p-4">
      {/* ===== Breadcrumb ===== */}
      <Breadcrumb separator=">" className="mb-2">
        <Breadcrumb.Item>遊戲商管理</Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer hover:text-teal-600"
          onClick={onCancel}
        >
          遊戲商維修管理
        </Breadcrumb.Item>
        <Breadcrumb.Item className="font-bold text-gray-800">
          {isEdit ? '編輯遊戲商' : '新增遊戲商'}
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* ===== 主 Card ===== */}
      <Card
        className="flex flex-1 flex-col border border-gray-200 shadow-sm"
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        {/* Header */}
        <div className="border-b border-gray-200 bg-gray-100 px-6 py-3">
          <h2 className="mb-0 text-base font-bold text-gray-700">
            {isEdit ? '編輯遊戲商' : '新增遊戲商'}
          </h2>
        </div>

        {/* ===== 可捲動內容區 ===== */}
        <div className="flex-1 overflow-y-auto p-8 pb-32">
          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
            labelAlign="left"
            colon={false}
            onFinish={handleFinish}
          >
            {/* 區塊標題 */}
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-bold text-gray-700">
                遊戲商設定
              </h3>
              <Divider className="my-0" />
            </div>

            <Form.Item label="遊戲類型" name="gameType" className="mb-5">
              <Select
                style={{ width: 400 }}
                options={[
                  { label: '真人', value: 'live' },
                  { label: '電子', value: 'electronic' },
                  { label: '體育', value: 'sport' },
                  { label: '彩票', value: 'lottery' },
                  { label: '棋牌', value: 'board' },
                  { label: '捕魚', value: 'fish' },
                ]}
              />
            </Form.Item>

            <Form.Item label="遊戲商名稱" name="vendorName" className="mb-5">
              <Input style={{ width: 400 }} placeholder="請輸入" />
            </Form.Item>

            <Form.Item
              label="遊戲商Logo(開放)"
              name="logoOpen"
              className="mb-5"
            >
              <div className="flex gap-2" style={{ width: 400 }}>
                <Input className="flex-1" />
                <Button>瀏覽</Button>
              </div>
            </Form.Item>

            <Form.Item
              label="遊戲商Logo(維護)"
              name="logoMaintain"
              className="mb-5"
            >
              <div className="flex gap-2" style={{ width: 400 }}>
                <Input className="flex-1" />
                <Button>瀏覽</Button>
              </div>
            </Form.Item>

            <Form.Item label="維護頻率" name="frequency" className="mb-5">
              <Select
                style={{ width: 400 }}
                options={[
                  { label: '每週星期一', value: 'weekly_mon' },
                  {
                    label: '每月第一個星期一(遇國定假日順延)',
                    value: 'monthly_1st_mon',
                  },
                  { label: '不定期', value: 'none' },
                ]}
              />
            </Form.Item>

            {/* 維修時間（起） */}
            <Form.Item label="維修時間(起)" style={{ marginBottom: 0 }}>
              <Space direction="vertical" size={2}>
                <Form.Item name="startTime" noStyle>
                  <TimePicker
                    style={{ width: 400 }}
                    format="HH:mm"
                    disabled={startUnfixed}
                  />
                </Form.Item>
                <Radio
                  checked={startUnfixed}
                  onChange={(e) => setStartUnfixed(e.target.checked)}
                >
                  不定期
                </Radio>
              </Space>
            </Form.Item>

            {/* 維修時間（迄） */}
            <Form.Item label="維修時間(迄)" style={{ marginBottom: 0 }}>
              <Space direction="vertical" size={2}>
                <Form.Item name="endTime" noStyle>
                  <TimePicker
                    style={{ width: 400 }}
                    format="HH:mm"
                    disabled={endUnfixed}
                  />
                </Form.Item>
                <Radio
                  checked={endUnfixed}
                  onChange={(e) => setEndUnfixed(e.target.checked)}
                >
                  不定期
                </Radio>
              </Space>
            </Form.Item>

            <Form.Item label="狀態" name="status" className="mb-5">
              <Select
                style={{ width: 400 }}
                options={[
                  { label: '啟用', value: 'on' },
                  { label: '停用', value: 'off' },
                ]}
              />
            </Form.Item>

            <Form.Item label="備註" name="remark" className="mb-5">
              <TextArea
                style={{ width: 400 }}
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
          </Form>
        </div>

        {/* ===== Sticky Footer ===== */}
        <div className="sticky bottom-0 z-10 flex justify-center gap-4 border-t border-gray-200 bg-white py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <Button
            size="large"
            icon={<CloseOutlined />}
            onClick={onCancel}
            className="h-10 w-32 border-red-500 font-bold text-red-500 hover:bg-red-50"
          >
            取 消
          </Button>
          <Button
            size="large"
            type="primary"
            icon={<SaveOutlined />}
            onClick={() => form.submit()}
            className="h-10 w-32 bg-green-500 font-bold hover:bg-green-600"
          >
            儲 存
          </Button>
        </div>
      </Card>
    </div>
  )
}
