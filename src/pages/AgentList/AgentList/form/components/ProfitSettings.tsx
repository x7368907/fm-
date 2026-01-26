import { Card, Form, Select, Input } from 'antd'
import { useEffect, useMemo } from 'react'
import { useCommissionStore } from '../../../../../store/useCommissionStore'

export default function ProfitSettings() {
  const form = Form.useFormInstance()

  /** 監聽代理制度 */
  const agentSystem = Form.useWatch<'share' | 'water'>('agentSystem', form)

  const isShareSystem = agentSystem === 'share'
  const isWaterSystem = agentSystem === 'water'

  /** 從 Zustand 取得分潤方案 */
  const plans = useCommissionStore((s) => s.plans)
  const selectedPlanKey = Form.useWatch<string>('profitChoice', form)

  /** 依制度過濾分潤名稱選項 */
  const planOptions = useMemo(() => {
    if (!agentSystem) return []

    return plans.filter((p) => {
      const system =
        p.system === '佔成制'
          ? 'share'
          : p.system === '反水制'
            ? 'water'
            : undefined

      return system === agentSystem
    })
  }, [plans, agentSystem])

  /** 切換制度時，清空不合法欄位 */
  useEffect(() => {
    // 清空分潤名稱
    form.setFieldsValue({ profitChoice: undefined })

    if (isShareSystem) {
      // 佔成制：清空返水欄位
      form.setFieldsValue({
        rebateLive: 0,
        rebateSlot: 0,
        rebateSport: 0,
        rebateLottery: 0,
        rebateChess: 0,
        rebateFish: 0,
      })
    }

    if (isWaterSystem) {
      // 返水制：清空佔成比例
      form.setFieldsValue({
        profitRate: undefined,
      })
    }
  }, [agentSystem, isShareSystem, isWaterSystem, form])

  useEffect(() => {
    if (!selectedPlanKey) return
    if (!isShareSystem) return

    const selectedPlan = plans.find((p) => p.key === selectedPlanKey)
    if (!selectedPlan) return

    form.setFieldsValue({
      // 佔成比例
      profitRate: selectedPlan.shareRatio ?? 0,

      // 結算時機
      settlementTime:
        selectedPlan.settlement === '週結'
          ? 'weekly'
          : selectedPlan.settlement === '月結'
            ? 'monthly'
            : undefined,
    })
  }, [selectedPlanKey, isShareSystem, plans, form])

  useEffect(() => {
    if (!selectedPlanKey) return
    if (!isWaterSystem) return

    const selectedPlan = plans.find((p) => p.key === selectedPlanKey)
    if (!selectedPlan) return

    // ⭐ 反水制：帶入代理返水條件
    form.setFieldsValue({
      rebateLive: selectedPlan.rebateLive ?? 0,
      rebateSlot: selectedPlan.rebateElec ?? 0,
      rebateSport: selectedPlan.rebateSport ?? 0,
      rebateLottery: selectedPlan.rebateLottery ?? 0,
      rebateChess: selectedPlan.rebateChess ?? 0,
      rebateFish: selectedPlan.rebateFish ?? 0,

      // 結算時機一併帶入
      settlementTime:
        selectedPlan.settlement === '週結'
          ? 'weekly'
          : selectedPlan.settlement === '月結'
            ? 'monthly'
            : undefined,
    })
  }, [selectedPlanKey, isWaterSystem, plans, form])
  const formItemLayout = {
    labelCol: { span: 6 }, // 設定標籤寬度
    wrapperCol: { span: 14 }, // 設定欄位寬度
    labelAlign: 'left' as const, // 標籤靠左
    // [&>.ant-form-item-row] 代表選取這個元件直屬的子元素 .ant-form-item-row
    className: '[&>.ant-form-item-row]:flex [&>.ant-form-item-row]:flex-row',
  }
  return (
    <Card title="分潤條件設定" className="mb-4 shadow-sm">
      {/* 代理制度 */}
      <Form.Item
        label="代理制度"
        name="agentSystem"
        rules={[{ required: true, message: '請選擇代理制度' }]}
        {...formItemLayout}
      >
        <Select placeholder="請選擇">
          <Select.Option value="share">佔成制</Select.Option>
          <Select.Option value="water">返水制（總投注額回饋）</Select.Option>
        </Select>
      </Form.Item>

      {/* 分潤名稱（來自 Zustand） */}
      <Form.Item
        label="分潤名稱"
        name="profitChoice"
        rules={[{ required: true, message: '請選擇分潤方案' }]}
        {...formItemLayout}
      >
        <Select
          placeholder={agentSystem ? '請選擇分潤方案' : '請先選擇代理制度'}
          disabled={!agentSystem}
        >
          {planOptions.map((plan) => (
            <Select.Option key={plan.key} value={plan.key}>
              {plan.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* 分潤比例（返水制時禁用） */}
      <Form.Item label="分潤比例(%)" name="profitRate" {...formItemLayout}>
        <Input placeholder="0" suffix="%" disabled={isWaterSystem} />
      </Form.Item>

      {/* 代理反水條件 */}
      <Form.Item
        label="代理反水條件"
        style={{ marginBottom: 0 }}
        {...formItemLayout}
      >
        <div className="overflow-hidden rounded-md border text-center text-xs">
          {/* 表頭 */}
          <div className="grid grid-cols-6 bg-gray-200 py-2 font-bold">
            {['真人', '電子', '體育', '彩票', '棋牌', '捕魚'].map((label) => (
              <div key={label}>
                {label}
                <br />
                (%)
              </div>
            ))}
          </div>

          {/* 欄位 */}
          <div className="grid grid-cols-6 bg-white">
            <Form.Item name="rebateLive" noStyle>
              <Input
                disabled={isShareSystem}
                className="w-full border-r p-2 text-center"
              />
            </Form.Item>
            <Form.Item name="rebateSlot" noStyle>
              <Input
                disabled={isShareSystem}
                className="w-full border-r p-2 text-center"
              />
            </Form.Item>
            <Form.Item name="rebateSport" noStyle>
              <Input
                disabled={isShareSystem}
                className="w-full border-r p-2 text-center"
              />
            </Form.Item>
            <Form.Item name="rebateLottery" noStyle>
              <Input
                disabled={isShareSystem}
                className="w-full border-r p-2 text-center"
              />
            </Form.Item>
            <Form.Item name="rebateChess" noStyle>
              <Input
                disabled={isShareSystem}
                className="w-full border-r p-2 text-center"
              />
            </Form.Item>
            <Form.Item name="rebateFish" noStyle>
              <Input
                disabled={isShareSystem}
                className="w-full p-2 text-center"
              />
            </Form.Item>
          </div>
        </div>

        {isShareSystem && (
          <div className="mt-1 text-xs text-gray-400">
            佔成制不適用代理返水條件
          </div>
        )}
      </Form.Item>

      {/* 結算時機 */}
      <Form.Item
        label="分潤結算時機"
        name="settlementTime"
        rules={[{ required: true, message: '請選擇結算時機' }]}
        {...formItemLayout}
        className={`${formItemLayout.className ?? ''} mt-4`}
      >
        <Select placeholder="請選擇">
          <Select.Option value="weekly">週結(每週日-23:59:59)</Select.Option>
          <Select.Option value="monthly">
            月結(每月最後一天-23:59:59)
          </Select.Option>
        </Select>
      </Form.Item>
    </Card>
  )
}
