// src/pages/LiveBettingReport/utils/mockData.ts
import type { BettingData, GameDetailData, MemberDetailData } from '../types'

// ----------------------------------------------------------------------------
// 基礎設定 (Constants)
// ----------------------------------------------------------------------------

const DATA_COUNT = 25 // 設定資料筆數

export const PROVIDERS = [
  { code: 'DG', count: 1250 },
  { code: '歐博', count: 80 },
  { code: 'T9', count: 320 },
  { code: 'DB', count: 420 },
  { code: 'SA', count: 10 },
  { code: 'WM', count: 5 },
  { code: 'RG', count: 0 },
  { code: 'MT', count: 0 },
]

// ----------------------------------------------------------------------------
// 隨機資料產生器 (Helpers)
// ----------------------------------------------------------------------------

const GAME_NAMES = [
  '百家樂A01',
  '百家樂A02',
  '極速百家樂B01',
  '龍虎C01',
  '輪盤R01',
  '骰寶S01',
  '牛牛N01',
  '保險百家樂A03',
  '多檯百家樂M01',
  '炸金花Z01',
]

const MEMBER_NAMES = [
  '馬佩琳',
  '林哲賢',
  '王大明',
  '陳小惠',
  '張志豪',
  '李淑芬',
  '黃冠宇',
  '吳雅婷',
  '劉凱文',
  '蔡欣怡',
  '楊宗緯',
  '趙薇',
  '孫燕姿',
  '周杰倫',
  '蔡依林',
]

const BET_CONTENTS = ['莊', '閒', '和', '莊對', '閒對', '大', '小']

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const getRandomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)]

const formatMoney = (amount: number) => Math.floor(amount)

// 產生虛擬的卡牌結果字串
const generateCardResult = () => {
  const suits = ['♠', '♥', '♣', '♦']
  const ranks = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ]
  const getCard = () => `${getRandomItem(suits)}${getRandomItem(ranks)}`
  const bScore = getRandomInt(0, 9)
  const pScore = getRandomInt(0, 9)
  return `莊牌{${getCard()}-${getCard()}}：${bScore}\n閒牌{${getCard()}-${getCard()}}：${pScore}`
}

// ----------------------------------------------------------------------------
// 模擬資料生成 (Generators)
// ----------------------------------------------------------------------------

// Level 1: 遊戲總覽
export const MOCK_DATA_L1: BettingData[] = Array.from({
  length: DATA_COUNT,
}).map((_, i) => {
  const betAmount = getRandomInt(1000, 50000)
  const winLoss = getRandomInt(-betAmount, betAmount)
  const prize = betAmount + winLoss

  return {
    key: `l1_${i}`,
    gameId: 100 + i,
    gameCode: `game_code_${i + 1}`,
    gameName: GAME_NAMES[i % GAME_NAMES.length],
    betCount: getRandomInt(10, 500),
    betAmount: betAmount,
    winLoss: winLoss,
    validBetAmount: betAmount * 0.95,
    prizeAmount: prize > 0 ? prize : 0,
    netLossAmount: winLoss < 0 ? Math.abs(winLoss) : 0,
    chain: getRandomInt(0, 10),
    rtp: parseFloat(((prize / betAmount) * 100).toFixed(2)),
  }
})

// Level 2: 遊戲內 - 會員列表
export const MOCK_DATA_L2: GameDetailData[] = Array.from({
  length: DATA_COUNT,
}).map((_, i) => {
  const betAmount = getRandomInt(500, 20000)
  const winLoss = getRandomInt(-betAmount, betAmount * 1.5)
  const prize = betAmount + winLoss

  return {
    key: `l2_${i}`,
    gameId: 122,
    gameCode: 'baccara_a01',
    gameName: '百家樂A01',
    memberAccount: `09${getRandomInt(10000000, 99999999)}`,
    memberName: MEMBER_NAMES[i % MEMBER_NAMES.length],
    betCount: getRandomInt(1, 50),
    betAmount: betAmount,
    winLoss: winLoss,
    validBetAmount: betAmount,
    prizeAmount: prize > 0 ? prize : 0,
    netLossAmount: winLoss < 0 ? Math.abs(winLoss) : 0,
    chain: getRandomInt(0, 5),
    rtp: parseFloat(((prize / betAmount) * 100).toFixed(2)),
  }
})

// Level 3: 會員內 - 下注詳情
export const MOCK_DATA_L3: MemberDetailData[] = Array.from({
  length: DATA_COUNT,
}).map((_, i) => {
  const betAmount = getRandomInt(100, 5000)
  const isWin = Math.random() > 0.5
  const winLoss = isWin ? betAmount * 0.95 : -betAmount
  const prize = isWin ? betAmount + betAmount * 0.95 : 0
  const date = new Date()
  date.setMinutes(date.getMinutes() - i * 15)

  return {
    key: `l3_${i}`,
    gameName: '百家樂A01',
    tableId: `30102\n${getRandomInt(1, 20)}`,
    betId: `${34227000000 + i}`,
    betTime: date.toLocaleString('zh-TW', { hour12: false }).replace(' ', '\n'),
    memberAccount: '0903889958',
    memberName: '馬佩琳',
    betCount: 1,
    betAmount: betAmount,
    winLoss: formatMoney(winLoss),
    validBetAmount: betAmount,
    prizeAmount: formatMoney(prize),
    netLossAmount: isWin ? 0 : betAmount,
    betContent: getRandomItem(BET_CONTENTS),
    result: generateCardResult(),
    chain: getRandomInt(0, 3),
    rtp: parseFloat(((prize / betAmount) * 100).toFixed(2)),
  }
})
