import { Button, Card, Select } from 'antd'
import {
  ArrowDownOutlined,
  CloseOutlined,
  SaveOutlined,
} from '@ant-design/icons'

import AgentLevelSidebar from './components/AgentLevelSidebar'
import AgentTableArea from './components/AgentTableArea'
import MemberTableArea from './components/MemberTableArea'
import { useChangeLineForm } from '../hook/useChangeLineForm'

interface CreateChangeLinePageProps {
  onCancel: () => void
}

export default function CreateChangeLinePage({
  onCancel,
}: CreateChangeLinePageProps) {
  const {
    sourceAgent,
    setSourceAgent,
    targetAgent,
    setTargetAgent,
    selectedMemberKeys,
    setSelectedMemberKeys,
    handleSave,
  } = useChangeLineForm(onCancel)

  return (
    <div className="space-y-4 bg-gray-50 p-4">
      {/* Page title */}
      <div className="flex items-center gap-2">
        <h2 className="m-0 text-xl font-bold text-gray-800">新增會員換線</h2>
      </div>

      {/* ===== 外層卡片（sticky 以這層為基準） ===== */}
      <div className="relative rounded-lg bg-white shadow-sm">
        <Card
          bordered={false}
          styles={{ body: { padding: '24px' } }}
          className="rounded-lg"
        >
          <h3 className="mb-4 border-l-4 border-gray-600 pl-2 font-bold text-gray-700">
            換線操作
          </h3>

          {/* ===== 內容區（一定要預留 footer 高度） ===== */}
          <div className="pb-32">
            {/* 區塊 1: 來源設定 */}
            <div className="mb-6 overflow-hidden rounded border border-gray-300">
              <div className="flex">
                {/* Step 1 */}
                <div className="w-32 flex-shrink-0 border-r border-gray-300">
                  <div className="bg-gray-200 px-3 py-2 text-sm font-bold text-gray-700">
                    [Step1] 來源代理級別
                  </div>
                  <div className="h-[730px] overflow-hidden">
                    <AgentLevelSidebar />
                  </div>
                </div>

                {/* Step 2 & 3 */}
                <div className="flex flex-1 flex-col">
                  <div className="border-b border-gray-300">
                    <div className="bg-gray-200 px-3 py-2 text-sm font-bold text-gray-700">
                      [Step2] 來源代理名稱
                    </div>
                    <AgentTableArea
                      selectedAgentKey={sourceAgent}
                      onSelect={setSourceAgent}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="bg-gray-200 px-3 py-2 text-sm font-bold text-gray-700">
                      [Step3] 選擇想轉線的會員
                    </div>
                    <MemberTableArea
                      selectedMemberKeys={selectedMemberKeys}
                      onChange={setSelectedMemberKeys}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="mb-6 flex flex-col items-center justify-center gap-2">
              <div className="flex w-full max-w-4xl items-center gap-4">
                <span className="whitespace-nowrap text-sm font-bold text-gray-700">
                  [Step4] 轉線類型
                </span>
                <Select
                  defaultValue="all"
                  className="flex-1"
                  options={[{ value: 'all', label: '全部' }]}
                />
              </div>
              <ArrowDownOutlined className="mt-2 text-3xl font-bold text-black" />
            </div>

            {/* 區塊 2: 目的設定 */}
            <div className="overflow-hidden rounded border border-gray-300">
              <div className="flex">
                <div className="w-32 flex-shrink-0 border-r border-gray-300">
                  <div className="bg-gray-200 px-3 py-2 text-sm font-bold text-gray-700">
                    [Step5] 目的代理級別
                  </div>
                  <div className="min-h-[340px]">
                    <AgentLevelSidebar />
                  </div>
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="bg-gray-200 px-3 py-2 text-sm font-bold text-gray-700">
                    [Step6] 目的代理名稱
                  </div>
                  <AgentTableArea
                    selectedAgentKey={targetAgent}
                    onSelect={setTargetAgent}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* ===== Sticky Footer（統一樣式） ===== */}
        <div className="sticky bottom-0 z-10 flex justify-center gap-4 border-t border-gray-200 bg-white py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <Button
            icon={<CloseOutlined />}
            size="large"
            onClick={onCancel}
            className="h-10 w-32 border-red-500 font-bold text-red-500 hover:!border-red-400 hover:!text-red-400"
          >
            取消
          </Button>

          <Button
            type="primary"
            icon={<SaveOutlined />}
            size="large"
            onClick={handleSave}
            className="h-10 w-32 border-green-500 bg-green-500 font-bold hover:!bg-green-400"
          >
            儲存
          </Button>
        </div>
      </div>
    </div>
  )
}
