import { create } from 'zustand'

interface AuthState {
    isLoggedIn: boolean
    username: string
    password: string
    setLoginUser: (username: string, password: string) => void
    setLogoutUser: () => void
  }

  export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    username: '',
    password: '',
    setLoginUser: (username, password) => set({ isLoggedIn: true, username, password }),
    setLogoutUser: () => set({ isLoggedIn: false, username: '', password: '' }),
  }))