// src/pages/GroupManagement/types.ts

export interface GroupDataType {
  key?: string
  groupId: string
  groupName: string
  permissions?: Record<string, string[]>
}

export interface GroupListType extends GroupDataType {
  memberCount: number // 列表專用欄位
}
