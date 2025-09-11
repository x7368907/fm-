// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import { useAuthStore } from './store/auth'
import { useEffect } from 'react'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/Home'
// 代理管理-start
import AgentList from './pages/AgentList/AgentList'
import AgentCommission from './pages/AgentList/AgentCommission'
import PointsDetail from './pages/AgentList/PointsDetail'
import ChangeLine from './pages/AgentList/ChangeLine'
import ProfitManagement from './pages/AgentList/ProfitManagement'
// 代理管理-end

export default function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const initializeAuth = useAuthStore((state) => state.initializeAuth)

  useEffect(() => {
    initializeAuth()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
        />

        {isLoggedIn && (
          <Route path="/home" element={<AdminLayout />}>
            <Route index element={<Home />} />
            <Route path="agent">
              <Route path="commission" element={<AgentCommission />} />
              <Route path="list" element={<AgentList />} />
              <Route path="point" element={<PointsDetail />} />
              <Route path="changeLine" element={<ChangeLine />} />
              <Route path="profitManagement" element={<ProfitManagement />} />
            </Route>
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  )
}
