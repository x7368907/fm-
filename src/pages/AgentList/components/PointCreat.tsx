import { useEffect, useState } from 'react'
import { Form, Input, Select, Button, Checkbox, Tag, InputNumber } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

const { Option } = Select
const { TextArea } = Input

// 定義表單資料介面
export interface PointsFormData {
  id?: string
  type: string
  rewardType?: string
  points?: number
  turnoverMultiple?: number
  requiredTurnover?: number
  remarks?: string
  issuerId?: string
  receiverIds?: string[]
}

interface PointsCreateProps {
  onCancel: () => void
  onSave: (values: any) => void
  initialValues?: PointsFormData | null
}

// 模擬資料
const MOCK_LEVELS = [
  { id: '1', name: '1級總代理', count: 38 },
  { id: '2', name: '2級代理', count: 53 },
  { id: '3', name: '3級代理', count: 88 },
  { id: '4', name: '4級代理', count: 104 },
  { id: '5', name: '5級代理', count: 2352 },
]

const MOCK_ISSUERS = [
  {
    id: 'A01',
    name: 'FMCA01 (金流/成數代理-主站)',
    count: 11,
    balance: '12,458,752',
  },
  {
    id: 'A02',
    name: 'FMCA02 (金流/成數代理-主站)',
    count: 4,
    balance: '9,651,235',
  },
  {
    id: 'A03',
    name: 'FMCA03 (金流/成數代理-主站)',
    count: 6,
    balance: '59,875,632',
  },
  {
    id: 'A04',
    name: 'W01 總站 (信用/成數+返水代理-外單位)',
    count: 7,
    balance: '658,963,651',
  },
]

const MOCK_RECEIVERS = [
  { id: 'B01', name: 'FMCA2 (主站-股東)', count: 3, balance: '562,354' },
  {
    id: 'B02',
    name: 'abv (金流/成數代理-總公司廣告條【一】)abv',
    count: 2,
    balance: '1,123,421',
  },
  {
    id: 'B03',
    name: 'aa888 CA01 (金流/成數代理-旺喔-CA01)aa888',
    count: 3,
    balance: '8,569,898',
  },
  {
    id: 'B04',
    name: 'ca2 CA02 (金流/成數代理-阿罩-CA02)ca2',
    count: 1,
    balance: '56,985,666',
  },
  {
    id: 'B05',
    name: 'TD01 CA04(金流/成數代理-天狗-CA04)TD01',
    count: 2,
    balance: '9,563,251',
  },
]

