// 新增/編輯分潤表單元件
import { useEffect } from 'react'
import { Button, Select, Input, Form, InputNumber } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'

// 為了方便，這裡再次定義資料介面 (正式專案建議開一個 types.ts 檔)
interface CommissionData {
  key: string
  system: string
  name: string
  agentLevel: string
  agentName: string
  shareRatio: number
  rebateLive: number
  rebateElec: number
  rebateSport: number
  rebateLottery: number
  rebateChess: number
  rebateFish: number
  settlement: string
}

// 修改 Props：增加 initialValues
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
  const [form] = Form.useForm()

  // 關鍵邏輯：當元件載入或 initialValues 改變時，回填表單
  useEffect(() => {
    if (initialValues) {
      // --- 編輯模式：回填資料 ---
      form.setFieldsValue({
        system: initialValues.system === '佔成制' ? 'share' : 'rebate', // 模擬資料轉換
        name: initialValues.name,
        level: 'all', // 模擬資料
        agentName: 'all', // 模擬資料
        ratio: initialValues.shareRatio,
        settlement: initialValues.settlement === '週結' ? 'week' : 'month',
        // 特殊處理：將扁平的資料轉為 nested object 給表單
        rebate: {
          live: initialValues.rebateLive,
          elec: initialValues.rebateElec,
          sport: initialValues.rebateSport,
          lottery: initialValues.rebateLottery,
          chess: initialValues.rebateChess,
          fish: initialValues.rebateFish,
        },
      })
    } else {
      // --- 新增模式：重置表單 ---
      form.resetFields()
    }
  }, [initialValues, form])

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(initialValues ? 'Updating:' : 'Creating:', values)
        onSuccess()
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  // 判斷標題文字
  const title = initialValues ? '編輯分潤' : '新增分潤'

  return (
    <div className="rounded-lg bg-white shadow-sm">
      {/* 標題區塊 */}
      <div className="border-b border-gray-200 bg-gray-50 p-4">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      </div>

      <div className="p-8">
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-700">分潤條件設定</h3>
          <div className="mt-2 h-[1px] w-full bg-gray-200"></div>
        </div>

        <Form form={form} layout="vertical" className="max-w-4xl">
          {/* 1. 代理制度 */}
          <Form.Item label="代理制度" name="system" initialValue="share">
            <Select>
              <Select.Option value="share">佔成制</Select.Option>
              <Select.Option value="rebate">反水制</Select.Option>
            </Select>
          </Form.Item>

          {/* 2. 分潤名稱 */}
          <Form.Item
            label="分潤名稱"
            name="name"
            rules={[{ required: true, message: '請輸入分潤名稱' }]}
          >
            <Input placeholder="請輸入" />
          </Form.Item>

          {/* 3. 代理級別選擇 */}
          <Form.Item label="代理級別選擇" name="level">
            <Select placeholder="請選擇">
              <Select.Option value="all">任一層級</Select.Option>
            </Select>
          </Form.Item>

          {/* 4. 代理名稱選擇 */}
          <Form.Item label="代理名稱選擇" name="agentName">
            <Select placeholder="請選擇">
              <Select.Option value="all">任一代理</Select.Option>
            </Select>
          </Form.Item>

          {/* 5. 代理佔成比例 */}
          <Form.Item label="代理佔成比例(%)" name="ratio">
            <Input placeholder="請輸入" suffix="%" />
          </Form.Item>

          {/* 6. 代理反水條件 */}
          <Form.Item label="代理反水條件">
            <div className="overflow-hidden rounded border border-gray-300">
              <div className="grid grid-cols-6 divide-x divide-gray-300 bg-gray-200 text-center text-xs font-bold text-gray-700">
                <div className="p-2">
                  真人
                  <br />
                  (%)
                </div>
                <div className="p-2">
                  電子
                  <br />
                  (%)
                </div>
                <div className="p-2">
                  體育
                  <br />
                  (%)
                </div>
                <div className="p-2">
                  彩票
                  <br />
                  (%)
                </div>
                <div className="p-2">
                  棋牌
                  <br />
                  (%)
                </div>
                <div className="p-2">
                  捕魚
                  <br />
                  (%)
                </div>
              </div>
              <div className="grid grid-cols-6 divide-x divide-gray-300 bg-white">
                {['live', 'elec', 'sport', 'lottery', 'chess', 'fish'].map(
                  (item) => (
                    <div key={item} className="p-1">
                      <Form.Item name={['rebate', item]} noStyle>
                        <InputNumber
                          min={0}
                          max={100}
                          className="w-full text-center"
                          bordered={false}
                          placeholder="0"
                        />
                      </Form.Item>
                    </div>
                  )
                )}
              </div>
            </div>
          </Form.Item>

          {/* 7. 代理分潤結算 */}
          <Form.Item label="代理分潤結算" name="settlement">
            <Select placeholder="請選擇">
              <Select.Option value="week">週結</Select.Option>
              <Select.Option value="month">月結</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </div>

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
          onClick={handleSave}
        >
          儲存
        </Button>
      </div>
    </div>
  )
}
