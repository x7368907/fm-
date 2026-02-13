export interface PeopleDataType {
  key?: string
  employeeId: string
  name: string
  department: string
  email: string
}

export interface HandlerLogData {
  key: string
  time: string
  handler: string
  status: string
  details: string
}
