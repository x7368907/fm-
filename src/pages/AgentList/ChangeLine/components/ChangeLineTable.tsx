import { Table } from 'antd'
import { getColumns } from '../columns'
import { MOCK_DATA } from '../mock'
import type { ChangeLineDataType } from '../types'

export default function ChangeLineTable({
  onLogs,
}: {
  onLogs: (r: ChangeLineDataType) => void
}) {
  return (
    <Table
      columns={getColumns({ onLogs })}
      dataSource={MOCK_DATA}
      scroll={{ x: 1300 }}
      pagination={{
        position: ['bottomLeft'],
        total: 75,
        defaultPageSize: 20,
        showSizeChanger: true,
        showTotal: (t) => `總計 ${t} 筆資料`,
      }}
      rowClassName="hover:bg-blue-50"
    />
  )
}
