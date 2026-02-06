// src/pages/ElectronicBettingReport/utils/fakeData.ts
import type {
  ElectronicBettingData,
  GameDetailData,
  MemberDetailData,
} from '../types'

// ----------------------------------------------------------------------------
// 0. 輔助資料與函式 (用來生成隨機數據)
// ----------------------------------------------------------------------------

const GAMES = [
  { id: 122, code: 'golden-seth', name: '戰神賽特II' },
  { id: 123, code: 'thor-hammer', name: '雷神之錘' },
  { id: 124, code: 'lucky-neko', name: '幸運招財貓' },
  { id: 125, code: 'mahjong-ways', name: '麻將發了' },
  { id: 126, code: 'dragon-hatch', name: '魔龍傳奇' },
  { id: 127, code: 'wild-bandito', name: '賞金大對決' },
]

const MEMBERS = [
  { acc: '0903889958', name: '馬佩琳' },
  { acc: '0953705233', name: '林哲賢' },
  { acc: '0905460906', name: '黃延宇' },
  { acc: '0912345678', name: '陳志豪' },
  { acc: '0988776655', name: '王美玲' },
]

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const getRandomItem = <T>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)]

const generateRandomTime = () => {
  const hour = getRandomInt(0, 23).toString().padStart(2, '0')
  const min = getRandomInt(0, 59).toString().padStart(2, '0')
  const sec = getRandomInt(0, 59).toString().padStart(2, '0')
  return `2025/06/30\n${hour}:${min}:${sec}`
}

// ----------------------------------------------------------------------------
// 1. 廠商列表 (保持不變)
// ----------------------------------------------------------------------------

export const PROVIDERS = [
  { code: 'ATG', count: 25 }, // 配合模擬資料筆數修改
  { code: 'QT', count: 0 },
  { code: 'FM', count: 12 },
  { code: 'RSG', count: 6 },
  { code: 'BNG', count: 0 },
  { code: 'BT', count: 0 },
  { code: 'FG', count: 0 },
  { code: '愛發', count: 0 },
  { code: 'CG', count: 0 },
  { code: 'GB', count: 0 },
]

// ----------------------------------------------------------------------------
// 2. L1: 電子遊戲總覽 (生成 25 筆)
// ----------------------------------------------------------------------------

export const MOCK_DATA_L1: ElectronicBettingData[] = Array.from({
  length: 25,
}).map((_, i) => {
  // 為了讓列表看起來長一點，如果遊戲池不夠，就用 index 生成虛擬遊戲
  const game = GAMES[i % GAMES.length] || {
    id: 200 + i,
    code: `slot-game-${i}`,
    name: `電子老虎機-${i + 1}`,
  }

  const betAmount = getRandomInt(1000, 500000)
  const buyBonus = Math.random() > 0.7 ? getRandomInt(5000, 100000) : 0
  const validBet = betAmount + buyBonus
  // 隨機輸贏：可能是 0 (全輸) 到 投注額的 2 倍 (大獎)
  const prize = Math.random() > 0.4 ? getRandomInt(0, validBet * 1.5) : 0
  const netLoss = validBet - prize

  return {
    key: `l1-${i}`,
    gameId: game.id,
    gameCode: game.code,
    gameName: game.name,
    betCount: getRandomInt(50, 5000),
    betAmount: betAmount,
    buyBonusAmount: buyBonus,
    validBetAmount: validBet,
    prizeAmount: prize,
    netLossAmount: netLoss,
    jackpotContribution: getRandomInt(0, 500),
    rtp: parseFloat(((prize / (validBet || 1)) * 100).toFixed(2)),
  }
})

// ----------------------------------------------------------------------------
// 3. L2: 遊戲內會員列表 (生成 25 筆)
// ----------------------------------------------------------------------------

export const MOCK_DATA_L2: GameDetailData[] = Array.from({ length: 25 }).map(
  (_, i) => {
    const game = getRandomItem(GAMES)
    const member = getRandomItem(MEMBERS)
    const betAmount = getRandomInt(100, 20000)
    const buyBonus = Math.random() > 0.8 ? getRandomInt(1000, 5000) : 0
    const validBet = betAmount + buyBonus
    const prize = Math.random() > 0.5 ? getRandomInt(0, validBet * 1.2) : 0

    return {
      key: `l2-${i}`,
      gameId: game.id,
      gameCode: game.code,
      gameName: game.name,
      memberAccount: member.acc,
      memberName: member.name,
      betCount: getRandomInt(1, 100),
      betAmount: betAmount,
      buyBonusAmount: buyBonus,
      validBetAmount: validBet,
      prizeAmount: prize,
      netLossAmount: validBet - prize,
      jackpotContribution: 0,
      // L2 沒顯示 RTP，但結構有定義可選
    }
  }
)

// ----------------------------------------------------------------------------
// 4. L3: 會員下注詳情 (生成 25 筆)
// ----------------------------------------------------------------------------

export const MOCK_DATA_L3: MemberDetailData[] = Array.from({
  length: 25,
}).map((_, i) => {
  const game = getRandomItem(GAMES)
  const member = getRandomItem(MEMBERS)
  const isBonusBuy = Math.random() > 0.8
  const betVal = isBonusBuy ? 0 : getRandomInt(10, 500)
  const bonusVal = isBonusBuy ? getRandomInt(200, 2000) : 0
  const valid = betVal + bonusVal
  const win = Math.random() > 0.6 ? getRandomInt(0, valid * 2) : 0

  return {
    key: `l3-${i}`,
    gameName: game.name,
    // 模擬長注單號換行
    betId: `${Date.now() - getRandomInt(0, 1000000)}-${getRandomInt(1000, 9999)}\n1-0`,
    betTime: generateRandomTime(),
    memberAccount: member.acc,
    memberName: member.name,
    betCount: 1,
    betAmount: betVal,
    buyBonusAmount: bonusVal,
    validBetAmount: valid,
    prizeAmount: win,
    netLossAmount: valid - win,
    jackpotContribution: 0,
  }
})
