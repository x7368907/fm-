import { Layout, Menu, Typography } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const { Header, Sider, Content } = Layout
const { Title } = Typography

const menuItems = [
  {
    key: 'home',
    label: '首頁',
    path: '/home',
  },
  {
    key: 'agent',
    label: '代理管理',
    path: '/home/agent/list', // 預設點擊父選單跳轉路徑
    children: [
      {
        key: 'agent/commission',
        label: '分潤管理',
        path: '/home/agent/commission',
      },
      { key: 'agent/list', label: '代理資料', path: '/home/agent/list' },
      {
        key: 'agent/point',
        label: '點數加扣點資料',
        path: '/home/agent/point',
      },
      {
        key: 'agent/changeLine',
        label: '代理換線紀錄',
        path: '/home/agent/changeLine',
      },
      {
        key: 'agent/profitManagement',
        label: '代理分潤管理',
        path: '/home/agent/profitManagement',
      },
    ],
  },
  {
    key: 'member',
    label: '會員管理',
    path: '/home/member',
  },
  {
    key: 'ops',
    label: '營運管理',
    path: '/home/ops',
  },
  {
    key: 'finance',
    label: '財務管理',
    path: '/home/finance',
  },
  {
    key: 'game',
    label: '遊戲商管理',
    path: '/home/game',
  },
  {
    key: 'admin',
    label: '後台管理',
    path: '/home/admin',
  },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [openKeys, setOpenKeys] = useState<string[]>([])

  const getSelectedKeys = () => {
    const path = location.pathname
    const match = menuItems
      .flatMap((item) => item.children || [item])
      .find((sub) => sub.path === path)
    return match ? [match.key] : []
  }

  useEffect(() => {
    const current = menuItems.find((item) => {
      if (!item.children) return false
      return item.children.some((child) =>
        location.pathname.startsWith(child.path)
      )
    })
    if (current) setOpenKeys([current.key])
  }, [location.pathname])
  const handleClick = (e: any) => {
    const flatMenu = menuItems.flatMap((item) => item.children || [item])
    const target = flatMenu.find((i) => i.key === e.key)

    // 如果是點到父層選單，直接導航到它的 path（預設第一個子選單）
    if (!target) {
      const parent = menuItems.find((item) => item.key === e.key)
      if (parent?.path) navigate(parent.path)
    } else {
      navigate(target.path)
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="light">
        <Menu
          mode="inline"
          selectedKeys={getSelectedKeys()}
          openKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys)}
          onClick={handleClick}
          style={{ height: '100%', borderRight: 0 }}
        >
          {menuItems.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} title={item.label}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key}>{child.label}</Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            )
          )}
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px' }}>
          <Title level={4} style={{ margin: 0 }}>
            FM後台管理系統
          </Title>
        </Header>
        <Content style={{ margin: '16px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
