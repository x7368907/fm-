import React, { useState } from 'react'
import { Button, Row, Col, Breadcrumb, Typography, ConfigProvider } from 'antd'
import { CloseOutlined, SaveOutlined } from '@ant-design/icons'

// 引入拆分後的元件
import StepCategory from './components/StepCategory'
import StepBonusTable from './components/StepBonusTable'
import StepMemberTable from './components/StepMemberTable'

const { Text } = Typography

interface BonusCreateProps {
  onCancel: () => void
}

const themeConfig = { token: { colorPrimary: '#14b8a6' } }

export default function BonusCreate({ onCancel }: BonusCreateProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('紅包')
  const [selectedBonusKeys, setSelectedBonusKeys] = useState<React.Key[]>([])
  const [selectedMemberKeys, setSelectedMemberKeys] = useState<React.Key[]>([])

  const handleSave = () => {
    console.log('儲存資料:', {
      category: selectedCategory,
      bonus: selectedBonusKeys,
      members: selectedMemberKeys,
    })
    onCancel()
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="space-y-4 bg-gray-50 p-4">
        {/* 麵包屑 */}
        <Breadcrumb separator=">" className="mb-2">
          <Breadcrumb.Item>會員管理</Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={onCancel}
            className="cursor-pointer hover:text-teal-600"
          >
            會員優惠申請
          </Breadcrumb.Item>
          <Breadcrumb.Item>優惠申請</Breadcrumb.Item>
        </Breadcrumb>

        {/* ===== 外層卡片（sticky 以這層為基準） ===== */}
        <div className="relative rounded-md bg-white shadow-sm">
          {/* 標題 */}
          <div className="rounded-t-md bg-gray-300 px-4 py-2 text-base font-bold text-gray-700">
            優惠申請
          </div>

          {/* ===== 內容區（一定要預留 footer 高度） ===== */}
          <div className="p-6 pb-32">
            <div className="mb-5 border-b border-gray-200 pb-2 text-base font-bold text-gray-800">
              優惠發放操作
            </div>

            <div className="mb-2 flex items-center">
              <Text strong className="mr-2">
                批次操作
              </Text>
            </div>

            <div className="border border-gray-400">
              <Row wrap={false} className="min-h-[500px]">
                <Col flex="120px">
                  <StepCategory
                    selectedCategory={selectedCategory}
                    onSelect={setSelectedCategory}
                  />
                </Col>

                <Col flex="auto" className="flex flex-col">
                  <StepBonusTable
                    selectedRowKeys={selectedBonusKeys}
                    onChange={setSelectedBonusKeys}
                  />
                  <StepMemberTable
                    selectedRowKeys={selectedMemberKeys}
                    onChange={setSelectedMemberKeys}
                  />
                </Col>
              </Row>
            </div>
          </div>

          {/* ===== Sticky Footer（統一樣式） ===== */}
          <div className="sticky bottom-0 z-10 flex justify-center gap-5 border-t border-gray-200 bg-white py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <Button
              size="large"
              icon={<CloseOutlined />}
              onClick={onCancel}
              className="h-10 w-32 border-red-500 text-red-500 hover:bg-red-50"
            >
              取消
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<SaveOutlined />}
              onClick={handleSave}
              className="h-10 w-32 border-green-500 bg-green-500 hover:bg-green-600"
            >
              儲存
            </Button>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}
