import { useState, useMemo } from 'react'
import { Breadcrumb, ConfigProvider, Select, Input, Space, message } from 'antd'

// Components & Modules
import ReportTable from './components/ReportTable'
import { getColumnsL1 } from './components/columns/columnsL1'
import { getColumnsL2 } from './components/columns/columnsL2'
import { getColumnsL3 } from './components/columns/columnsL3'
import {
  MOCK_DATA_L1,
  MOCK_DATA_L2,
  MOCK_DATA_L3,
  PROVIDERS,
} from './utils/fakeData'
import { calculateTotal } from './utils/calculations'
import type {
  ViewMode,
  LotteryBettingData,
  LotteryGameDetailData,
  LotteryMemberDetailData,
} from './types'

// Shared
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function LotteryBettingReport() {
  // State
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedProvider, setSelectedProvider] = useState<string>('9K')

  // Drill-down State
  const [currentGame, setCurrentGame] = useState<LotteryBettingData | null>(
    null
  )
  const [currentMember, setCurrentMember] =
    useState<LotteryGameDetailData | null>(null)

  // Data Source Logic (Simulate Full Data for Infinite Scroll)
  const currentDataSource = useMemo(() => {
    if (viewMode === 'gameDetail') return MOCK_DATA_L2
    if (viewMode === 'memberDetail') return MOCK_DATA_L3
    return MOCK_DATA_L1
  }, [viewMode, selectedProvider])

  const currentTotal = useMemo(
    () => calculateTotal(currentDataSource),
    [currentDataSource]
  )

  // --- Handlers ---
  const handleGoToGameDetail = (record: LotteryBettingData) => {
    setCurrentGame(record)
    setViewMode('gameDetail')
    console.log(currentGame)
  }
  const handleGoToMemberDetail = (record: LotteryGameDetailData) => {
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
  const handleViewDetail = (record: LotteryMemberDetailData) => {
    message.info(`檢視注單: ${record.betId.replace('\n', '')}`)
  }
  const handleSearch = (values: any) => {
    console.log(`[${viewMode}] Search:`, values)
    message.success('列表已更新')
  }

  // --- Columns Configuration ---
  const columns = useMemo(() => {
    if (viewMode === 'gameDetail')
      return getColumnsL2(currentTotal, handleGoToMemberDetail)
    if (viewMode === 'memberDetail')
      return getColumnsL3(currentTotal, handleViewDetail)
    return getColumnsL1(currentTotal, handleGoToGameDetail)
  }, [viewMode, currentTotal])

  // --- Search Fields Configuration ---
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
        {/* Header */}
        <div className="mb-4">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            FM後台管理系統
          </h1>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>遊戲商管理</Breadcrumb.Item>
            <Breadcrumb.Item className="font-bold">
              彩票下注報表
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>

        {/* Search */}
        <SearchPanel
          key={viewMode}
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

        {/* Navigation Bar */}
        <div className="mb-2 flex items-center justify-between pl-1">
          <div className="flex items-center gap-1 text-sm font-bold">
            {viewMode === 'list' && (
              <span className="font-bold text-gray-800">輸贏報表1</span>
            )}

            {viewMode === 'gameDetail' && (
              <div className="flex items-center gap-1">
                <span
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={handleBackToList}
                >
                  輸贏報表1
                </span>
                <span className="text-gray-600">{'>'}</span>
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
                <span className="text-gray-600">{'>'}</span>
                <span
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={handleBackToGameDetail}
                >
                  輸贏報表2
                </span>
                <span className="text-gray-600">{'>'}</span>
                <span className="text-gray-800">
                  {currentMember?.memberName}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <ReportTable
          viewMode={viewMode}
          columns={columns}
          dataSource={currentDataSource}
        />
      </div>
    </ConfigProvider>
  )
}
