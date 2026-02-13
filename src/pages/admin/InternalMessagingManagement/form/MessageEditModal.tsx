import { useEffect } from 'react'
import { Modal, Form, Input, Select, Button, Divider } from 'antd'

export default function MessageEditModal({
  open,
  onCancel,
  onSave,
  initialValues,
}: any) {
  const [form] = Form.useForm()
  useEffect(() => {
    if (open) form.setFieldsValue(initialValues || {})
  }, [open, initialValues, form])

  return (
    <Modal
      title="編輯訊息"
      open={open}
      onCancel={onCancel}
      onOk={() => onSave(form.getFieldsValue())}
      width={800}
      okText="儲存"
      cancelText="取消"
      bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
    >
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 19 }}
        labelAlign="left"
      >
        {/* 手機編輯區塊 */}
        <div className="mb-4">
          <Button
            size="small"
            className="mb-4 border-purple-600 text-purple-600"
          >
            手機編輯
          </Button>
          <Form.Item label="手機訊息主旨" name="smsSubject">
            <Input placeholder="請輸入" />
          </Form.Item>
          <Form.Item label="寄送對象" name="smsTarget" initialValue="全部">
            <Select options={[{ label: '全部', value: '全部' }]} />
          </Form.Item>
          <Form.Item
            label="寄送類型"
            name="smsType"
            initialValue="VIP1升級獎勵"
          >
            <Select
              options={[{ label: 'VIP1升級獎勵', value: 'VIP1升級獎勵' }]}
            />
          </Form.Item>
          <Form.Item label="簡訊內容" name="smsContent">
            <div className="relative">
              <Input.TextArea rows={5} placeholder="請輸入內容" />
              <div className="mt-1 text-right text-gray-400">
                內容 0 字 / 2點
              </div>
            </div>
          </Form.Item>
        </div>

        <Divider className="my-6" />

        {/* 站內信編輯區塊 */}
        <div>
          <Button
            size="small"
            className="mb-4 border-purple-600 text-purple-600"
          >
            站內信編輯
          </Button>
          <Form.Item label="信件訊息主旨" name="mailSubject">
            <Input placeholder="請輸入" />
          </Form.Item>
          <Form.Item label="寄送對象" name="mailTarget" initialValue="全部">
            <Select options={[{ label: '全部', value: '全部' }]} />
          </Form.Item>
          <Form.Item label="寄送類型" name="mailType" initialValue="真人">
            <Select options={[{ label: '真人', value: '真人' }]} />
          </Form.Item>
          <Form.Item label="信件內容" name="mailContent">
            <Input.TextArea rows={5} placeholder="請輸入內容" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}
