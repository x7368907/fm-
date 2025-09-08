// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import { useAuthStore } from './store/auth'
import AgentList from './pages/AgentList/AgentList'
import AgentCommission from './pages/AgentList/AgentCommission'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/Home'

export default function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  return (
    <BrowserRouter>
      <Routes>
        {/* 未登入者導向登入頁 */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />

        {/* 登入者使用 AdminLayout 包住後台所有頁面 */}
        {isLoggedIn && (
         <Route path="/home" element={<AdminLayout />}>
         <Route index element={<Home />} /> {/* /home 預設頁面 */}
         <Route path="agent/list" element={<AgentList />} />
         <Route path="agent/commission" element={<AgentCommission />} />
       </Route>
        )}
      </Routes>
    </BrowserRouter>
  )
}
