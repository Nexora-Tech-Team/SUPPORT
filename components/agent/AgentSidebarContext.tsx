'use client';

import { createContext, useContext } from 'react';
import type { SessionUser } from '@/lib/types';

interface AgentSidebarContextValue {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  user: SessionUser | null;
}

export const AgentSidebarContext = createContext<AgentSidebarContextValue>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
  user: null,
});

export function useSidebar() {
  return useContext(AgentSidebarContext);
}
