'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';

const STATUSES = ['OPEN', 'IN_PROGRESS', 'WAITING_ON_CUSTOMER', 'RESOLVED', 'CLOSED'];
const STATUS_LABELS: Record<string, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  WAITING_ON_CUSTOMER: 'Waiting on Customer',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
};
const CATEGORIES = ['LMS', 'CRM', 'AUDITQ', 'Website', 'Marketing', 'Training Service', 'General'];

interface Props {
  customers: { id: string; name: string }[];
  agents:    { id: string; name: string }[];
  current: {
    statuses:   string[];
    categories: string[];
    customerId: string;
    agentId:    string;
    dateFrom:   string;
    dateTo:     string;
    q:          string;
  };
}

export default function TicketsFilterDropdown({ customers, agents, current }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [statuses,   setStatuses]   = useState<string[]>(current.statuses);
  const [categories, setCategories] = useState<string[]>(current.categories);
  const [customerId, setCustomerId] = useState(current.customerId);
  const [agentId,    setAgentId]    = useState(current.agentId);
  const [dateFrom,   setDateFrom]   = useState(current.dateFrom);
  const [dateTo,     setDateTo]     = useState(current.dateTo);

  const activeCount =
    statuses.length + categories.length +
    (customerId ? 1 : 0) + (agentId ? 1 : 0) +
    (dateFrom ? 1 : 0) + (dateTo ? 1 : 0);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function toggle<T>(arr: T[], val: T): T[] {
    return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
  }

  function buildParams() {
    const params = new URLSearchParams();
    if (current.q) params.set('q', current.q);
    statuses.forEach((s)   => params.append('st', s));
    categories.forEach((c) => params.append('cat', c));
    if (customerId) params.set('cid', customerId);
    if (agentId)    params.set('aid', agentId);
    if (dateFrom)   params.set('from', dateFrom);
    if (dateTo)     params.set('to', dateTo);
    return params;
  }

  function apply() {
    router.push(`/agent/tickets?${buildParams().toString()}`);
    setOpen(false);
  }

  function reset() {
    setStatuses([]);
    setCategories([]);
    setCustomerId('');
    setAgentId('');
    setDateFrom('');
    setDateTo('');
    const params = new URLSearchParams();
    if (current.q) params.set('q', current.q);
    router.push(`/agent/tickets${params.toString() ? `?${params.toString()}` : ''}`);
    setOpen(false);
  }

  const selectClass = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-cyan-400";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <SlidersHorizontal className="h-4 w-4 text-slate-400" />
        Filters
        {activeCount > 0 && (
          <span className="flex items-center justify-center h-5 min-w-[20px] px-1 rounded-full text-white text-xs font-bold" style={{ background: '#319EA9' }}>
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 p-4 space-y-5">

          {/* Status */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Status</p>
            <div className="flex flex-wrap gap-1.5">
              {STATUSES.map((s) => {
                const active = statuses.includes(s);
                return (
                  <button key={s} type="button" onClick={() => setStatuses(toggle(statuses, s))}
                    className="px-2.5 py-1 rounded-full text-xs font-medium border transition-colors"
                    style={active ? { background: '#319EA9', color: '#fff', borderColor: '#319EA9' } : { background: '#f8fafc', color: '#475569', borderColor: '#e2e8f0' }}>
                    {STATUS_LABELS[s]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Category</p>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((c) => {
                const active = categories.includes(c);
                return (
                  <button key={c} type="button" onClick={() => setCategories(toggle(categories, c))}
                    className="px-2.5 py-1 rounded-full text-xs font-medium border transition-colors"
                    style={active ? { background: '#319EA9', color: '#fff', borderColor: '#319EA9' } : { background: '#f8fafc', color: '#475569', borderColor: '#e2e8f0' }}>
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Customer</p>
            <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} className={selectClass}>
              <option value="">All customers</option>
              {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* Agent */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Assigned Agent</p>
            <select value={agentId} onChange={(e) => setAgentId(e.target.value)} className={selectClass}>
              <option value="">All agents</option>
              <option value="unassigned">Unassigned</option>
              {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>

          {/* Date range */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Date Range</p>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs text-slate-400 mb-1 block">From</label>
                <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-700 outline-none focus:border-cyan-400" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-slate-400 mb-1 block">To</label>
                <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-700 outline-none focus:border-cyan-400" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1 border-t border-slate-100">
            <button type="button" onClick={reset}
              className="flex items-center gap-1.5 flex-1 justify-center py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
              <X className="h-3.5 w-3.5" /> Reset
            </button>
            <button type="button" onClick={apply}
              className="flex-1 py-2 rounded-lg text-white text-sm font-semibold transition-colors hover:opacity-90"
              style={{ background: '#319EA9' }}>
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
