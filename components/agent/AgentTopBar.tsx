'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { Menu, ChevronDown, BarChart3, HeadphonesIcon } from 'lucide-react';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { useSidebar } from './AgentSidebarContext';

interface AgentTopBarProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export default function AgentTopBar({ title, subtitle, actions }: AgentTopBarProps) {
  const { setSidebarOpen, user } = useSidebar();
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = user?.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() ?? '??';

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between gap-4">
        {/* Left: hamburger + title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors flex-shrink-0"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 truncate">{title}</h1>
            {subtitle && (
              <p className="text-slate-500 text-xs sm:text-sm truncate hidden sm:block">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right: actions + user menu */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {actions && <div className="flex items-center gap-2">{actions}</div>}

          {/* User menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: '#319EA9' }}
              >
                {initials}
              </div>
              <span className="text-sm font-medium text-slate-700 hidden sm:block">{user?.name}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-slate-200 bg-white shadow-xl py-1.5 z-30">
                <div className="px-4 py-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-semibold text-slate-800 truncate">{user?.name}</p>
                  <p className="text-xs font-medium" style={{ color: '#319EA9' }}>
                    {user?.role === 'ADMIN' ? 'Administrator' : 'Support Agent'}
                  </p>
                </div>
                {user?.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <BarChart3 className="h-4 w-4 text-slate-400" />
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  href="/help"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <HeadphonesIcon className="h-4 w-4 text-slate-400" />
                  Customer View
                </Link>
                <div className="my-1 border-t border-slate-100" />
                <LogoutButton
                  className="w-full text-left px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 transition-colors"
                  label="Sign out"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
