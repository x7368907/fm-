import { useState, useMemo } from 'react'
import { Breadcrumb, ConfigProvider, Select, Input, Space, message } from 'antd'

// 1. 引入 Types
// 1. 引入 Types
import type {
  FishingBettingData,
  GameDetailData,
  MemberDetailData,
  ViewMode,
} from './types'

// 2. 引入 Utils & Data
import {
  MOCK_DATA_L1,
  MOCK_DATA_L2,
  MOCK_DATA_L3,
  PROVIDERS,
} from './utils/fakeData'
import { calculateTotal } from './utils/calculations'

// 3. 引入 ReportTable (取代原本 inline 的 Table)
import ReportTable from './components/ReportTable'

// 4. 引入外部 UI
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function FishingBettingReport() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedProvider, setSelectedProvider] = useState<string>('BT')

  const [currentGame, setCurrentGame] = useState<FishingBettingData | null>(
    null
  )
  const [currentMember, setCurrentMember] = useState<GameDetailData | null>(
    null
  )

  // --------------------------------------------------------------------------
  // 導航邏輯
  // --------------------------------------------------------------------------

  const handleGoToGameDetail = (record: FishingBettingData) => {
    setCurrentGame(record)
    setViewMode('gameDetail')
    // Reset scroll is handled inside ReportTable via useInfiniteTable deps
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
    message.info(`檢視詳細注單: ${record.betId}`)
  }

  const handleSearch = (values: any) => {
    console.log(`[${viewMode}] Search:`, values)
    message.success('資料已更新')
  }

  // --------------------------------------------------------------------------
  // 資料與合計
  // --------------------------------------------------------------------------

  const currentDataSource =
    viewMode === 'list'
      ? MOCK_DATA_L1
      : viewMode === 'gameDetail'
        ? MOCK_DATA_L2
        : MOCK_DATA_L3

  const currentTotal = useMemo(
    () => calculateTotal(currentDataSource),
    [currentDataSource]
  )

  // --------------------------------------------------------------------------
  // Search Fields
  // --------------------------------------------------------------------------
  // ... (這裡 Search Fields 的設定與之前完全相同，為節省篇幅省略，請直接使用上一版的 useMemo 設定)
  const searchFieldsL1: SearchField[] = useMemo(
    () => [
      {
        label: '遊戲名稱',
        name: 'gameId',
        render: () => (
          <Select
            placeholder="請選擇"
            options={[{ label: '百鳥鳳凰', value: 122 }]}
            allowClear
          />
        ),
      },
      {
        label: '報表時間',
        name: 'reportTime',
        render: () => <QuickRangePicker />,
      },
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
    ],
    []
  )

  const searchFieldsL2: SearchField[] = useMemo(
    () => [
      {
        label: '指定遊戲',
        name: 'gameId',
        render: () => (
          <Select
            placeholder="請選擇"
            defaultValue={currentGame?.gameId || 122}
            options={[{ label: '百鳥鳳凰', value: 122 }]}
          />
        ),
      },
      {
        label: '會員姓名',
        name: 'memberName',
        render: () => <Input placeholder="請輸入" />,
      },
      {
        label: '報表時間',
        name: 'reportTime',
        render: () => <QuickRangePicker />,
      },
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
    ],
    [currentGame]
  )

  const searchFieldsL3: SearchField[] = useMemo(
    () => [
      {
        label: '注單號碼',
        name: 'betId',
        render: () => <Input placeholder="請輸入" />,
      },
      {
        label: '會員姓名',
        name: 'memberName',
        render: () => (
          <Input
            placeholder="請輸入"
            defaultValue={currentMember?.memberName}
          />
        ),
      },
      {
        label: '報表時間',
        name: 'reportTime',
        render: () => <QuickRangePicker />,
      },
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
    ],
    [currentMember]
  )

  const currentSearchFields =
    viewMode === 'list'
      ? searchFieldsL1
      : viewMode === 'gameDetail'
        ? searchFieldsL2
        : searchFieldsL3

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        {/* Header & Breadcrumb */}
        <div className="mb-4">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            FM後台管理系統
          </h1>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>遊戲商管理</Breadcrumb.Item>
            <Breadcrumb.Item className="font-bold">
              捕魚下注報表
            </Breadcrumb.Item>
            {viewMode === 'list' && (
              <Breadcrumb.Item>輸贏報表1</Breadcrumb.Item>
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
                    輸贏報表2
                  </span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{currentMember?.memberName}</Breadcrumb.Item>
              </>
            )}
          </Breadcrumb>
        </div>

        {/* SearchPanel */}
        <SearchPanel
          title="條件搜尋"
          fields={currentSearchFields}
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

        {/* Navigation Bar */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm font-bold">
            {viewMode === 'list' && (
              <span className="text-gray-800">輸贏報表1</span>
            )}
            {viewMode === 'gameDetail' && (
              <div className="flex items-center gap-1">
                <span
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={handleBackToList}
                >
                  輸贏報表1
                </span>
                <span className="text-gray-400">{'>'}</span>
                <span className="text-gray-800">輸贏報表2</span>
              </div>
            )}
            {viewMode === 'memberDetail' && (
              <div className="flex items-center gap-1">
                <span
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={handleBackToList}
                >
                  輸贏報表1
                </span>
                <span className="text-gray-400">{'>'}</span>
                <span
                  className="cursor-pointer text-blue-600 hover:underline"
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
            <div className="flex gap-4 text-xs font-bold text-gray-600">
              <span>
                該頁中獎金額 :{' '}
                <span className="text-gray-900">
                  {currentTotal.prizeAmount}
                </span>
              </span>
              <span>
                該頁虧損金額 :{' '}
                <span className="text-gray-900">
                  {currentTotal.netLossAmount}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* ★ 使用封裝後的 ReportTable，並傳入事件處理器 */}
        <ReportTable
          viewMode={viewMode}
          dataSource={currentDataSource}
          totalData={currentTotal}
          loading={false}
          onGoToGameDetail={handleGoToGameDetail}
          onGoToMemberDetail={handleGoToMemberDetail}
          onViewDetail={handleViewDetail}
        />
      </div>
    </ConfigProvider>
  )
}
