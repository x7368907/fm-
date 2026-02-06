import type {
  LotteryBettingData,
  LotteryGameDetailData,
  LotteryMemberDetailData,
} from '../types'

// =============================================================================
// Helpers
// =============================================================================
const GAMES = [
  { id: 122, code: 'featured_australian_lucky_10', name: '特色澳洲幸運10' },
  { id: 121, code: 'wuxia-caishen', name: '幸運飛艇' },
  { id: 114, code: 'egyptian-mythology', name: '北京賽車' },
]

//   const NAMES = ['馬佩琳', '林哲賢', '黃廷宇', '陳志明', '王小美', '李大華']
const PLAY_TYPES = ['猜名次', '冠亞和', '單雙大小', '龍虎']
const CONTENTS = ['第六名-5', '冠軍-大', '亞軍-單', '龍', '虎', '第三名-9']

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const getRandomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)]

//   const generatePhone = () =>
//     `09${getRandomInt(10, 99)}${getRandomInt(100, 999)}${getRandomInt(1000, 9999)}`

const generateTimeStr = () =>
  `2025/06/30\n11:${getRandomInt(10, 59).toString().padStart(2, '0')}:${getRandomInt(10, 59).toString().padStart(2, '0')}`

// =============================================================================
// Exports
// =============================================================================

export const PROVIDERS = [
  { code: '9K', count: 50 },
  { code: 'WG', count: 0 },
  { code: 'DB', count: 30 },
  { code: 'MT', count: 20 },
]

export const MOCK_DATA_L1: LotteryBettingData[] = [
  {
    key: '1',
    gameId: 122,
    gameCode: 'featured_australian_lucky_10',
    gameName: '特色澳洲幸運10',
    betCount: 6,
    betAmount: 100,
    validBetAmount: 500,
    prizeAmount: 100,
    netLossAmount: 400,
    continuousWin: 2,
    rtp: 80,
  },
  {
    key: '2',
    gameId: 121,
    gameCode: 'wuxia-caishen',
    gameName: '幸運飛艇',
    betCount: 7,
    betAmount: 500,
    validBetAmount: 500,
    prizeAmount: 150,
    netLossAmount: 350,
    continuousWin: 3,
    rtp: 30,
  },
  {
    key: '3',
    gameId: 114,
    gameCode: 'egyptian-mythology',
    gameName: '北京賽車',
    betCount: 1,
    betAmount: 10,
    validBetAmount: 10,
    prizeAmount: 0,
    netLossAmount: 10,
    continuousWin: 0,
    rtp: -100,
  },
]

export const MOCK_DATA_L2: LotteryGameDetailData[] = [
  {
    key: '101',
    gameId: 122,
    gameCode: 'featured_australian_lucky_10',
    gameName: '特色澳洲幸運10',
    memberAccount: '0903889958',
    memberName: '馬佩琳',
    betCount: 2,
    betAmount: 30,
    validBetAmount: 230,
    prizeAmount: 100,
    netLossAmount: 130,
    continuousWin: 2,
  },
  {
    key: '102',
    gameId: 122,
    gameCode: 'featured_australian_lucky_10',
    gameName: '特色澳洲幸運10',
    memberAccount: '0953705233',
    memberName: '林哲賢',
    betCount: 2,
    betAmount: 30,
    validBetAmount: 30,
    prizeAmount: 0,
    netLossAmount: 30,
    continuousWin: 0,
  },
]

// 自動產生 25 筆符合 Level 3 格式的資料
export const MOCK_DATA_L3: LotteryMemberDetailData[] = Array.from({
  length: 25,
}).map((_, index) => {
  const game = getRandomItem(GAMES)
  const betAmount = getRandomItem([30, 50, 100, 200, 500])
  const isWin = Math.random() > 0.6
  const prizeAmount = isWin
    ? Math.floor(betAmount * (Math.random() * 2 + 1))
    : 0

  return {
    key: `20${index + 1}`,
    gameName: game.name,
    period: `第 ${25200 + index} 期`,
    betId: `1958${getRandomInt(100000000, 999999999)}\n08300`,
    playType: getRandomItem(PLAY_TYPES),
    betTime: generateTimeStr(),
    settleTime: generateTimeStr(),
    memberAccount: '0903889958', // 模擬同一個會員
    memberName: '馬佩琳',
    status: '已結算',
    betCount: 1,
    betAmount: betAmount,
    validBetAmount: betAmount,
    prizeAmount: prizeAmount,
    netLossAmount: betAmount - prizeAmount,
    betContent: getRandomItem(CONTENTS),
    result: getRandomItem(CONTENTS),
    continuousWin: isWin ? getRandomInt(1, 5) : 0,
  }
})
