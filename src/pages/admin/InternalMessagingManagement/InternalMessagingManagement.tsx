import { useMemo, useState } from 'react'
import {
  ConfigProvider,
  Breadcrumb,
  Button,
  Select,
  DatePicker,
  Input,
} from 'antd'
import { useMessagingManagement } from './hook/useMessagingManagement'
import { getFakeDataSource } from './utils/fakeData'
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'
import HandlerModal, {
  type HandlerLogData,
} from '../../AgentList/components/HandlerModal'

import Tab0_OverviewTable from './components/Tab0_OverviewTable'
import Tab1_ProviderTable from './components/Tab1_ProviderTable'
import Tab2_SettingsTable from './components/Tab2_SettingsTable'
import Tab3_TopUpTable from './components/Tab3_TopUpTable'
import Tab4_HistoryTable from './components/Tab4_HistoryTable'

import MessagingProviderCreate from './form/MessagingProviderCreate'
import MessagingTopUpCreate from './form/MessagingTopUpCreate'
import MessageEditModal from './form/MessageEditModal'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function InternalMessagingManagement() {
  const {
    activeTab,
    handleTabChange,
    viewMode,
    setViewMode,
    editingRecord,
    isMsgModalOpen,
    setIsMsgModalOpen,
    handleAction,
  } = useMessagingManagement()

  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  const dataSource = useMemo(() => getFakeDataSource(activeTab), [activeTab])

  /** 根據 Tab 定義搜尋欄位 */
  const searchFields: SearchField[] = useMemo(() => {
    if (!activeTab) {
      return [
        {
          label: '月份',
          name: 'month',
          render: () => <DatePicker picker="month" className="w-full" />,
        },
        {
          label: '每頁顯示筆數',
          name: 'pageSize',
          render: () => (
            <Select defaultValue={20} options={[{ label: '20', value: 20 }]} />
          ),
        },
      ]
    }
    if (activeTab === '1') {
      return [
        {
          label: '發送狀態',
          name: 'status',
          render: () => (
            <Select
              defaultValue="all"
              options={[{ label: '全部', value: 'all' }]}
            />
          ),
        },
        {
          label: '發送時間',
          name: 'sendTime',
          render: () => <QuickRangePicker />,
        },
      ]
    }
    if (activeTab === '2') {
      return [
        {
          label: '寄送類型',
          name: 'sendType',
          render: () => (
            <Select
              defaultValue="handheld"
              options={[{ label: '手機簡訊', value: 'handheld' }]}
            />
          ),
        },
        {
          label: '簡訊寄送',
          name: 'smsSend',
          render: () => (
            <Select
              defaultValue="all"
              options={[{ label: '全部', value: 'all' }]}
            />
          ),
        },
        {
          label: '信件寄送',
          name: 'mailSend',
          render: () => (
            <Select
              defaultValue="all"
              options={[{ label: '全部', value: 'all' }]}
            />
          ),
        },
      ]
    }
    if (activeTab === '3') {
      return [
        {
          label: '發送時間',
          name: 'sendTime',
          render: () => <QuickRangePicker />,
        },
      ]
    }
    return [
      {
        label: '發送狀態',
        name: 'status',
        render: () => (
          <Select
            defaultValue="all"
            options={[{ label: '全部', value: 'all' }]}
          />
        ),
      },
      {
        label: '發送時間',
        name: 'sendTime',
        render: () => <QuickRangePicker />,
      },
      {
        label: '手機號碼',
        name: 'phone',
        render: () => <Input placeholder="請輸入" />,
      },
    ]
  }, [activeTab])

  const fetchLogs = () => {
    setCurrentLogs([
      {
        key: '1',
        time: '2026-02-05',
        handler: 'admin',
        status: '修改',
        details: '修改配置',
      },
    ])
    setIsHandlerModalOpen(true)
  }

  const renderContent = () => {
    switch (activeTab) {
      case '1':
        return (
          <Tab1_ProviderTable
            dataSource={dataSource}
            onEdit={(r) => handleAction('1', r)}
            onShowLogs={fetchLogs}
          />
        )
      case '2':
        return (
          <Tab2_SettingsTable
            dataSource={dataSource}
            onEdit={(r) => handleAction('2', r)}
          />
        )
      case '3':
        return <Tab3_TopUpTable dataSource={dataSource} />
      case '4':
        return <Tab4_HistoryTable dataSource={dataSource} />
      default:
        return <Tab0_OverviewTable dataSource={dataSource} />
    }
  }

  if (viewMode === 'form')
    return (
      <MessagingProviderCreate
        initialValues={editingRecord}
        onCancel={() => setViewMode('list')}
        onSave={() => setViewMode('list')}
      />
    )
  if (viewMode === 'topup')
    return (
      <MessagingTopUpCreate
        onCancel={() => setViewMode('list')}
        onSave={() => setViewMode('list')}
      />
    )

  return (
    <ConfigProvider theme={theme}>
      <div className="flex h-[calc(100vh-64px)] flex-col overflow-hidden bg-gray-100 px-4">
        <Breadcrumb separator=">" className="shrink-0 px-4 py-4 text-sm">
          <Breadcrumb.Item>後台管理</Breadcrumb.Item>
          <Breadcrumb.Item
            className={
              activeTab
                ? 'cursor-pointer text-teal-600'
                : 'font-bold text-gray-800'
            }
            onClick={() => handleTabChange('')}
          >
            站內信管理
          </Breadcrumb.Item>
          {activeTab && (
            <Breadcrumb.Item className="font-bold">
              {
                ['訊息商串接', '簡訊 / 信件設定', '儲值紀錄', '發送紀錄'][
                  Number(activeTab) - 1
                ]
              }
            </Breadcrumb.Item>
          )}
        </Breadcrumb>

        <SearchPanel
          fields={searchFields}
          onCreate={
            activeTab === '1' || activeTab === '2' || activeTab === '3'
              ? () => handleAction(activeTab)
              : undefined
          }
          onSearch={(v) => console.log('搜尋:', v)}
        />

        <div className="mt-6 flex shrink-0 items-center justify-between px-1">
          <div className="flex gap-2">
            {['訊息商串接', '簡訊/信件設定', '儲值紀錄', '發送紀錄'].map(
              (label, idx) => (
                <Button
                  key={idx + 1}
                  type={
                    activeTab === (idx + 1).toString() ? 'primary' : 'default'
                  }
                  onClick={() => handleTabChange((idx + 1).toString())}
                >
                  {label}
                </Button>
              )
            )}
          </div>
          {activeTab === '' && (
            <div className="font-bold">簡訊剩餘點數：2365</div>
          )}
          {activeTab === '4' && (
            <div className="text-sm font-bold text-gray-500">
              花費點數總計：684
            </div>
          )}
        </div>

        <div className="mb-4 mt-4 flex flex-1 flex-col overflow-hidden rounded-lg border bg-white shadow-sm">
          {renderContent()}
        </div>
      </div>

      <MessageEditModal
        open={isMsgModalOpen}
        onCancel={() => setIsMsgModalOpen(false)}
        initialValues={editingRecord}
        onSave={() => setIsMsgModalOpen(false)}
      />
      <HandlerModal
        open={isHandlerModalOpen}
        onCancel={() => setIsHandlerModalOpen(false)}
        logs={currentLogs}
      />
    </ConfigProvider>
  )
}
