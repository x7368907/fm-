// stores/useCommissionStore.ts
import { create } from 'zustand'
import type { CommissionData } from '../pages/AgentList/AgentCommission/types' // 路徑自行調整

export type CommissionSystem = 'share' | 'water'

interface CommissionStore {
  plans: CommissionData[]
  setPlans: (plans: CommissionData[]) => void
  getPlansBySystem: (system: CommissionSystem) => CommissionData[]
}

export const useCommissionStore = create<CommissionStore>((set, get) => ({
  plans: [],

  setPlans: (plans) => set({ plans }),

  getPlansBySystem: (system) =>
    get().plans.filter(
      (p) => (p.system === '佔成制' ? 'share' : 'water') === system
    ),
}))
