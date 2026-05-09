'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Inbox,
  LayoutDashboard,
  Settings,
  Users,
  X,
} from 'lucide-react';
import { AgentSidebarContext } from './AgentSidebarContext';
import type { SessionUser } from '@/lib/types';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',  href: '/agent' },
  { icon: Inbox,           label: 'All Tickets', href: '/agent/tickets' },
  { icon: Users,           label: 'Customers',   href: '/agent/customers' },
  { icon: BarChart3,       label: 'Reports',     href: '/agent/reports' },
  { icon: Settings,        label: 'Settings',    href: '/agent/settings' },
];

export default function AgentShell({ user, children }: { user: SessionUser; children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <AgentSidebarContext.Provider value={{ sidebarOpen, setSidebarOpen, user }}>
      <div className="h-screen flex bg-white overflow-hidden">

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out md:relative md:inset-auto md:z-auto md:flex md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <aside
            className="w-60 flex flex-col h-full min-h-screen"
            style={{
              background: '#319EA9',
              borderRight: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {/* Logo */}
            <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
              <Link href="/agent" className="flex items-center gap-2.5" onClick={() => setSidebarOpen(false)}>
                <Image src="/nexora-logo.png" alt="Nexora" width={80} height={24} className="object-contain" />
                <div>
                  <div className="font-bold text-white text-sm leading-tight">Support</div>
                  <div className="text-xs text-white/70">Agent Portal</div>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="md:hidden p-1.5 rounded-lg transition-colors text-white/50 hover:text-white"
                style={{ background: 'rgba(255,255,255,0.08)' }}
                aria-label="Close sidebar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = item.href === '/agent' ? pathname === '/agent' : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={isActive ? {
                      background: 'rgba(255,255,255,0.2)',
                      color: '#ffffff',
                      borderLeft: '3px solid #ffffff',
                    } : {
                      color: 'rgba(255,255,255,0.75)',
                      borderLeft: '3px solid transparent',
                    }}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>

        {/* Main area — topbar is first child (sticky), content scrolls */}
        <main className="flex-1 min-w-0 bg-slate-50 flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </AgentSidebarContext.Provider>
  );
}
