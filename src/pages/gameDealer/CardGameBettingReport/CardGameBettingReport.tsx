import { useState, useMemo, useEffect } from 'react'
import { Breadcrumb, ConfigProvider, Select, Input, Space, message } from 'antd'

// 1. Types
// 1. Types
import type {
  CardGameBettingData,
  GameDetailData,
  MemberDetailData,
  ViewMode,
} from './types'

// 2. Utils
import {
  MOCK_DATA_L1,
  MOCK_DATA_L2,
  MOCK_DATA_L3,
  PROVIDERS,
} from './utils/fakeData'
import { calculateTotal } from './utils/calculations'

// 3. Components
import ReportTable from './components/ReportTable'

// 假設路徑 (請依實際專案位置調整)
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function CardGameBettingReport() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedProvider, setSelectedProvider] = useState<string>('FG')

  const [currentGame, setCurrentGame] = useState<CardGameBettingData | null>(
    null
  )
  const [currentMember, setCurrentMember] = useState<GameDetailData | null>(
    null
  )

  // 模擬 API 載入狀態
  const [loading, setLoading] = useState(false)

  // 模擬資料變更時的 Loading 效果 (這同時也解決了 ESLint currentGame unused 的問題)
  useEffect(() => {
    if (currentGame) {
      // console.log('Fetching details for game:', currentGame.gameId)
    }
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [viewMode, currentGame, currentMember])

  // --------------------------------------------------------------------------
  // Navigation Handlers
  // --------------------------------------------------------------------------

  const handleGoToGameDetail = (record: CardGameBettingData) => {
    setCurrentGame(record)
    setViewMode('gameDetail')
  }

  const handleGoToMemberDetail = (record: GameDetailData) => {
    setCurrentMember(record)
    setViewMode('memberDetail')
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

  const handleViewDetail = (record: MemberDetailData) => {
    message.info(`檢視注單: ${record.betId.replace('\n', '')}`)
  }

  const handleSearch = (values: any) => {
    console.log(`[${viewMode}] Search:`, values)
    message.success('列表已更新')
    setLoading(true)
    setTimeout(() => setLoading(false), 500)
  }

  // --------------------------------------------------------------------------
  // Data Logic
  // --------------------------------------------------------------------------

  const currentDataSource = useMemo(() => {
    switch (viewMode) {
      case 'gameDetail':
        return MOCK_DATA_L2
      case 'memberDetail':
        return MOCK_DATA_L3
      case 'list':
      default:
        return MOCK_DATA_L1
    }
  }, [viewMode])

  const currentTotal = useMemo(
    () => calculateTotal(currentDataSource),
    [currentDataSource]
  )

  // --------------------------------------------------------------------------
  // Search Fields
  // --------------------------------------------------------------------------
  const searchFields = useMemo<SearchField[]>(() => {
    const commonFields = [
      {
        label: '每頁顯示筆數',
        name: 'pageSize',
        render: () => (
          <Select
            defaultValue={20}
            options={[
              { label: '20', value: 20 },
              { label: '50', value: 50 },
            ]}
          />
        ),
      },
    ]

    const timeField = {
      label: '報表時間',
      name: 'reportTime',
      render: () => <QuickRangePicker />,
    }

    if (viewMode === 'list') {
      return [
        {
          label: '遊戲名稱',
          name: 'gameName',
          render: () => <Input placeholder="請輸入" />,
        },
        timeField,
        ...commonFields,
      ]
    } else if (viewMode === 'gameDetail') {
      return [
        {
          label: '會員姓名',
          name: 'memberName',
          render: () => <Input placeholder="請輸入" />,
        },
        ...commonFields,
      ]
    } else {
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
        ...commonFields,
      ]
    }
  }, [viewMode])

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
              棋牌下注報表
            </Breadcrumb.Item>

            {viewMode === 'memberDetail' && (
              <>
                <Breadcrumb.Item>
                  <span
                    className="cursor-pointer hover:text-teal-600"
                    onClick={handleBackToList}
                  >
                    輸贏報表1
                  </span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span
                    className="cursor-pointer hover:text-teal-600"
                    onClick={handleBackToGameDetail}
                  >
                    {/* 符合截圖：第二層固定文字 */}
                    輸贏報表2
                  </span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{currentMember?.memberName}</Breadcrumb.Item>
              </>
            )}

            {viewMode === 'gameDetail' && (
              <>
                <Breadcrumb.Item>
                  <span
                    className="cursor-pointer hover:text-teal-600"
                    onClick={handleBackToList}
                  >
                    輸贏報表1
                  </span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>輸贏報表2</Breadcrumb.Item>
              </>
            )}

            {viewMode === 'list' && (
              <Breadcrumb.Item>輸贏報表1</Breadcrumb.Item>
            )}
          </Breadcrumb>
        </div>

        {/* Search */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ pageSize: 20 }}
          onSearch={handleSearch}
        />

        {/* Tabs */}
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

        {/* Info Bar */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm font-bold">
            {viewMode === 'list' && (
              <span className="text-gray-800">輸贏報表1</span>
            )}
            {viewMode === 'gameDetail' && (
              <div className="flex items-center gap-1 text-blue-600">
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
              <div className="flex items-center gap-1 text-blue-600">
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
                <span className="text-gray-800">
                  {currentMember?.memberName}
                </span>
              </div>
            )}
          </div>

          {viewMode === 'memberDetail' && (
            <div className="flex flex-col items-end gap-1 text-xs font-bold text-gray-600">
              <span>
                該頁中獎金額 :{' '}
                <span className="text-gray-900">
                  {currentTotal.prizeAmount.toLocaleString()}
                </span>
              </span>
              <span>
                該頁虧損金額 :{' '}
                <span
                  className={
                    currentTotal.netLossAmount < 0
                      ? 'text-red-600'
                      : 'text-gray-900'
                  }
                >
                  {currentTotal.netLossAmount.toLocaleString()}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* ReportTable: 負責顯示與無限滾動 */}
        <ReportTable
          viewMode={viewMode}
          dataSource={currentDataSource}
          totalData={currentTotal}
          loading={loading}
          onGoToGameDetail={handleGoToGameDetail}
          onGoToMemberDetail={handleGoToMemberDetail}
          onViewDetail={handleViewDetail}
        />
      </div>
    </ConfigProvider>
  )
}
