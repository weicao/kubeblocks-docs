'use client';

import { useGlobalStore } from '@/store/global';
import { Drawer, Toolbar } from '@mui/material';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const width = 280;

  const { sidebarCollapsed, isMobile, toggleSidebarCollapsed } =
    useGlobalStore();

  return (
    <>
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={!sidebarCollapsed}
        sx={{ width }}
        onClose={() => toggleSidebarCollapsed(true)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width,
            background: 'var(--css-palette-background-default)',
          },
        }}
      >
        <Toolbar />
        {children}
      </Drawer>
    </>
  );
}
