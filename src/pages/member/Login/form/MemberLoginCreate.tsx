import { Button, Breadcrumb, ConfigProvider } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'

import { useLoginCreate } from '../hook/useLoginCreate'
import BlocklistTable from './components/BlocklistTable'

interface MemberLoginCreateProps {
  onCancel: () => void
  mode: 'create' | 'edit'
  initialValues?: any
}

const themeConfig = { token: { colorPrimary: '#13c2c2' } }

export default function MemberLoginCreate({
  onCancel,
  mode,
  initialValues,
}: MemberLoginCreateProps) {
  const { ipData, deviceData, handleSave } = useLoginCreate(mode, initialValues)

  const pageTitle = mode === 'edit' ? '編輯黑名單' : '新增黑名單'

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="space-y-4 bg-gray-50 p-4">
        {/* Breadcrumb */}
        <Breadcrumb separator=">" className="mb-2">
          <Breadcrumb.Item>會員管理</Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={onCancel}
            className="cursor-pointer hover:text-teal-500"
          >
            會員登入管理
          </Breadcrumb.Item>
          <Breadcrumb.Item>{pageTitle}</Breadcrumb.Item>
        </Breadcrumb>

        {/* ===== 外層卡片（sticky 以這層為基準） ===== */}
        <div className="relative rounded-lg bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-bold text-gray-700">{pageTitle}</h2>
          </div>

          {/* ===== 內容區（一定要預留 footer 高度） ===== */}
          <div className="p-6 pb-32">
            <h3 className="mb-4 font-bold text-gray-600">黑名單設定</h3>

            {/* IP Blocklist */}
            {ipData.length > 0 && (
              <>
                <div className="mb-2">
                  <Button
                    type="primary"
                    ghost
                    size="small"
                    className="border-purple-300 bg-purple-50 font-bold text-purple-600 hover:bg-purple-100"
                  >
                    IP重複黑名單 ({ipData.length})
                  </Button>
                </div>
                <BlocklistTable type="ip" dataSource={ipData} />
              </>
            )}

            {/* Device Blocklist */}
            {deviceData.length > 0 && (
              <>
                <div className="mb-2">
                  <Button
                    type="primary"
                    ghost
                    size="small"
                    className="border-purple-300 bg-purple-50 font-bold text-purple-600 hover:bg-purple-100"
                  >
                    裝置重複黑名單 ({deviceData.length})
                  </Button>
                </div>
                <BlocklistTable type="device" dataSource={deviceData} />
              </>
            )}
          </div>

          {/* ===== Sticky Footer（統一樣式） ===== */}
          <div className="sticky bottom-0 z-10 flex justify-center gap-4 border-t border-gray-200 bg-white py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <Button
              size="large"
              icon={<CloseOutlined />}
              onClick={onCancel}
              className="h-10 w-32 border-red-500 font-bold text-red-500 hover:!border-red-400 hover:!text-red-400"
            >
              取消
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<SaveOutlined />}
              className="h-10 w-32 border-green-500 bg-green-500 font-bold hover:!bg-green-400"
              onClick={() => {
                handleSave()
                onCancel()
              }}
            >
              儲存
            </Button>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}
