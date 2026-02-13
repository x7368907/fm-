import type { MessagingRow } from '../types'

export const getFakeDataSource = (activeTab: string): MessagingRow[] => {
  if (activeTab === '1')
    return [
      {
        key: '1',
        provider: 'EngageLab',
        apiName: 'test_01',
        remainingPoints: 11259,
        sendTypes: ['OTP'],
        status: true,
      },
    ]
  if (activeTab === '2')
    return [
      {
        key: '1',
        subject: '測試主旨',
        target: '全部',
        msgType: 'VIP升級獎勵',
        smsStatus: true,
        internalStatus: true,
      },
    ]
  if (activeTab === '3')
    return [
      {
        key: '1',
        provider: 'EngageLab',
        remainingPoints: 11259,
        topUpFee: '22,518',
        sendTime: '2020-08-27 18:22:29',
        receiveTime: '2020-08-27 18:22:29',
        msgType: 'OTP',
        handler: '系統儲值',
      },
    ]
  if (activeTab === '4')
    return Array.from({ length: 10 }).map((_, i) => ({
      key: i.toString(),
      phone: '0900000000',
      sendTime: '2020-08-27 18:22:29',
      subject: '通知測試',
      sendStatus: '成功',
      costPoints: '2點',
      handler: '系統發送',
    }))
  return [{ key: '1', month: '202502', pointsUsed: '7點' }]
}
