import { useEffect, useCallback } from 'react'
import { Breadcrumb, Button, Form, Input, Checkbox } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

// ==========================================
// 1. 定義資料型別
// ==========================================
export interface GroupDataType {
  key?: string
  groupId: string
  groupName: string
  permissions?: Record<string, string[]>
}

interface GroupCreateProps {
  onCancel: () => void
  onSave: (values: GroupDataType) => void
  initialValues?: GroupDataType | null
}

// ==========================================
// 2. 完整權限配置表 (包含先前補齊的所有欄位)
// ==========================================
const PERMISSION_CONFIG = [
  {
    category: '代理管理',
    items: [
      {
        key: 'agent_class',
        label: '分類管理',
        options: ['檢視 / 經手人', '新增 / 修改'],
      },
      {
        key: 'agent_data',
        label: '代理資料',
        options: ['檢視 / 經手人', '新增', '審核'],
      },
      {
        key: 'agent_points',
        label: '點數加扣點紀錄',
        options: ['檢視 / 經手人', '新增'],
      },
      {
        key: 'agent_line',
        label: '代理換線紀錄',
        options: ['檢視 / 經手人', '新增'],
      },
      {
        key: 'agent_split',
        label: '代理分潤管理',
        options: ['檢視 / 經手人', '審核'],
      },
    ],
  },
  {
    category: '會員管理',
    items: [
      {
        key: 'member_data',
        label: '會員資料',
        options: ['檢視 / 經手人', '新增 / 修改'],
      },
      {
        key: 'member_bank',
        label: '會員銀行卡',
        options: ['檢視 / 經手人', '審核'],
      },
      {
        key: 'member_promo',
        label: '會員優惠申請',
        options: ['檢視 / 經手人', '新增 / 修改'],
      },
      {
        key: 'member_return',
        label: '會員返水申請',
        options: ['檢視 / 經手人', '審核'],
      },
      {
        key: 'member_level',
        label: '會員特權管理',
        options: ['檢視 / 經手人', '編輯'],
      },
      {
        key: 'member_login',
        label: '會員登入管理',
        options: ['檢視 / 經手人', '新增 / 編輯'],
      },
      {
        key: 'member_line_change',
        label: '會員換線管理',
        options: ['檢視 / 經手人', '新增'],
      },
      {
        key: 'member_wallet_log',
        label: '會員錢包紀錄',
        options: ['檢視 / 經手人'],
      },
    ],
  },
  {
    category: '營運管理',
    items: [
      {
        key: 'op_flow',
        label: '時程管理',
        options: ['檢視 / 經手人', '新增 / 修改'],
      },
      {
        key: 'op_promo',
        label: '優惠管理',
        options: ['檢視 / 經手人', '新增 / 修改'],
      },
      {
        key: 'op_announce',
        label: '活動公告管理',
        options: ['檢視 / 經手人', '新增 / 編輯'],
      },
    ],
  },
  {
    category: '財務管理',
    items: [
      {
        key: 'fin_report',
        label: '整合報表',
        options: [
          '公司 - 檢視 / 經手人',
          '代理 - 檢視 / 經手人',
          '會員 - 檢視 / 經手人',
          '下注類別 - 檢視 / 經手人',
        ],
      },
      {
        key: 'fin_cashflow',
        label: '金流串接設定',
        options: ['檢視 / 經手人', '新增 / 修改'],
      },
      {
        key: 'fin_group',
        label: '金流群組管理',
        options: ['檢視 / 經手人', '新增 / 編輯'],
      },
      {
        key: 'fin_deposit',
        label: '儲值申請管理',
        options: ['檢視 / 經手人', '審核'],
      },
      {
        key: 'fin_withdraw',
        label: '託售申請管理',
        options: ['檢視 / 經手人', '審核'],
      },
      {
        key: 'fin_game_pay_setting',
        label: '遊戲上繳設定',
        options: ['檢視 / 經手人', '新增 / 編輯'],
      },
      {
        key: 'fin_game_pay_manage',
        label: '遊戲上繳管理',
        options: ['檢視 / 經手人', '新增 / 編輯'],
      },
      {
        key: 'fin_game_stats',
        label: '遊戲統計紀錄',
        options: ['檢視 / 經手人', '新增 / 編輯'],
      },
    ],
  },
  {
    category: '遊戲商管理',
    items: [
      {
        key: 'game_list',
        label: '遊戲商管理',
        options: ['檢視 / 經手人', '新增 / 修改'],
      },
      {
        key: 'game_rebate',
        label: '遊戲限紅設定',
        options: ['檢視 / 經手人', '新增 / 修改'],
      },
      { key: 'game_bet_real', label: '真人下注報表', options: ['檢視'] },
      { key: 'game_bet_elec', label: '電子下注報表', options: ['檢視'] },
      { key: 'game_bet_sport', label: '體育下注報表', options: ['檢視'] },
      { key: 'game_bet_lotto', label: '彩票下注報表', options: ['檢視'] },
      { key: 'game_bet_card', label: '棋牌下注報表', options: ['檢視'] },
      { key: 'game_bet_fish', label: '捕魚下注報表', options: ['檢視'] },
    ],
  },
  {
    category: '後台管理',
    items: [
      {
        key: 'sys_setting',
        label: '網站設定',
        options: ['檢視 / 經手人', '新增 / 修改'],
      },
      {
        key: 'sys_group',
        label: '群組管理',
        options: ['檢視 / 經手人', '新增 / 修改'],
      },
      {
        key: 'sys_user',
        label: '人員管理',
        options: ['檢視 / 經手人', '新增 / 修改'],
      },
      {
        key: 'sys_log',
        label: '站內信管理',
        options: ['檢視 / 經手人', '新增 / 修改'],
      },
    ],
  },
]

