'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, UserCircle2 } from 'lucide-react';
import { LogoutButton } from '@/components/auth/LogoutButton';

export default function CustomerNav({ userName }: { userName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-8 py-4 lg:px-14">
      <Link href="/help">
        <Image
          src="/logo-cbqa-white.png"
          alt="CBQA Global"
          width={100}
          height={36}
          style={{ width: 100, height: 'auto' }}
          className="object-contain"
        />
      </Link>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-md px-4 py-2 hover:bg-white/25 transition-colors"
        >
          <UserCircle2 className="h-5 w-5 text-white" />
          <span className="text-sm font-medium text-white leading-none">{userName}</span>
          <ChevronDown className="h-3.5 w-3.5 text-white/80" />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-slate-100 bg-white shadow-xl py-1.5 z-30">
            <Link
              href="/help/tickets/new"
              className="block px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors"
              style={{ color: '#2ba8b8' }}
              onClick={() => setOpen(false)}
            >
              + New Ticket
            </Link>
            <div className="my-1 border-t border-slate-100" />
            <Link
              href="/help/tickets"
              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              onClick={() => setOpen(false)}
            >
              My Tickets
            </Link>
            <Link
              href="/help/knowledge-base"
              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              onClick={() => setOpen(false)}
            >
              Knowledge Base
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
  );
}
