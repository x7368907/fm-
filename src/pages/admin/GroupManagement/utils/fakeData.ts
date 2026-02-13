// src/pages/GroupManagement/utils/fakeData.ts
import type { GroupListType } from '../types'

export const DEPARTMENT_OPTIONS = [
  { label: '全部', value: 'all' },
  { label: '業務部', value: '業務部' },
  { label: '會計部', value: '會計部' },
  { label: '產品專案部', value: '產品專案部' },
  { label: '設計部', value: '設計部' },
  { label: '研發部', value: '研發部' },
  { label: '客服部', value: '客服部' },
  { label: '風控部', value: '風控部' },
]

export const INITIAL_DATA: GroupListType[] = [
  { key: '1', groupId: '20250705001', groupName: '業務部', memberCount: 13 },
  { key: '2', groupId: '20250705002', groupName: '會計部', memberCount: 3 },
  { key: '3', groupId: '20250705003', groupName: '產品專案部', memberCount: 5 },
  { key: '4', groupId: '20250705004', groupName: '設計部', memberCount: 2 },
  { key: '5', groupId: '20250705005', groupName: '研發部', memberCount: 8 },
  { key: '6', groupId: '20250705006', groupName: '客服部', memberCount: 12 },
  { key: '7', groupId: '20250705007', groupName: '風控部', memberCount: 4 },
  { key: '8', groupId: '20250705008', groupName: '業務部', memberCount: 9 },
  { key: '9', groupId: '20250705009', groupName: '產品專案部', memberCount: 6 },
  { key: '10', groupId: '20250705010', groupName: '研發部', memberCount: 15 },
  { key: '11', groupId: '20250705011', groupName: '客服部', memberCount: 8 },
  { key: '12', groupId: '20250705012', groupName: '設計部', memberCount: 4 },
  { key: '13', groupId: '20250705013', groupName: '業務部', memberCount: 7 },
  { key: '14', groupId: '20250705014', groupName: '會計部', memberCount: 2 },
  { key: '15', groupId: '20250705015', groupName: '風控部', memberCount: 3 },
  { key: '16', groupId: '20250705016', groupName: '研發部', memberCount: 10 },
  {
    key: '17',
    groupId: '20250705017',
    groupName: '產品專案部',
    memberCount: 4,
  },
  { key: '18', groupId: '20250705018', groupName: '客服部', memberCount: 20 },
  { key: '19', groupId: '20250705019', groupName: '業務部', memberCount: 5 },
  { key: '20', groupId: '20250705020', groupName: '設計部', memberCount: 3 },
  { key: '21', groupId: '20250705021', groupName: '研發部', memberCount: 18 },
  { key: '22', groupId: '20250705022', groupName: '客服部', memberCount: 6 },
  { key: '23', groupId: '20250705023', groupName: '業務部', memberCount: 11 },
  {
    key: '24',
    groupId: '20250705024',
    groupName: '產品專案部',
    memberCount: 7,
  },
  { key: '25', groupId: '20250705025', groupName: '風控部', memberCount: 2 },
]