// ==========================================
// 3. 主要元件
// ==========================================
export default function GroupCreate({
  onCancel,
  onSave,
  initialValues,
}: GroupCreateProps) {
  const [form] = Form.useForm()

  // ★ 關鍵：即時監聽表單中的 permissions 變化，以便計算「全選」狀態
  const currentPermissions = Form.useWatch('permissions', form) || {}

  const isEdit = !!initialValues
  const pageTitle = isEdit
    ? '後台管理 > 群組管理 > 編輯群組'
    : '後台管理 > 群組管理 > 新增群組'

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
      console.error('Validation Failed:', error)
    }
  }

  // --- 邏輯：處理大標題全選/全取消 ---
  const handleCategoryChange = useCallback(
    (e: CheckboxChangeEvent, items: (typeof PERMISSION_CONFIG)[0]['items']) => {
      const checked = e.target.checked
      const newPermissions = { ...form.getFieldValue('permissions') }

      // 遍歷該分類下的所有 item，將其值設為全滿 or 空
      items.forEach((item) => {
        if (checked) {
          // 全選：將該 item 的所有 options 都選上
          newPermissions[item.key] = item.options
        } else {
          // 全取消
          newPermissions[item.key] = []
        }
      })

      // 更新表單
      form.setFieldsValue({ permissions: newPermissions })
    },
    [form]
  )

  // --- 邏輯：計算目前該分類的勾選狀態 (Checked / Indeterminate) ---
  const getCategoryCheckboxStatus = (
    items: (typeof PERMISSION_CONFIG)[0]['items']
  ) => {
    let checkedCount = 0
    let totalOptionsCount = 0

    items.forEach((item) => {
      const itemOptions = item.options
      const checkedValues = currentPermissions[item.key] || []

      totalOptionsCount += itemOptions.length
      checkedCount += checkedValues.length
    })

    const isAllChecked =
      totalOptionsCount > 0 && checkedCount === totalOptionsCount
    const isIndeterminate = checkedCount > 0 && checkedCount < totalOptionsCount

    return { isAllChecked, isIndeterminate }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* ===== Breadcrumb ===== */}
      <div className="px-6 py-4">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>後台管理</Breadcrumb.Item>
          <Breadcrumb.Item
            className="cursor-pointer hover:text-teal-600"
            onClick={onCancel}
          >
            群組管理
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {pageTitle ? '編輯群組' : '新增群組'}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* ===== 主內容區塊 ===== */}
      <div className="flex-1 px-6 pb-24">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h2 className="text-lg font-bold text-gray-800">
              {isEdit ? '編輯群組' : '新增群組'}
            </h2>
          </div>

          <Form
            form={form}
            layout="vertical"
            className="p-6"
            requiredMark={false}
          >
            {/* 群組設定 */}
            <div className="mb-8">
              <h3 className="mb-4 border-b pb-2 text-base font-bold text-gray-800">
                群組設定
              </h3>
              <div className="grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
                <Form.Item
                  label="群組編號"
                  name="groupId"
                  rules={[{ required: true, message: '請輸入群組編號' }]}
                >
                  <Input placeholder="請輸入" size="large" />
                </Form.Item>
                <Form.Item
                  label="群組名稱"
                  name="groupName"
                  rules={[{ required: true, message: '請輸入群組名稱' }]}
                >
                  <Input placeholder="請輸入" size="large" />
                </Form.Item>
              </div>
            </div>

            {/* 權限設定 */}
            <div>
              <h3 className="mb-4 border-b pb-2 text-base font-bold text-gray-800">
                權限設定
              </h3>

              <div className="grid grid-cols-1 gap-0 rounded-sm border border-gray-300 md:grid-cols-2 xl:grid-cols-6">
                {PERMISSION_CONFIG.map((col, index) => {
                  // 計算該欄位的全選狀態
                  const { isAllChecked, isIndeterminate } =
                    getCategoryCheckboxStatus(col.items)

                  return (
                    <div
                      key={col.category}
                      className={`flex flex-col ${
                        index !== PERMISSION_CONFIG.length - 1
                          ? 'border-b border-gray-300 xl:border-b-0 xl:border-r'
                          : ''
                      }`}
                    >
                      {/* 欄位標題 (含全選 Checkbox) */}
                      <div className="border-b border-gray-300 bg-gray-50 p-2 text-center font-bold text-gray-700">
                        <Checkbox
                          className="mr-2"
                          checked={isAllChecked}
                          indeterminate={isIndeterminate}
                          onChange={(e) => handleCategoryChange(e, col.items)}
                        >
                          {col.category}
                        </Checkbox>
                      </div>

                      {/* 欄位內容列表 */}
                      <div className="h-full bg-white p-3">
                        {col.items.map((item) => (
                          <div key={item.key} className="mb-4 last:mb-0">
                            <div className="mb-1 border-l-2 border-teal-500 pl-2 text-sm font-medium text-gray-600">
                              {item.label}
                            </div>
                            <Form.Item name={['permissions', item.key]} noStyle>
                              <Checkbox.Group className="ml-2 flex flex-col gap-1">
                                {item.options.map((opt) => (
                                  <Checkbox
                                    key={opt}
                                    value={opt}
                                    className="!ml-0 text-xs text-gray-500"
                                  >
                                    {opt}
                                  </Checkbox>
                                ))}
                              </Checkbox.Group>
                            </Form.Item>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Form>
        </div>
      </div>

      {/* ===== Sticky Footer ===== */}
      <div className="sticky bottom-0 z-10 flex justify-center gap-4 border-t border-gray-200 bg-white py-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <Button
          size="large"
          icon={<CloseOutlined />}
          onClick={onCancel}
          className="h-10 w-32 border-red-500 text-red-500"
        >
          取 消
        </Button>
        <Button
          size="large"
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSubmit}
          className="h-10 w-32 bg-green-500"
        >
          儲 存
        </Button>
      </div>
    </div>
  )
}
