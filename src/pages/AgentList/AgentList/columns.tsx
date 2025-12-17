import type { ColumnsType } from 'antd/es/table'
import { Tag } from 'antd'
import ActionDropdown from './components/ActionDropdown'
import type { DataType } from './types'

export const getColumns = (opts: {
  onEdit: (record: DataType) => void
  onLogs: (record: DataType) => void
  onViewFrontend: (record: DataType) => void
  onPoints: (record: DataType) => void
  onLevelClick: (record: DataType) => void
}): ColumnsType<DataType> => [
  {
    title: '代理級別',
    width: 120,
    render: (_, record) => {
      const { currentLevel, maxLevel, childCount } = record

      const isMaxLevel = currentLevel >= maxLevel
      const canGoNext = !isMaxLevel && childCount > 0

      // 👉 組顯示文字
      const levelText =
        childCount > 0
          ? `${currentLevel}/${maxLevel}(${childCount})`
          : `${currentLevel}/${maxLevel}`

      return (
        <span
          onClick={() => {
            if (canGoNext) {
              opts.onLevelClick(record)
            }
          }}
          className={
            canGoNext
              ? 'cursor-pointer text-blue-600 underline'
              : 'cursor-default text-black'
          }
        >
          {levelText}
        </span>
      )
    },
  },
  {
    title: '代理名稱',
    dataIndex: 'name',
    width: 100,
  },

  {
    title: '會員數量',
    dataIndex: 'memberCount',
    width: 90,
    align: 'center',
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

  {
    title: '管理',
    width: 100,
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
