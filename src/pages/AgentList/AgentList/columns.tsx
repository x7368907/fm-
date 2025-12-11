import type { ColumnsType } from 'antd/es/table'
import { Tag } from 'antd'
import ActionDropdown from './components/ActionDropdown'
import type { DataType } from './types'

export const getColumns = (opts: {
  onEdit: (record: DataType) => void
  onLogs: (record: DataType) => void
  onViewFrontend: (record: DataType) => void
  onPoints: (record: DataType) => void
}): ColumnsType<DataType> => [
  {
    title: '代理級別',
    dataIndex: 'level',
    width: 100,
    fixed: 'left',
    render: (text) => (
      <span className="cursor-pointer text-blue-500">{text}</span>
    ),
  },
  {
    title: '代理名稱',
    dataIndex: 'name',
    width: 220,
    ellipsis: true,
  },
  {
    title: '會員數量',
    dataIndex: 'memberCount',
    width: 90,
    align: 'center',
    render: (text) => (
      <span className="cursor-pointer text-blue-600 underline">{text}</span>
    ),
  },
  { title: '代理帳號', dataIndex: 'account', width: 120 },
  { title: '代理姓名', dataIndex: 'realName', width: 90 },

  {
    title: '帳號狀態',
    dataIndex: 'status',
    width: 90,
    render: (text) => (
      <Tag color={text === '啟用' ? 'green' : 'red'}>{text}</Tag>
    ),
  },

  { title: '金流群組', dataIndex: 'group', width: 100 },

  {
    title: '註冊 / 登入時間',
    width: 180,
    render: (_, record) => (
      <div className="text-xs text-gray-500">
        <div>{record.regTime}</div>
        <div className="mt-1">{record.loginTime}</div>
      </div>
    ),
  },

  { title: '分潤制度', dataIndex: 'system', width: 90 },
  { title: '代理分潤結算', dataIndex: 'cycle', width: 180 },

  {
    title: '管理',
    key: 'action',
    width: 100,
    fixed: 'right',
    align: 'center',
    render: (_, record) => (
      <ActionDropdown
        record={record}
        onEdit={opts.onEdit}
        onLogs={opts.onLogs}
        onViewFrontend={opts.onViewFrontend}
        onPoints={opts.onPoints}
      />
    ),
  },
]
