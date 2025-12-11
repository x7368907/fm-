import { Table } from 'antd'
import { MOCK_DATA } from '../mock'
import { getColumns } from '../columns'
import type { DataType } from '../types'

export default function AgentTable({
  onEdit,
  onLogs,
  onViewFrontend,
  onPoints,
}: {
  onEdit: (r: DataType) => void
  onLogs: (r: DataType) => void
  onViewFrontend: (r: DataType) => void
  onPoints: (r: DataType) => void
}) {
  return (
    <Table
      columns={getColumns({ onEdit, onLogs, onViewFrontend, onPoints })}
      dataSource={MOCK_DATA}
      scroll={{ x: 1800 }}
      pagination={{
        position: ['bottomLeft'],
        total: MOCK_DATA.length,
        defaultPageSize: 20,
        showSizeChanger: true,
      }}
    />
  )
}
