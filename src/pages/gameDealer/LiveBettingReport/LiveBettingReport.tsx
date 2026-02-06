import { useMemo, useState } from 'react'
import { Breadcrumb, ConfigProvider, Input, Space, message } from 'antd'

// 共用元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'

// 子元件
import ReportTable from './components/ReportTable'

// 型別
import type { BettingData, GameDetailData, ViewMode } from './types'

// mock 資料
import {
  MOCK_DATA_L1,
  MOCK_DATA_L2,
  MOCK_DATA_L3,
  PROVIDERS,
} from './utils/fakeData'

// 工具
import { calculateTotal } from './utils/calculations.ts'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function LiveBettingReport() {
  // --------------------------------------------------------------------------
  // 1. 狀態管理
  // --------------------------------------------------------------------------
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedProvider, setSelectedProvider] = useState<string>('DG')

  const [currentGame, setCurrentGame] = useState<BettingData | null>(null)
  const [currentMember, setCurrentMember] = useState<GameDetailData | null>(
    null
  )

  // --------------------------------------------------------------------------
  // 2. 依 viewMode 取得資料來源
  // ⚠️ 這裡「不要標型別」，讓 TS 自動推斷
  // --------------------------------------------------------------------------
  const currentDataSource = useMemo(() => {
    switch (viewMode) {
      case 'list':
        return MOCK_DATA_L1
      case 'gameDetail':
        return MOCK_DATA_L2
      case 'memberDetail':
        return MOCK_DATA_L3
      default:
        return []
    }
  }, [viewMode])

  // 合計資料（已可同時支援 L1 / L2 / L3）
  const currentTotal = useMemo(
    () => calculateTotal(currentDataSource),
    [currentDataSource]
  )

  // --------------------------------------------------------------------------
  // 3. 導航事件
  // --------------------------------------------------------------------------
  const handleGoToGameDetail = (record: BettingData) => {
    setCurrentGame(record)
    setViewMode('gameDetail')
    console.log(currentGame)
    window.scrollTo(0, 0)
  }

  const handleGoToMemberDetail = (record: GameDetailData) => {
    setCurrentMember(record)
    setViewMode('memberDetail')
    window.scrollTo(0, 0)
  }

  const handleBackToList = () => {
    setViewMode('list')
    setCurrentGame(null)
    setCurrentMember(null)
  }

  const handleBackToGameDetail = () => {
    setViewMode('gameDetail')
    setCurrentMember(null)
  }

  // --------------------------------------------------------------------------
  // 4. 搜尋
  // --------------------------------------------------------------------------
  const handleSearch = (values: any) => {
    console.log(`[${viewMode}] Search:`, values)
    message.success('列表已更新')
  }

  // --------------------------------------------------------------------------
  // 5. 搜尋欄位設定
  // --------------------------------------------------------------------------
  const searchFields = useMemo<SearchField[]>(() => {
    if (viewMode === 'list') {
      return [
        {
          label: '遊戲名稱',
          name: 'gameName',
          render: () => <Input placeholder="請輸入" />,
        },
        {
          label: '報表時間',
          name: 'reportTime',
          render: () => <QuickRangePicker />,
        },
      ]
    }

    if (viewMode === 'gameDetail') {
      return [
        {
          label: '會員姓名',
          name: 'memberName',
          render: () => <Input placeholder="請輸入" />,
        },
      ]
    }

    // memberDetail
    return [
      {
        label: '注單號碼',
        name: 'betId',
        render: () => <Input placeholder="請輸入" />,
      },
      {
        label: '下注時間',
        name: 'betTimeRange',
        render: () => <QuickRangePicker />,
      },
    ]
  }, [viewMode])

  // --------------------------------------------------------------------------
  // 6. Render
  // --------------------------------------------------------------------------
  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            FM後台管理系統
          </h1>

          <Breadcrumb separator=">">
            <Breadcrumb.Item>遊戲商管理</Breadcrumb.Item>
            <Breadcrumb.Item className="font-bold">
              真人下注報表
            </Breadcrumb.Item>

            {(viewMode === 'gameDetail' || viewMode === 'memberDetail') && (
              <Breadcrumb.Item>
                <span
                  className="cursor-pointer hover:text-teal-600"
                  onClick={handleBackToList}
                >
                  輸贏報表1
                </span>
              </Breadcrumb.Item>
            )}

            {viewMode === 'memberDetail' && (
              <>
                <Breadcrumb.Item>
                  <span
                    className="cursor-pointer hover:text-teal-600"
                    onClick={handleBackToGameDetail}
                  >
                    輸贏報表2
                  </span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {currentMember?.memberName || '會員詳情'}
                </Breadcrumb.Item>
              </>
            )}
          </Breadcrumb>
        </div>

        {/* 搜尋 */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ pageSize: 20 }}
          onSearch={handleSearch}
        />

        {/* Provider Tabs */}
        <div className="mb-2 mt-4 overflow-x-auto pb-1">
          <Space size={6}>
            {PROVIDERS.map((p) => (
              <div
                key={p.code}
                onClick={() => setSelectedProvider(p.code)}
                className={`flex min-w-[80px] cursor-pointer flex-col items-center justify-center rounded border px-4 py-1.5 transition-all ${
                  selectedProvider === p.code
                    ? 'border-gray-400 bg-gray-200 text-gray-900 shadow-inner'
                    : 'border-gray-300 bg-white text-gray-500 hover:border-gray-400 hover:text-gray-700'
                }`}
              >
                <span className="text-xs font-bold">{p.code}</span>
                <span className="text-[10px] opacity-70">({p.count})</span>
              </div>
            ))}
          </Space>
        </div>

        {/* 表格標題 */}
        <div className="mb-2 flex items-center gap-2">
          {viewMode === 'list' && (
            <h3 className="text-sm font-bold text-blue-600">輸贏報表1</h3>
          )}

          {viewMode === 'gameDetail' && (
            <div className="flex items-center gap-1 font-bold text-blue-600">
              <span
                className="cursor-pointer hover:underline"
                onClick={handleBackToList}
              >
                輸贏報表1
              </span>
              <span className="text-gray-400">{'>'}</span>
              <span className="text-gray-800">輸贏報表2</span>
            </div>
          )}

          {viewMode === 'memberDetail' && (
            <div className="flex items-center gap-1 font-bold text-blue-600">
              <span
                className="cursor-pointer hover:underline"
                onClick={handleBackToList}
              >
                輸贏報表1
              </span>
              <span className="text-gray-400">{'>'}</span>
              <span
                className="cursor-pointer hover:underline"
                onClick={handleBackToGameDetail}
              >
                輸贏報表2
              </span>
              <span className="text-gray-400">{'>'}</span>
              <span className="text-gray-800">{currentMember?.memberName}</span>
            </div>
          )}
        </div>

        {/* Table */}
        <ReportTable
          viewMode={viewMode}
          dataSource={currentDataSource}
          totalData={currentTotal}
          onGoToGameDetail={handleGoToGameDetail}
          onGoToMemberDetail={handleGoToMemberDetail}
        />
      </div>
    </ConfigProvider>
  )
}
