import { Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { MessagingRow } from '../types'

export default function Tab3_TopUpTable({
  dataSource,
}: {
  dataSource: MessagingRow[]
}) {
  const columns: ColumnsType<MessagingRow> = [
    { title: '供應商', dataIndex: 'provider', align: 'center' },
    {
      title: '儲值點數',
      dataIndex: 'remainingPoints',
      align: 'center',
      render: (v) => v?.toLocaleString(),
    },
    { title: '儲值費用', dataIndex: 'topUpFee', align: 'center' },
    { title: '發送時間', dataIndex: 'sendTime', align: 'center' },
    { title: '接收時間', dataIndex: 'receiveTime', align: 'center' },
    {
      title: '寄送類型',
      dataIndex: 'msgType',
      align: 'center',
      render: (t) => <Tag>{t}</Tag>,
    },
    { title: '經手人', dataIndex: 'handler', align: 'center' },
  ]
  return (
    <Table columns={columns} dataSource={dataSource} bordered size="middle" />
  )
}
