// utils/fakeData.ts
import type {
  FishingBettingData,
  GameDetailData,
  MemberDetailData,
} from '../types'

// ----------------------------------------------------------------------------
// 第一層 (L1) 模擬資料：遊戲列表
// ----------------------------------------------------------------------------
export const MOCK_DATA_L1: FishingBettingData[] = [
  {
    key: '1',
    gameId: 122,
    gameCode: "BIRD'S PARADISE - FLYING TIGER",
    gameName: '百鳥鳳凰-飛虎爭霸',
    betCount: 6,
    betAmount: 100,
    validBetAmount: 500,
    prizeAmount: 100,
    netLossAmount: 400,
    maxChainIndex: 0,
    rtp: 80,
  },
  // 可以自行新增更多測試資料
]

// ----------------------------------------------------------------------------
// 第二層 (L2) 模擬資料：會員列表
// ----------------------------------------------------------------------------
export const MOCK_DATA_L2: GameDetailData[] = [
  {
    key: '101',
    gameId: 122,
    gameCode: "BIRD'S PARADISE - FLYING TIGER",
    gameName: '百鳥鳳凰-飛虎爭霸',
    memberAccount: '0903889958',
    memberName: '馬佩琳',
    betCount: 2,
    betAmount: 30,
    validBetAmount: 230,
    prizeAmount: 100,
    netLossAmount: 130,
    maxChainIndex: 2,
    rtp: 0,
  },
  {
    key: '102',
    gameId: 122,
    gameCode: "BIRD'S PARADISE - FLYING TIGER",
    gameName: '百鳥鳳凰-飛虎爭霸',
    memberAccount: '0953705233',
    memberName: '林哲賢',
    betCount: 2,
    betAmount: 30,
    validBetAmount: 30,
    prizeAmount: 0,
    netLossAmount: 30,
    maxChainIndex: 0,
    rtp: 0,
  },
]

// ----------------------------------------------------------------------------
// 第三層 (L3) 模擬資料：注單明細
// ----------------------------------------------------------------------------
export const MOCK_DATA_L3: MemberDetailData[] = [
  {
    key: '201',
    gameName: '百鳥鳳凰-飛虎爭霸',
    roomType: '歡樂廳',
    betId: '1_481651377913044992',
    betTime: '2025/06/30\n11:23:14',
    memberAccount: '0903889958',
    memberName: '馬佩琳',
    status: '已結算',
    betCount: 1,
    betAmount: 30,
    validBetAmount: 30,
    prizeAmount: 30,
    netLossAmount: 30,
    betDetailImg: 'https://placehold.co/60x40/000000/FFF?text=5X', // 假圖
    chainIndex: 2,
  },
  {
    key: '202',
    gameName: '百鳥鳳凰-飛虎爭霸',
    roomType: '歡樂廳',
    betId: '1_481651210258317312',
    betTime: '2025/06/30\n08:19:12',
    memberAccount: '0903889958',
    memberName: '馬佩琳',
    status: '已結算',
    betCount: 1,
    betAmount: 0,
    validBetAmount: 200,
    prizeAmount: 100,
    netLossAmount: 100,
    betDetailImg: 'https://placehold.co/60x40/003366/FFF?text=2X', // 假圖
    chainIndex: 1,
  },
]

// ----------------------------------------------------------------------------
// 廠商列表
// ----------------------------------------------------------------------------
export const PROVIDERS = [
  { code: 'BT', count: 3 },
  { code: '差發', count: 0 },
  // ... 其他廠商
]
