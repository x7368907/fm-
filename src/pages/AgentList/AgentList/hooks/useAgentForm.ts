import { useEffect } from 'react'
import { Form } from 'antd'
import type { DataType } from '../types'

interface UseAgentFormProps {
  initialValues?: DataType | null
  onSuccess: () => void
}

export const useAgentForm = ({
  initialValues,
  onSuccess,
}: UseAgentFormProps) => {
  const [form] = Form.useForm()
  const isEditMode = !!initialValues

  useEffect(() => {
    if (!isEditMode || !initialValues) {
      form.resetFields()
      return
    }

    form.setFieldsValue({
      /* ========= 基本資料 ========= */
      agentName: initialValues.name,
      account: initialValues.account,
      realName: initialValues.realName,
      status: initialValues.status === '啟用' ? 'active' : 'disabled',

      /* ========= 分潤制度（⭐關鍵） ========= */
      agentSystem: initialValues.profitSystem === '佔成制' ? 'share' : 'water',

      /* 分潤方案 */
      profitChoice: initialValues.key,

      /* ========= 佔成制 ========= */
      profitRate: initialValues.profitRate,

      /* ========= 反水制 ========= */
      rebateLive: initialValues.liveRate,
      rebateElec: initialValues.slotRate,
      rebateSport: initialValues.sportRate,
      rebateLottery: initialValues.lotteryRate,
      rebateChess: initialValues.chessRate,
      rebateFish: initialValues.fishRate,

      /* ========= 結算 ========= */
      settlementTime:
        initialValues.settlement === '月結' ? 'monthly' : 'weekly',
    })
  }, [initialValues, isEditMode, form])

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Form Submit:', values)
        // TODO: 呼叫 API
        onSuccess()
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  return { form, isEditMode, handleSubmit }
}