export default function PointsCreate({
  onCancel,
  onSave,
  initialValues,
}: PointsCreateProps) {
  const [form] = Form.useForm()

  // 判斷目前是「新增」還是「編輯」模式
  const isEditMode = !!initialValues
  const pageTitle = isEditMode ? '編輯加扣點' : '新增加扣點'

  // 選擇器狀態
  const [selectedLevel, setSelectedLevel] = useState('1')
  const [selectedIssuer, setSelectedIssuer] = useState<string | null>(null)
  const [selectedReceivers, setSelectedReceivers] = useState<string[]>([])

  // 計算全選狀態相關變數
  const totalReceivers = MOCK_RECEIVERS.length
  const selectedCount = selectedReceivers.length
  const isAllSelected = totalReceivers > 0 && selectedCount === totalReceivers
  const isIndeterminate = selectedCount > 0 && selectedCount < totalReceivers

  // 資料回填邏輯
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
      if (initialValues.issuerId) setSelectedIssuer(initialValues.issuerId)
      if (initialValues.receiverIds)
        setSelectedReceivers(initialValues.receiverIds)
    } else {
      form.resetFields()
      setSelectedIssuer(null)
      setSelectedReceivers([])
    }
  }, [initialValues, form])

  const handleFinish = (values: any) => {
    const submitData = {
      ...values,
      issuerId: selectedIssuer,
      receiverIds: selectedReceivers,
    }
    onSave(submitData)
  }

  // 單選處理
  const handleReceiverChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedReceivers((prev) => [...prev, id])
    } else {
      setSelectedReceivers((prev) => prev.filter((r) => r !== id))
    }
  }

  // 全選處理
  const handleSelectAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const allIds = MOCK_RECEIVERS.map((r) => r.id)
      setSelectedReceivers(allIds)
    } else {
      setSelectedReceivers([])
    }
  }

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* 頂部標題區 - 使用動態標題變數 */}
      <div className="mb-6 border-b border-gray-200 bg-gray-100 p-4">
        <div className="mb-1 text-sm text-gray-500">
          營運商管理 &gt; 點數加扣點紀錄 &gt;{' '}
          <span className="font-bold text-black">{pageTitle}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800">{pageTitle}</h2>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <h3 className="mb-4 border-b pb-2 text-lg font-semibold">加扣點操作</h3>

        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 22 }}
          onFinish={handleFinish}
          initialValues={{
            actionType: 'add',
            rewardType: 'gift',
          }}
        >
          {/* 1. 加點/扣點 */}
          <Form.Item
            label="加點 / 扣點"
            name="actionType"
            className="font-bold"
          >
            <Select style={{ width: 200 }}>
              <Option value="add">加點</Option>
              <Option value="deduct">扣點</Option>
            </Select>
          </Form.Item>

          {/* 2. 帳戶餘額 (三欄選擇器) */}
          <Form.Item label="帳戶餘額" required>
            <div className="flex h-[400px] overflow-hidden rounded border border-gray-300">
              {/* 左側：代理級別 */}
              <div className="flex w-1/4 flex-col border-r border-gray-300 bg-gray-50">
                <div className="border-b border-gray-300 bg-gray-200 p-2 text-center text-xs font-bold text-gray-700">
                  代理級別
                </div>
                <div className="flex-1 overflow-y-auto">
                  {MOCK_LEVELS.map((lvl) => (
                    <div
                      key={lvl.id}
                      onClick={() => setSelectedLevel(lvl.id)}
                      className={`flex cursor-pointer items-center justify-between border-b border-gray-100 px-4 py-3 text-sm transition-colors ${
                        selectedLevel === lvl.id
                          ? 'border-l-4 border-l-teal-600 bg-white font-bold text-teal-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{lvl.name}</span>
                      <Tag color="orange" className="mr-0">
                        {lvl.count}
                      </Tag>
                    </div>
                  ))}
                </div>
              </div>

              {/* 中間：發放點數 */}
              <div className="flex w-2/5 flex-col border-r border-gray-300">
                <div className="border-b border-gray-300 bg-gray-200 p-2 text-center text-xs font-bold text-gray-700">
                  發放點數
                </div>
                <div className="border-b border-gray-200 p-2">
                  <Input
                    prefix={<SearchOutlined className="text-gray-400" />}
                    placeholder="請輸入代理名稱"
                    size="small"
                  />
                </div>
                <div className="flex justify-between border-b bg-gray-50 px-3 py-1 text-xs text-gray-500">
                  <span>名稱</span>
                  <span>帳戶餘額</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {MOCK_ISSUERS.map((issuer) => (
                    <div
                      key={issuer.id}
                      onClick={() => setSelectedIssuer(issuer.id)}
                      className={`flex cursor-pointer items-center justify-between border-b border-gray-100 px-3 py-3 text-sm transition-colors ${
                        selectedIssuer === issuer.id
                          ? 'bg-orange-50'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <span
                          className={`truncate ${selectedIssuer === issuer.id ? 'font-bold text-orange-600' : 'text-gray-700'}`}
                        >
                          {issuer.name}
                        </span>
                        <Tag
                          color="orange"
                          className="mr-0 origin-left scale-75"
                        >
                          {issuer.count}
                        </Tag>
                      </div>
                      <span className="font-mono text-gray-600">
                        {issuer.balance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 右側：接收點數 (全選功能區) */}
              <div className="flex w-2/5 flex-col bg-white">
                <div className="border-b border-gray-300 bg-gray-200 p-2 text-center text-xs font-bold text-gray-700">
                  接收點數
                </div>

                <div className="space-y-2 border-b border-gray-200 p-2">
                  <Input
                    prefix={<SearchOutlined className="text-gray-400" />}
                    placeholder="請輸入代理名稱"
                    size="small"
                  />
                  <div className="text-xs font-bold text-gray-700">
                    1級總代理 &gt; 2級代理(8)
                  </div>
                </div>

                <div className="flex items-center justify-between border-b bg-gray-50 px-3 py-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      onChange={handleSelectAllChange}
                      checked={isAllSelected}
                      indeterminate={isIndeterminate}
                    />
                    <span className="font-bold text-gray-600">
                      ({selectedCount}/{totalReceivers})
                    </span>
                    <span className="ml-1 font-bold text-gray-600">名稱</span>
                  </div>
                  <span className="font-bold text-gray-600">帳戶餘額</span>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {MOCK_RECEIVERS.map((receiver) => (
                    <div
                      key={receiver.id}
                      className="flex items-center justify-between border-b border-gray-100 px-3 py-3 text-sm hover:bg-gray-50"
                    >
                      <div className="flex flex-1 items-center gap-2 truncate pr-2">
                        <Checkbox
                          checked={selectedReceivers.includes(receiver.id)}
                          onChange={(e) =>
                            handleReceiverChange(receiver.id, e.target.checked)
                          }
                        />
                        <span
                          className="truncate text-gray-700"
                          title={receiver.name}
                        >
                          {receiver.name}
                        </span>
                        <Tag
                          color="orange"
                          className="mr-0 origin-left scale-75"
                        >
                          {receiver.count}
                        </Tag>
                      </div>
                      <span className="font-mono text-gray-600">
                        {receiver.balance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Form.Item>

          <Form.Item label="獎勵類型" name="rewardType">
            <Select style={{ width: 200 }} placeholder="請選擇">
              <Option value="gift">贈點</Option>
              <Option value="manual">手動補點</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="點數"
            name="points"
            rules={[{ required: true, message: '請輸入點數' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="請輸入"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>

          <Form.Item label="流水倍數" name="turnoverMultiple">
            <InputNumber style={{ width: '100%' }} placeholder="請輸入" />
          </Form.Item>

          <Form.Item label="必須流水" name="requiredTurnover">
            <InputNumber style={{ width: '100%' }} placeholder="請輸入" />
          </Form.Item>

          <Form.Item label="備註" name="remarks">
            <TextArea rows={4} />
          </Form.Item>

          <div className="mt-8 flex justify-center gap-4 pb-8">
            <Button
              size="large"
              className="w-32 border-red-500 font-bold text-red-500 hover:border-red-600 hover:text-red-600"
              onClick={onCancel}
            >
              × 取消
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-32 border-green-600 bg-green-600 font-bold hover:bg-green-500"
              icon={<span className="text-lg">💾</span>}
            >
              儲存
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
