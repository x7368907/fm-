import type { DataType } from './types'

export const MOCK_DATA: DataType[] = [
  {
    key: '1',
    level: '1/5(8)',
    name: 'FMCA (金流/成勤代理-主站)',
    memberCount: 56,
    account: '0976061431',
    realName: '王大星',
    status: '啟用',
    group: '常規會員',
    regTime: '2025/04/05 12:59:49',
    loginTime: '2025/05/20 13:48:39',
    system: '佔成制',
    cycle: '週結 (每週日-23:59:59)',
  },
  {
    key: '2',
    level: '1/6(3)',
    name: 'test123 (測試帳號)',
    memberCount: 9,
    account: 'test_acc',
    realName: '陳小明',
    status: '停用',
    group: '常規會員',
    regTime: '2025/04/06 10:00:00',
    loginTime: '2025/05/21 09:30:00',
    system: '反水制',
    cycle: '週結 (每週日-23:59:59)',
  },
]
