import { Table } from 'antd'
import { mockData } from '../utils/fakeData'
import type { CommissionData } from '../types'
import { getColumns } from '../columns'

export default function CommissionTable({
  onEdit,
  onLogs,
}: {
  onEdit: (r: CommissionData) => void
  onLogs: (r: CommissionData) => void
}) {
  return (
    <Table
      className="[&_.ant-table-pagination]:!justify-start"
      columns={getColumns({ onEdit, onLogs })}
      dataSource={mockData}
      bordered
      scroll={{ x: 1300 }}
      pagination={{
        position: ['bottomLeft'],
        total: mockData.length,
        showSizeChanger: true,
        defaultPageSize: 20,
        showTotal: (total) => `總計 ${total} 筆資料`,
      }}
    />
  )
}
