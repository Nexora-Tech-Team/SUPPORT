'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Headphones, Search } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import { SlaIndicator } from '@/components/ui/SlaIndicator';

const STATUS_FILTERS = ['All', 'OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const;
const STATUS_LABELS: Record<string, string> = {
  All: 'All',
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
};

const CATEGORIES = ['All', 'LMS', 'CRM', 'AUDITQ', 'Website', 'Marketing', 'Training Service', 'General'] as const;

interface Ticket {
  id: string;
  ticketId: string;
  title: string;
  description: string;
  department: string;
  status: string;
  priority: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  comments: unknown[];
}

export default function TicketList({ tickets }: { tickets: Ticket[] }) {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const q = search.trim().toLowerCase();
  const filtered = tickets
    .filter((t) => statusFilter === 'All' || t.status === statusFilter)
    .filter((t) => categoryFilter === 'All' || t.department === categoryFilter)
    .filter((t) => !q || t.title.toLowerCase().includes(q) || t.ticketId.toLowerCase().includes(q) || t.department.toLowerCase().includes(q));

  const statusCountFor = (f: string) =>
    f === 'All' ? tickets.length : tickets.filter((t) => t.status === f).length;

  const categoryCountFor = (c: string) =>
    c === 'All' ? tickets.length : tickets.filter((t) => t.department === c).length;

  return (
    <div className="max-w-3xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 420px)', minHeight: '400px' }}>

      {/* Header + filters */}
      <div className="flex flex-col gap-4 mb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-900">All Tickets</h2>
            <span className="bg-cyan-100 text-cyan-700 px-2.5 py-0.5 rounded-full text-sm font-semibold">
              {tickets.length}
            </span>
          </div>
          <Link
            href="/help/tickets/new"
            className="flex items-center gap-2 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
            style={{ background: '#2ba8b8' }}
          >
            <PlusCircle className="h-4 w-4" />
            New Ticket
          </Link>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
          <Search className="h-4 w-4 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, ticket ID or department…"
            className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Status filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {STATUS_FILTERS.map((f) => {
            const count = statusCountFor(f);
            const active = statusFilter === f;
            return (
              <button key={f} type="button" onClick={() => setStatusFilter(f)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border whitespace-nowrap flex-shrink-0"
                style={active ? { background: '#2ba8b8', color: '#fff', borderColor: '#2ba8b8' } : { background: '#fff', color: '#475569', borderColor: '#e2e8f0' }}
              >
                {STATUS_LABELS[f]}
                <span className="text-xs rounded-full font-semibold flex-shrink-0 flex items-center justify-center"
                  style={{ ...(active ? { background: 'rgba(255,255,255,0.25)', color: '#fff' } : { background: '#f1f5f9', color: '#64748b' }), minWidth: '20px', height: '20px', padding: '0 5px' }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map((c) => {
            const count = categoryCountFor(c);
            const active = categoryFilter === c;
            return (
              <button key={c} type="button" onClick={() => setCategoryFilter(c)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border whitespace-nowrap flex-shrink-0"
                style={active ? { background: '#2ba8b8', color: '#fff', borderColor: '#2ba8b8' } : { background: '#fff', color: '#475569', borderColor: '#e2e8f0' }}
              >
                {c}
                <span className="text-xs rounded-full font-semibold flex-shrink-0 flex items-center justify-center"
                  style={{ ...(active ? { background: 'rgba(255,255,255,0.25)', color: '#fff' } : { background: '#f1f5f9', color: '#64748b' }), minWidth: '20px', height: '20px', padding: '0 5px' }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrollable ticket list */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <div className="h-14 w-14 bg-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Headphones className="h-7 w-7" style={{ color: '#2ba8b8' }} />
            </div>
            <h3 className="font-bold text-slate-900 mb-1">No tickets found</h3>
            <p className="text-slate-500 text-sm">
              {statusFilter === 'All' && categoryFilter === 'All'
                ? 'Submit your first support request and our team will get back to you shortly.'
                : 'No tickets match the selected filters.'}
            </p>
            {statusFilter === 'All' && categoryFilter === 'All' && (
              <Link
                href="/help/tickets/new"
                className="inline-flex items-center gap-2 text-white mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: '#2ba8b8' }}
              >
                <PlusCircle className="h-4 w-4" /> Submit Your First Ticket
              </Link>
            )}
          </div>
        ) : (
          filtered.map((ticket) => (
            <Link
              key={ticket.id}
              href={`/help/tickets/${ticket.id}`}
              className="block bg-white rounded-2xl border border-slate-200 p-5 hover:border-cyan-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      {ticket.ticketId}
                    </span>
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {ticket.department}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 truncate text-base">{ticket.title}</h3>
                  <p className="text-slate-500 text-sm mt-1 line-clamp-2 leading-relaxed">{ticket.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <StatusBadge status={ticket.status as never} />
                  <PriorityBadge priority={ticket.priority as never} />
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                <SlaIndicator createdAt={ticket.createdAt} status={ticket.status} />
                <span className="text-xs text-slate-400">
                  {(ticket.comments as unknown[]).length} message{(ticket.comments as unknown[]).length !== 1 ? 's' : ''}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
