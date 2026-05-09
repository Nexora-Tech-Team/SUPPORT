import { db } from '@/lib/db';
import Link from 'next/link';
import AgentTopBar from '@/components/agent/AgentTopBar';
import TicketsSearchInput from './TicketsSearchInput';
import TicketsFilterDropdown from './TicketsFilterDropdown';
import TicketRow from './TicketRow';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 10;

export default async function AgentTicketsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const q         = String(params.q  ?? '');
  const pageParam = String(params.page ?? '1');
  const page      = Math.max(1, parseInt(pageParam, 10) || 1);
  const cid       = String(params.cid  ?? '');
  const aid       = String(params.aid  ?? '');
  const dateFrom  = String(params.from ?? '');
  const dateTo    = String(params.to   ?? '');

  // Multi-value params (status/category can appear multiple times)
  const rawSt  = params.st;
  const rawCat = params.cat;
  const selectedStatuses   = rawSt  ? (Array.isArray(rawSt)  ? rawSt  : [rawSt])  : [];
  const selectedCategories = rawCat ? (Array.isArray(rawCat) ? rawCat : [rawCat]) : [];

  // Build where clause
  const andClauses: object[] = [];

  if (selectedStatuses.length > 0)   andClauses.push({ status:     { in: selectedStatuses } });
  if (selectedCategories.length > 0) andClauses.push({ department: { in: selectedCategories } });
  if (cid)                            andClauses.push({ authorId: cid });
  if (aid === 'unassigned')           andClauses.push({ assigneeId: null });
  else if (aid)                       andClauses.push({ assigneeId: aid });
  if (dateFrom)                       andClauses.push({ createdAt: { gte: new Date(dateFrom) } });
  if (dateTo)                         andClauses.push({ createdAt: { lte: new Date(`${dateTo}T23:59:59`) } });
  if (q.trim()) {
    andClauses.push({
      OR: [
        { ticketId:   { contains: q } },
        { title:      { contains: q } },
        { department: { contains: q } },
        { author: { name: { contains: q } } },
      ],
    });
  }

  const where = andClauses.length > 0 ? { AND: andClauses } : {};

  const [total, tickets, customers, agents] = await Promise.all([
    db.ticket.count({ where }),
    db.ticket.findMany({
      where,
      include: { author: true, assignee: true },
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    db.user.findMany({
      where: { role: 'CUSTOMER' },
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    }),
    db.user.findMany({
      where: { role: { in: ['SUPPORT_AGENT', 'ADMIN'] } },
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function pageHref(p: number) {
    const ps = new URLSearchParams();
    if (q) ps.set('q', q);
    selectedStatuses.forEach((s) => ps.append('st', s));
    selectedCategories.forEach((c) => ps.append('cat', c));
    if (cid) ps.set('cid', cid);
    if (aid) ps.set('aid', aid);
    if (dateFrom) ps.set('from', dateFrom);
    if (dateTo) ps.set('to', dateTo);
    ps.set('page', String(p));
    return `/agent/tickets?${ps.toString()}`;
  }

  return (
    <>
      <AgentTopBar title="All Tickets" subtitle={`${total} ticket${total !== 1 ? 's' : ''} found`} />
      <div className="p-4 sm:p-6 lg:p-8">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
          <TicketsSearchInput defaultValue={q} selectedStatuses={selectedStatuses} selectedCategories={selectedCategories} cid={cid} aid={aid} dateFrom={dateFrom} dateTo={dateTo} />
          <TicketsFilterDropdown
            customers={customers}
            agents={agents}
            current={{ statuses: selectedStatuses, categories: selectedCategories, customerId: cid, agentId: aid, dateFrom, dateTo, q }}
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="text-xs text-slate-500 uppercase tracking-wide border-b border-slate-100 bg-slate-50/50">
                  <th className="px-4 sm:px-6 py-3 text-left font-medium">Ticket ID</th>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium">Title</th>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium">Priority</th>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium">Customer</th>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium">Assignee</th>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tickets.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400 text-sm">No tickets found.</td>
                  </tr>
                )}
                {tickets.map((ticket) => (
                  <TicketRow key={ticket.id} ticket={ticket} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-slate-50/50">
            <p className="text-xs text-slate-500">
              Showing {tickets.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total}
            </p>
            <div className="flex items-center gap-1">
              <Link href={pageHref(page - 1)} aria-disabled={page <= 1}
                className={`p-1.5 rounded-lg transition-colors ${page <= 1 ? 'pointer-events-none text-slate-300' : 'text-slate-600 hover:bg-slate-200'}`}>
                <ChevronLeft className="h-4 w-4" />
              </Link>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce<(number | '...')[]>((acc, p, i, arr) => {
                  if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('...');
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === '...' ? (
                    <span key={`e-${i}`} className="px-2 text-slate-400 text-sm">…</span>
                  ) : (
                    <Link key={p} href={pageHref(p as number)}
                      className={`h-8 w-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${p === page ? 'text-white' : 'text-slate-600 hover:bg-slate-200'}`}
                      style={p === page ? { background: '#319EA9' } : {}}>
                      {p}
                    </Link>
                  )
                )}
              <Link href={pageHref(page + 1)} aria-disabled={page >= totalPages}
                className={`p-1.5 rounded-lg transition-colors ${page >= totalPages ? 'pointer-events-none text-slate-300' : 'text-slate-600 hover:bg-slate-200'}`}>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
