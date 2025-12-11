import { Table } from 'antd'
import { MOCK_DATA } from '../mock'
import { getColumns } from '../columns'
import type { PointsRecord } from '../types'

export default function PointsTable({
  onUpdateNote,
  onLogs,
}: {
  onUpdateNote: (key: string, val: string) => void
  onLogs: (r: PointsRecord) => void
}) {
  return (
    <Table
      columns={getColumns({ onUpdateNote, onLogs })}
      dataSource={MOCK_DATA}
      pagination={{
        position: ['bottomLeft'],
        total: 30,
        defaultPageSize: 20,
        showTotal: (t) => `總計 ${t} 筆資料`,
        showSizeChanger: true,
      }}
      scroll={{ x: 1500 }}
      size="middle"
      rowClassName="align-top"
    />
  )
}
