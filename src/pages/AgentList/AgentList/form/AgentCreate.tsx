// src/pages/AgentList/AgentCreate.tsx
import React, { useEffect } from 'react'
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
} from 'antd'
import { PlusOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons'

const { TextArea } = Input
// 遊戲廠商資料 (這個常數只在新增頁用到，所以搬過來)
const GAME_PROVIDERS = [
  {
    category: '真人',
    providers: ['DG (0%)', '歐博 (0%)', 'MT (0%)', 'SA (0%)', 'WM (0%)'],
  },
  {
    category: '電子',
    providers: [
      'ATG (22%)',
      'QT (0%)',
      'RSG (0%)',
      'BNG (0%)',
      'FG (0%)',
      'CG (0%)',
    ],
  },
  { category: '體育', providers: ['Super (0%)', 'WG (0%)', 'DB (0%)'] },
  { category: '彩票', providers: ['9K (0%)', 'WG (0%)', 'DB (0%)'] },
  {
    category: '棋牌',
    providers: ['FM (0%)', '好路 (0%)', '高登 (0%)', 'FG (0%)'],
  },
  { category: '捕魚', providers: ['BT (0%)', '愛發 (0%)'] },
]

// 定義傳入的資料型別 (與 List 頁面的一致)
interface DataType {
  key: React.Key
  level: string
  name: string
  memberCount: number
  account: string
  realName: string
  status: string
  group: string
  regTime: string
  loginTime: string
  system: string
  cycle: string
  // ... 其他需要的欄位
}

interface AgentCreateProps {
  onCancel: () => void
  initialValues?: DataType | null // 接收表格傳來的資料
}

const AgentCreate: React.FC<AgentCreateProps> = ({
  onCancel,
  initialValues,
}) => {
  const [form] = Form.useForm()
  const isEditMode = !!initialValues // 是否為編輯模式

  useEffect(() => {
    if (isEditMode && initialValues) {
      // 資料回填邏輯
      form.setFieldsValue({
        agentName: initialValues.name,
        account: initialValues.account,
        realName: initialValues.realName,
        status: initialValues.status === '啟用' ? 'active' : 'disabled',
        parentLevel: '1',
        parentAgent: 'agent1',
        defaultVip: 'vip1',
        returnWater: 'daily',
        cashGroup: 'groupA',
        agentSystem: 'share',
        profitChoice: 'type1',
      })
    } else {
      form.resetFields()
    }
  }, [initialValues, isEditMode, form])

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-4">
        <Breadcrumb
          items={[
            { title: '代理管理' },
            {
              title: '代理資料',
              onClick: onCancel,
              className: 'cursor-pointer hover:text-teal-500 transition-colors',
            },
            { title: isEditMode ? '編輯代理' : '新增代理' },
          ]}
        />
      </div>

      <div className="mb-4 bg-gray-200 px-4 py-2 font-bold text-gray-700">
        {isEditMode ? '編輯代理' : '新增代理'}
      </div>

      <Form form={form} layout="vertical">
        <Row gutter={24}>
          {/* 左側欄位 */}
          <Col xs={24} lg={12}>
            <Card
              title="代理設定"
              className="mb-4 shadow-sm"
              headStyle={{
                background: '#fafafa',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <Form.Item
                label="上級代理級別選擇"
                name="parentLevel"
                rules={[{ required: true }]}
              >
                <Select placeholder="請選擇">
                  <Select.Option value="lvl1">1級總代理</Select.Option>
                  <Select.Option value="lvl2">2級代理</Select.Option>
                  <Select.Option value="lvl3">3級代理</Select.Option>
                  <Select.Option value="lvl4">4級代理</Select.Option>
                  <Select.Option value="lvl5">5級代理</Select.Option>
                  <Select.Option value="lvl6">6級代理</Select.Option>
                  <Select.Option value="lvl7">7級代理</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="上級代理選擇"
                name="parentAgent"
                rules={[{ required: true }]}
                style={{ marginBottom: 0 }}
              >
                <Select placeholder="請選擇">
                  <Select.Option value="fmca">FMCA-(主站-總代)</Select.Option>
                  <Select.Option value="test123">
                    test123-(測試帳號線)
                  </Select.Option>
                  <Select.Option value="fxout">
                    FXOUT-(金流/成數代理-外單位)
                  </Select.Option>
                  <Select.Option value="fmca2">
                    FMCA02-(金流/返水代理-主站)
                  </Select.Option>
                  <Select.Option value="xfw">
                    XFW-(金流/成數+返水代理-外單位)
                  </Select.Option>
                  <Select.Option value="xcf1">
                    xcf1-(金流/返水代理-外單位)
                  </Select.Option>
                  <Select.Option value="w02">
                    W02-週結-(信用/成數代理-外單位)
                  </Select.Option>
                  <Select.Option value="w01">
                    W01-週結-(信用/成數+返水代理-外單位)
                  </Select.Option>
                  <Select.Option value="xout02">
                    XOUT2-回補-(金流/成數代理-外單位)
                  </Select.Option>
                  <Select.Option value="xfw2">
                    XFW2-回補-(金流/成數+返水代理-外單位)
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="isNewLevel"
                valuePropName="checked"
                style={{ marginBottom: 24 }}
              >
                <Checkbox>新增代理級別</Checkbox>
              </Form.Item>
              <Form.Item
                label="代理名稱"
                name="agentName"
                rules={[{ required: true }]}
              >
                <Input placeholder="請輸入" />
              </Form.Item>
              <Form.Item
                label="代理帳號"
                name="account"
                rules={[{ required: true }]}
              >
                <Input placeholder="請輸入" disabled={isEditMode} />
              </Form.Item>
              <Form.Item
                label="代理前台網址"
                name="frontendUrl"
                rules={[{ required: true }]}
                help={
                  <span className="text-xs text-red-500">
                    請將代理網址後綴輸入您想要的會員帳號
                  </span>
                }
              >
                <Input
                  addonBefore="https://fuma888.com/"
                  placeholder="請輸入"
                />
              </Form.Item>
              <Form.Item
                label="登入密碼"
                name="password"
                rules={[{ required: !isEditMode }]}
              >
                <Input.Password placeholder="請輸入" />
              </Form.Item>
              <Form.Item
                label="再輸入一次登入密碼"
                name="confirmPassword"
                rules={[{ required: !isEditMode }]}
              >
                <Input.Password placeholder="請輸入" />
              </Form.Item>
              <Form.Item
                label="預設會員VIP等級"
                name="defaultVip"
                rules={[{ required: true }]}
              >
                <Select placeholder="請選擇">
                  <Select.Option value="vip0">VIP 0遊客</Select.Option>
                  <Select.Option value="vip1">VIP 1一般會員</Select.Option>
                  <Select.Option value="vip2">VIP 2BOK會員</Select.Option>
                  <Select.Option value="vip3">VIP 3青銅會員</Select.Option>
                  <Select.Option value="vip4">VIP 4白銀會員</Select.Option>
                  <Select.Option value="vip5">VIP 5黃金會員</Select.Option>
                  <Select.Option value="vip6">VIP 6鑽石會員</Select.Option>
                  <Select.Option value="vip7">VIP 7特邀會員</Select.Option>
                  <Select.Option value="vip10">VIP 10無返水線</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="預設會員返水結算條件"
                name="returnWater"
                rules={[{ required: true }]}
              >
                <Select placeholder="請選擇">
                  <Select.Option value="daily">日結</Select.Option>
                  <Select.Option value="week">週結</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="預設金流群組"
                name="cashGroup"
                rules={[{ required: true }]}
              >
                <Select placeholder="請選擇">
                  <Select.Option value="regular">常規會員</Select.Option>
                  <Select.Option value="old">老會員</Select.Option>
                  <Select.Option value="credit">信用代理</Select.Option>
                  <Select.Option value="usdt">USDT通道</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="預設帳號狀態"
                name="status"
                rules={[{ required: true }]}
              >
                <Select placeholder="請選擇">
                  <Select.Option value="active">啟用</Select.Option>
                  <Select.Option value="disabled">停用</Select.Option>
                  <Select.Option value="frozen_wallet">
                    啟用(凍結錢包)
                  </Select.Option>
                  <Select.Option value="no_deposit">
                    啟用(停用儲值)
                  </Select.Option>
                  <Select.Option value="no_withdraw">
                    啟用(停用託售)
                  </Select.Option>
                  <Select.Option value="banned">終身停權</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="備註" name="memo">
                <TextArea rows={4} />
              </Form.Item>
            </Card>

            <Card
              title="分潤條件設定"
              className="mb-4 shadow-sm"
              headStyle={{ background: '#fafafa' }}
            >
              <Form.Item
                label="代理制度"
                name="agentSystem"
                rules={[{ required: true }]}
              >
                <Select placeholder="請選擇">
                  <Select.Option value="share">佔成制</Select.Option>
                  <Select.Option value="water">
                    反水制（總投注額回饋）
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="分潤選擇"
                name="profitChoice"
                rules={[{ required: true, message: '請選擇分潤方案' }]}
              >
                <Select placeholder="請選擇">
                  <Select.Option value={1}>
                    通用代理0%(成數代理開設線下代理使用)
                  </Select.Option>
                  <Select.Option value={2}>抽水代理(關線下返水)</Select.Option>
                  <Select.Option value={3}>合營計畫</Select.Option>
                  <Select.Option value={4}>
                    抽水代理(關線下返水)返水0.6體育0.5彩票0
                  </Select.Option>
                  <Select.Option value={5}>
                    抽水代理(關線下返水)百家0.7 其他0.5 彩票0
                  </Select.Option>
                  <Select.Option value={6}>
                    合抽水代理(關線下返水)返水0.7體育0.5彩票0
                  </Select.Option>
                  <Select.Option value={7}>
                    抽水代理(關線下返水)返水0.5體0.5彩0
                  </Select.Option>
                  <Select.Option value={8}>
                    抽水代理(關線下返水)-迪西-返水0.8體0.8彩0
                  </Select.Option>
                  <Select.Option value={9}>停用</Select.Option>
                  <Select.Option value={10}>
                    信用合營佔成20% 退傭0.5%
                  </Select.Option>
                  <Select.Option value={11}>
                    抽水代理(關線下返水)返水0.8體育0.5彩票0
                  </Select.Option>
                  <Select.Option value={12}>
                    抽水代理(關線下返水) 返水 真人1 其他0.5 彩票0
                  </Select.Option>
                  <Select.Option value={13}>
                    抽水代理(關線下返水)返水0.5體育0.3彩票0
                  </Select.Option>
                  <Select.Option value={14}>關閉</Select.Option>
                  <Select.Option value={15}>
                    抽水代理(關線下返水)外找小代理返水 其他起步0.4 彩票0
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="分潤比例(%)" name="profitRate">
                <Input placeholder="0" suffix="%" />
              </Form.Item>
              <Form.Item label="代理反水條件" style={{ marginBottom: 0 }}>
                <div className="overflow-hidden rounded-md border text-center text-xs">
                  <div className="grid grid-cols-6 bg-gray-200 py-2 font-bold">
                    <div>
                      真人
                      <br />
                      (%)
                    </div>
                    <div>
                      電子
                      <br />
                      (%)
                    </div>
                    <div>
                      體育
                      <br />
                      (%)
                    </div>
                    <div>
                      彩票
                      <br />
                      (%)
                    </div>
                    <div>
                      棋牌
                      <br />
                      (%)
                    </div>
                    <div>
                      捕魚
                      <br />
                      (%)
                    </div>
                  </div>
                  <div className="grid grid-cols-6 bg-white">
                    {[...Array(6)].map((_, i) => (
                      <input
                        key={i}
                        className="w-full border-r p-2 text-center outline-none last:border-r-0"
                        placeholder=""
                      />
                    ))}
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                label="分潤結算時機"
                name="settlementTime"
                className="mt-4"
              >
                <Select placeholder="請選擇">
                  <Select.Option value="weekly">
                    週結(每週日-23:59:59)
                  </Select.Option>
                  <Select.Option value="weekly">
                    月結(每月最後一天-23:59:59)
                  </Select.Option>
                </Select>
              </Form.Item>
            </Card>
          </Col>

          {/* 右側欄位 */}
          <Col xs={24} lg={12}>
            <Card
              title="代理資料"
              className="mb-4 shadow-sm"
              headStyle={{ background: '#fafafa' }}
            >
              <Form.Item label="代理姓名" name="realName">
                <Input placeholder="請輸入" />
              </Form.Item>
              <Form.Item label="性別" name="gender">
                <Radio.Group>
                  <Radio value="male">男</Radio>
                  <Radio value="female">女</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="身分證字號" name="idCard">
                <Input placeholder="請輸入" />
              </Form.Item>
              <Form.Item label="暱稱" name="nickname">
                <Input placeholder="請輸入" />
              </Form.Item>
              <Form.Item label="手機" name="mobile">
                <Input placeholder="請輸入" />
              </Form.Item>
              <Form.Item label="Line ID" name="lineId">
                <Input placeholder="請輸入" />
              </Form.Item>
            </Card>

            <Card
              title="銀行卡資料"
              className="mb-4 shadow-sm"
              headStyle={{ background: '#fafafa' }}
            >
              <div className="overflow-x-auto">
                <table className="w-full border text-left text-sm text-gray-500">
                  <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                    <tr>
                      <th className="w-12 border px-2 py-2 text-center">
                        新增
                      </th>
                      <th className="w-12 border px-2 py-2 text-center">
                        刪除
                      </th>
                      <th className="border px-2 py-2">銀行名稱</th>
                      <th className="border px-2 py-2">銀行帳號</th>
                      <th className="w-20 border px-2 py-2">存摺封面</th>
                      <th className="w-20 border px-2 py-2">狀態</th>
                      <th className="border px-2 py-2">備註</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border text-center">
                        <Button
                          size="small"
                          icon={<PlusOutlined />}
                          type="text"
                          className="bg-black text-white hover:bg-gray-800 hover:text-white"
                        />
                      </td>
                      <td className="border text-center"></td>
                      <td className="border p-1">
                        <Select
                          size="small"
                          placeholder="請選擇"
                          className="w-full"
                        />
                      </td>
                      <td className="border p-1">
                        <Input size="small" placeholder="請輸入" />
                      </td>
                      <td className="border p-1 text-center">
                        <Button
                          size="small"
                          className="border-green-500 px-1 text-xs text-green-500"
                        >
                          上傳
                        </Button>
                      </td>
                      <td className="border p-1">
                        <Select
                          size="small"
                          placeholder="請選擇"
                          className="w-full"
                        />
                      </td>
                      <td className="border p-1">
                        <Input size="small" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <Card
              title="禁止遊戲"
              className="mb-4 shadow-sm"
              headStyle={{ background: '#fafafa' }}
            >
              <div className="space-y-3">
                {GAME_PROVIDERS.map((group) => (
                  <div
                    key={group.category}
                    className="flex items-start border-b pb-2 last:border-b-0"
                  >
                    <div className="flex w-16 items-center pt-1 font-bold text-gray-600">
                      <Checkbox />
                      <span className="ml-1">{group.category}</span>
                    </div>
                    <div className="flex flex-1 flex-wrap gap-2">
                      {group.providers.map((provider) => (
                        <Checkbox
                          key={provider}
                          className="ml-0 text-xs text-gray-500"
                        >
                          {provider}
                        </Checkbox>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        <div className="sticky bottom-0 z-10 mt-4 flex justify-center gap-4 border-t bg-white py-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <Button
            size="large"
            danger
            icon={<CloseOutlined />}
            className="w-32"
            onClick={onCancel}
          >
            取消
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<SaveOutlined />}
            className="w-32 border-green-500 bg-green-500 hover:bg-green-600"
            onClick={() => {
              console.log('Form Submit:', form.getFieldsValue())
              onCancel()
            }}
          >
            {isEditMode ? '更新' : '儲存'}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default AgentCreate
