import { Table, Tag, Switch, Dropdown, Button } from 'antd'
import { DownOutlined, EditOutlined, FileTextOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { MessagingRow } from '../types'

interface Props {
  dataSource: MessagingRow[]
  onEdit: (r: MessagingRow) => void
  onShowLogs: (r: MessagingRow) => void
}

export default function Tab1_ProviderTable({
  dataSource,
  onEdit,
  onShowLogs,
}: Props) {
  const columns: ColumnsType<MessagingRow> = [
    { title: '訊息商', dataIndex: 'provider', align: 'center' },
    { title: 'API 憑證名稱', dataIndex: 'apiName', align: 'center' },
    {
      title: '剩餘點數',
      dataIndex: 'remainingPoints',
      align: 'center',
      render: (v) => v?.toLocaleString(),
    },
    {
      title: '發送類型',
      dataIndex: 'sendTypes',
      render: (tags) => (
        <div className="flex gap-1">
          {tags?.map((t: any) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      ),
    },
    { title: '點數警示下限', align: 'center', render: () => '100' },
    {
      title: '啟停用',
      dataIndex: 'status',
      align: 'center',
      render: (s) => (
        <Switch
          checkedChildren="ON"
          unCheckedChildren="OFF"
          defaultChecked={s}
        />
      ),
    },
    {
      title: '管理',
      align: 'center',
      render: (_, r) => (
        <Dropdown
          menu={{
            items: [
              { key: 'edit', label: '編輯', icon: <EditOutlined /> },
              { key: 'logs', label: '經手人', icon: <FileTextOutlined /> },
            ],
            onClick: ({ key }) => (key === 'edit' ? onEdit(r) : onShowLogs(r)),
          }}
        >
          <Button size="small">
            管理 <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ]
  return (
    <Table columns={columns} dataSource={dataSource} bordered size="middle" />
  )
}
