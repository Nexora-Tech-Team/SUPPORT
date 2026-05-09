'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Search } from 'lucide-react';

export default function TicketsSearchInput({
  defaultValue,
  selectedStatuses,
  selectedCategories,
  cid,
  aid,
  dateFrom,
  dateTo,
}: {
  defaultValue: string;
  selectedStatuses: string[];
  selectedCategories: string[];
  cid: string;
  aid: string;
  dateFrom: string;
  dateTo: string;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    selectedStatuses.forEach((s) => params.append('st', s));
    selectedCategories.forEach((c) => params.append('cat', c));
    if (cid) params.set('cid', cid);
    if (aid) params.set('aid', aid);
    if (dateFrom) params.set('from', dateFrom);
    if (dateTo) params.set('to', dateTo);
    startTransition(() => {
      router.push(`/agent/tickets${params.toString() ? `?${params.toString()}` : ''}`);
    });
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 flex-1 max-w-sm">
      <Search className="h-4 w-4 text-slate-400 flex-shrink-0" />
      <input
        type="text"
        defaultValue={defaultValue}
        onChange={handleChange}
        placeholder="Search tickets, ID, customer…"
        className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
      />
    </div>
  );
}
