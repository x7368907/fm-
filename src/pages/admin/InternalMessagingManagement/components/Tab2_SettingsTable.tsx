import { Table, Switch, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { MessagingRow } from '../types'

export default function Tab2_SettingsTable({
  dataSource,
  onEdit,
}: {
  dataSource: MessagingRow[]
  onEdit: (r: MessagingRow) => void
}) {
  const columns: ColumnsType<MessagingRow> = [
    { title: '訊息主旨', dataIndex: 'subject', align: 'center' },
    { title: '寄送對象', dataIndex: 'target', align: 'center' },
    { title: '寄送類型', dataIndex: 'msgType', align: 'center' },
    {
      title: '簡訊寄送',
      align: 'center',
      render: () => <Switch defaultChecked />,
    },
    {
      title: '站內信寄送',
      align: 'center',
      render: () => <Switch defaultChecked />,
    },
    {
      title: '設定',
      align: 'center',
      render: (_, r) => (
        <Button icon={<EditOutlined />} onClick={() => onEdit(r)} />
      ),
    },
  ]
  return (
    <Table columns={columns} dataSource={dataSource} bordered size="middle" />
  )
}
