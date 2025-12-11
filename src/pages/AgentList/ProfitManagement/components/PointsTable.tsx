import { Table, Card } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { DataType } from '../types'

interface Props {
  dataSource: DataType[]
  columns: ColumnsType<DataType>
}

export default function PointsTable({ dataSource, columns }: Props) {
  return (
    <Card bordered={false} className="shadow-sm">
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 1300 }}
        pagination={{
          position: ['bottomLeft'],
          total: 75,
          showTotal: (total) => `總計 ${total} 筆資料`,
          defaultPageSize: 20,
          showSizeChanger: true,
        }}
        size="middle"
        rowClassName="hover:bg-blue-50"
      />
    </Card>
  )
}
