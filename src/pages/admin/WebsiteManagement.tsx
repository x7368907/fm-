import { useState } from 'react'
import { Form, Input, Button, Breadcrumb, Upload, Radio, message } from 'antd'
import {
  SaveOutlined,
  CloseOutlined,
  PlusOutlined,
  PictureOutlined,
} from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'

const WebsiteManagement = () => {
  const [form] = Form.useForm()

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'logo.png',
      status: 'done',
      url: 'https://via.placeholder.com/150x100/1890ff/ffffff?text=LOGO',
    },
  ])

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  const layoutOptions = [
    { label: '版型A', value: 'A', color: '#0088cc' },
    { label: '版型B', value: 'B', color: '#00aadd' },
    { label: '版型C', value: 'C', color: '#00ccff' },
  ]

  const onFinish = (values: any) => {
    console.log('Success:', values)
    message.success('儲存成功')
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上傳</div>
    </div>
  )

  return (
    <div className="space-y-4 bg-gray-100 p-4">
      {/* ===== Breadcrumb ===== */}
      <Breadcrumb separator=">" className="mb-2">
        <Breadcrumb.Item>後台管理</Breadcrumb.Item>
        <Breadcrumb.Item>網站設定</Breadcrumb.Item>
      </Breadcrumb>

      {/* ===== 外層卡片（sticky 以這層為基準） ===== */}
      <div className="relative rounded-lg bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-base font-bold text-gray-800">基本設定</h2>
        </div>

        {/* ===== 表單內容（預留 footer 高度） ===== */}
        <div className="p-6 pb-32">
          <Form
            form={form}
            layout="horizontal"
            onFinish={onFinish}
            labelAlign="left"
            labelCol={{ flex: '150px' }}
            wrapperCol={{ flex: 1 }}
            className="max-w-5xl"
            initialValues={{
              platformId: 'FM_01',
              platformStation: 'Production',
              platformName: 'FM富馬娛樂城',
              platformUrl: 'https://seo01.fuma888.com/',
              lineId: 'test1234',
              tgId: 'test1234',
              email: 'test123@xxxx.com',
              layoutType: 'A',
            }}
          >
            <Form.Item label="平台ID" name="platformId">
              <Input
                disabled
                className="cursor-default bg-gray-200 text-gray-600"
              />
            </Form.Item>

            <Form.Item label="平台站別" name="platformStation">
              <Input
                disabled
                className="cursor-default bg-gray-200 text-gray-600"
              />
            </Form.Item>

            <Form.Item label="平台名稱" name="platformName">
              <Input />
            </Form.Item>

            <Form.Item label="平台網址" name="platformUrl">
              <Input />
            </Form.Item>

            <Form.Item label="官方賴" name="lineId">
              <Input />
            </Form.Item>

            <Form.Item label="官方TG" name="tgId">
              <Input />
            </Form.Item>

            <Form.Item label="官方信箱" name="email">
              <Input />
            </Form.Item>

            <Form.Item label="平台Logo" name="logo">
              <div className="flex flex-col">
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleChange}
                  maxCount={1}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <div className="mt-1">
                  <Button
                    size="small"
                    className="border-blue-500 px-4 text-xs text-blue-500"
                  >
                    上傳
                  </Button>
                </div>
              </div>
            </Form.Item>

            <Form.Item label="平台版型選擇" name="layoutType">
              <Radio.Group className="w-full">
                <div className="flex flex-wrap gap-6">
                  {layoutOptions.map((option) => (
                    <Radio
                      key={option.value}
                      value={option.value}
                      className="mr-0"
                    >
                      <div className="group flex flex-col items-center">
                        <div className="relative h-[120px] w-[200px] overflow-hidden rounded-md border-2 border-gray-200 bg-gray-100 transition-colors group-hover:border-blue-400">
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                            <PictureOutlined
                              style={{ fontSize: '48px', color: option.color }}
                            />
                          </div>
                        </div>
                        <span className="mt-2 font-bold text-gray-700">
                          {option.label}
                        </span>
                      </div>
                    </Radio>
                  ))}
                </div>
              </Radio.Group>
            </Form.Item>
          </Form>
        </div>

        {/* ===== Sticky Footer（統一樣式） ===== */}
        <div className="sticky bottom-0 z-10 flex justify-center gap-4 border-t border-gray-200 bg-white py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <Button
            icon={<CloseOutlined />}
            onClick={() => form.resetFields()}
            className="h-10 w-32 border-red-500 font-bold text-red-500 hover:!border-red-400 hover:bg-red-50 hover:!text-red-400"
          >
            取 消
          </Button>
          <Button
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

export default WebsiteManagement
