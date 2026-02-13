import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { MessagingRow } from '../types'

export default function Tab4_HistoryTable({
  dataSource,
}: {
  dataSource: MessagingRow[]
}) {
  const columns: ColumnsType<MessagingRow> = [
    { title: '接收門號', dataIndex: 'phone', align: 'center' },
    { title: '發送時間', dataIndex: 'sendTime', align: 'center' },
    { title: '訊息主旨', dataIndex: 'subject', align: 'center' },
    { title: '發送狀態', dataIndex: 'sendStatus', align: 'center' },
    { title: '花費點數', dataIndex: 'costPoints', align: 'center' },
    { title: '經手人', dataIndex: 'handler', align: 'center' },
  ]
  return (
    <Table columns={columns} dataSource={dataSource} bordered size="middle" />
  )
}
