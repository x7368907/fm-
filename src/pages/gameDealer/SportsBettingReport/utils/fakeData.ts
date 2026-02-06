import type {
  SportsBettingData,
  SportsGameDetailData,
  MemberBetDetailData,
} from '../types'

// ----------------------------------------------------------------------------
// 輔助資料 (用於生成隨機內容)
// ----------------------------------------------------------------------------
const GAME_TYPES = [
  { id: 122, code: 'baseball_mlb', name: '美國職業棒球大聯盟(MLB)' },
  { id: 121, code: 'basketball_nba', name: '美國職籃協會(NBA)' },
  { id: 114, code: 'tennis_usopen', name: '美國網球公開賽(US Open)' },
  { id: 118, code: 'football_nfl', name: '國家美式足球聯盟(NFL)' },
  { id: 75, code: 'esports_lol', name: '英雄聯盟(LOL)' },
  { id: 40, code: 'badminton_bwf', name: '世界羽球聯盟(BWF)' },
  { id: 88, code: 'soccer_fifa', name: '國際足總世界盃(FIFA)' },
  { id: 61, code: 'baseball_cpbl', name: '中華職棒(CPBL)' },
]

const MEMBERS = [
  { acc: '0903889958', name: '馬佩琳' },
  { acc: '0953705233', name: '林哲賢' },
  { acc: '0912345678', name: '陳建宏' },
  { acc: '0922334455', name: '王淑芬' },
  { acc: '0933445566', name: '李志豪' },
  { acc: '0988776655', name: '張雅婷' },
  { acc: '0911223344', name: '吳俊傑' },
  { acc: '0955667788', name: '劉欣怡' },
  { acc: '0966778899', name: '楊宗緯' },
  { acc: '0977889900', name: '黃曉明' },
]

const TEAMS = [
  ['勇士', '湖人'],
  ['洋基', '紅襪'],
  ['曼聯', '切爾西'],
  ['T1', 'GEN.G'],
  ['戴資穎', '陳雨菲'],
  ['兄弟', '統一'],
  ['公牛', '熱火'],
  ['道奇', '巨人'],
]

// ----------------------------------------------------------------------------
// 1. Providers
// ----------------------------------------------------------------------------
export const PROVIDERS = [
  { code: 'Super', count: 50 },
  { code: 'WG', count: 12 },
  { code: 'DB', count: 30 },
  { code: 'CMD', count: 5 },
]

// ----------------------------------------------------------------------------
// 2. MOCK_DATA_L1 (遊戲總覽 - 25筆)
// ----------------------------------------------------------------------------
export const MOCK_DATA_L1: SportsBettingData[] = Array.from({ length: 25 }).map(
  (_, i) => {
    const game = GAME_TYPES[i % GAME_TYPES.length]
    const betCount = Math.floor(Math.random() * 500) + 10
    const betAmount = betCount * (Math.floor(Math.random() * 500) + 100)
    const validBetAmount = betAmount
    const prizeAmount = Math.floor(betAmount * (Math.random() * 1.5)) // 隨機輸贏
    const netLossAmount = betAmount - prizeAmount // 虧損金額 (公司角度：正數賺，負數賠)

    return {
      key: `${i + 1}`,
      gameId: game.id,
      gameCode: game.code,
      gameName: game.name,
      betCount,
      betAmount,
      validBetAmount,
      prizeAmount,
      netLossAmount,
      maxStreak: Math.floor(Math.random() * 10),
      rtp: parseFloat((Math.random() * 100).toFixed(2)),
    }
  }
)

// ----------------------------------------------------------------------------
// 3. MOCK_DATA_L2 (遊戲內會員列表 - 25筆)
// ----------------------------------------------------------------------------
export const MOCK_DATA_L2: SportsGameDetailData[] = Array.from({
  length: 25,
}).map((_, i) => {
  const game = GAME_TYPES[i % GAME_TYPES.length] // 循環分配遊戲
  const member = MEMBERS[i % MEMBERS.length] // 循環分配會員

  const betCount = Math.floor(Math.random() * 20) + 1
  const betAmount = betCount * (Math.floor(Math.random() * 1000) + 100)
  const prizeAmount = Math.floor(betAmount * (Math.random() > 0.5 ? 1.8 : 0)) // 簡單模擬輸贏

  return {
    key: `10${i + 1}`,
    gameId: game.id,
    gameCode: game.code,
    gameName: game.name,
    memberAccount: member.acc,
    memberName: member.name,
    betCount,
    betAmount,
    validBetAmount: betAmount,
    prizeAmount,
    netLossAmount: betAmount - prizeAmount,
    maxStreak: Math.floor(Math.random() * 5),
    rtp: 0, // 個別會員通常不特別算 RTP 或為 0
  }
})

// ----------------------------------------------------------------------------
// 4. MOCK_DATA_L3 (會員詳細注單 - 25筆)
// ----------------------------------------------------------------------------
export const MOCK_DATA_L3: MemberBetDetailData[] = Array.from({
  length: 25,
}).map((_, i) => {
  const member = MEMBERS[i % MEMBERS.length]
  const game = GAME_TYPES[i % GAME_TYPES.length]
  const team = TEAMS[i % TEAMS.length]
  const isWin = Math.random() > 0.5
  const betAmount = (Math.floor(Math.random() * 10) + 1) * 100
  const prizeAmount = isWin ? Math.floor(betAmount * 1.95) : 0

  // 隨機日期時間生成
  const month = Math.floor(Math.random() * 12) + 1
  const day = Math.floor(Math.random() * 28) + 1
  const hour = Math.floor(Math.random() * 24)
  const min = Math.floor(Math.random() * 60)
  const sec = Math.floor(Math.random() * 60)
  const timeStr = `2025/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}\n${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  const settleTimeStr = `2025/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}\n${(hour + 2).toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`

  return {
    key: `20${i + 1}`,
    gameName: game.name,
    betId: `${106157640 + i}`,
    playType: i % 3 === 0 ? '讓分' : i % 3 === 1 ? '大小' : '獨贏',
    betTime: timeStr,
    settleTime: settleTimeStr,
    memberAccount: member.acc,
    memberName: member.name,
    betCount: 1,
    betAmount: betAmount,
    validBetAmount: betAmount,
    prizeAmount: prizeAmount,
    netLossAmount: betAmount - prizeAmount,
    // 模擬複雜的下注內容字串
    betContent: `[${game.name}]\n${team[0]} (主) VS ${team[1]}\n投注：${isWin ? team[0] : team[1]} @0.940\n比賽時間：2025-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} 19:00:00\n[${isWin ? '已派彩' : '未中獎'}]\n[有效注單]`,
    streak: isWin ? Math.floor(Math.random() * 3) + 1 : 0,
  }
})
