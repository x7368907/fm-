import { useState, useMemo } from 'react'
import { Breadcrumb, ConfigProvider, Select, Input, Space, message } from 'antd'

// 引入新的 ReportTable
import ReportTable from './components/ReportTable'

// 引入共用元件 (請確認路徑)
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'

import type {
  SportsBettingData,
  SportsGameDetailData,
  MemberBetDetailData,
  ViewMode,
} from './types'
import {
  MOCK_DATA_L1,
  MOCK_DATA_L2,
  MOCK_DATA_L3,
  PROVIDERS,
} from './utils/fakeData'
import { calculateTotal } from './utils/calculations'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function SportsBettingReport() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedProvider, setSelectedProvider] = useState<string>('Super')

  // 紀錄當前選中的資料，用於麵包屑導航
  const [currentGame, setCurrentGame] = useState<SportsBettingData | null>(null)
  const [currentMember, setCurrentMember] =
    useState<SportsGameDetailData | null>(null)

  // 根據 viewMode 取得資料源
  const currentDataSource =
    viewMode === 'list'
      ? MOCK_DATA_L1
      : viewMode === 'gameDetail'
        ? MOCK_DATA_L2
        : MOCK_DATA_L3

  // 計算合計 (傳給 ReportTable 用於顯示置頂合計列)
  const currentTotal = calculateTotal(currentDataSource)

  // --- 導航 Actions ---
  const handleGoToGameDetail = (record: SportsBettingData) => {
    setCurrentGame(record)
    setViewMode('gameDetail')
    console.log(currentGame)
  }

  const handleGoToMemberDetail = (record: SportsGameDetailData) => {
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

  // 體育報表可能不需要像電子那樣彈出 Dialog，但保留 Handler
  const handleViewDetail = (record: MemberBetDetailData) => {
    console.log('查看注單詳細:', record)
  }

  const handleSearch = (values: any) => {
    console.log(`[${viewMode}] Search:`, values)
    message.success('列表已更新')
  }

  // --- Search Fields (直接定義在主檔) ---
  const searchFields = useMemo<SearchField[]>(() => {
    const commonSize = {
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
    }

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
        commonSize,
      ]
    }

    if (viewMode === 'gameDetail') {
      return [
        {
          label: '會員姓名',
          name: 'memberName',
          render: () => <Input placeholder="請輸入" />,
        },
        commonSize,
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
      commonSize,
    ]
  }, [viewMode])

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
              體育下注報表
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

        {/* 搜尋區塊 */}
        <SearchPanel
          key={viewMode}
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ pageSize: 20 }}
          onSearch={handleSearch}
        />

        {/* 遊戲商 Tabs */}
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
                <span className="text-xs opacity-70">({p.count})</span>
              </div>
            ))}
          </Space>
        </div>

        {/* 導航列與合計資訊 */}
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

          {/* L3 右上角合計資訊 */}
          {viewMode === 'memberDetail' && (
            <div className="flex gap-4 text-xs font-bold text-gray-600">
              <span>
                該頁中獎金額 :{' '}
                <span className="text-gray-900">
                  {currentTotal.prizeAmount.toLocaleString()}
                </span>
              </span>
              <span>
                該頁虧損金額 :{' '}
                <span className="text-gray-900">
                  {currentTotal.netLossAmount.toLocaleString()}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* ✅ 使用支援無限滾動的新 ReportTable 
           將 ViewMode 和 資料 傳入，讓 Table 內部決定要顯示的 Columns
        */}
        <ReportTable
          viewMode={viewMode}
          dataSource={currentDataSource}
          totalData={currentTotal}
          onGoToGameDetail={handleGoToGameDetail}
          onGoToMemberDetail={handleGoToMemberDetail}
          onViewDetail={handleViewDetail}
        />
      </div>
    </ConfigProvider>
  )
}
