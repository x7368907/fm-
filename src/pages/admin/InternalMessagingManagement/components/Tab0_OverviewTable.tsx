import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { MessagingRow } from '../types'

export default function Tab0_OverviewTable({
  dataSource,
}: {
  dataSource: MessagingRow[]
}) {
  const columns: ColumnsType<MessagingRow> = [
    {
      title: '月份',
      dataIndex: 'month',
      align: 'center',
      width: '30%',
      onCell: () => ({ className: 'bg-gray-50' }),
    },
    { title: '消耗總點數', dataIndex: 'pointsUsed', align: 'center' },
  ]
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      bordered
      size="middle"
      pagination={false}
    />
  )
}
