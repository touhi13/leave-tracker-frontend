import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout';
import { useSelector } from 'react-redux';

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()

  return (
    <div className='relative h-full overflow-hidden bg-background'>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
      >
        <Layout>
          {/* ===== Top Heading ===== */}
          <LayoutHeader>
            <div className='ml-auto flex items-center space-x-4'>
              {/* <Search /> */}
              <ThemeSwitch />
              <UserNav />
            </div>
          </LayoutHeader>

          {/* ===== Main ===== */}
          <LayoutBody className='space-y-4'>
            <Outlet />
          </LayoutBody>
        </Layout>
      </main>
    </div>
  )
}
