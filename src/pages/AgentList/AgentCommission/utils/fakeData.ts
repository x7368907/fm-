import type { CommissionData } from '../types'

export const mockData: CommissionData[] = Array.from({ length: 50 }).map(
  (_, i) => {
    const isShareMode = i % 2 === 0

    return {
      key: `${i + 1}`,
      system: isShareMode ? '佔成制' : '反水制',
      name: isShareMode ? `合營計畫 ${i + 1}` : `退水方案 ${i + 1}`,
      agentLevel: '任一層級',
      agentName: '任一代理',

      /** ✅ 佔成制才有佔成比例 */
      shareRatio: isShareMode ? 90 : 0,

      /** ✅ 只有反水制才給返水假資料 */
      rebateLive: isShareMode ? 0 : 0.4,
      rebateElec: isShareMode ? 0 : 0.4,
      rebateSport: isShareMode ? 0 : 0.3,
      rebateLottery: 0,
      rebateChess: isShareMode ? 0 : 0.4,
      rebateFish: isShareMode ? 0 : 0.4,

      settlement: i % 3 === 0 ? '月結' : '週結',
    }
  }
)
