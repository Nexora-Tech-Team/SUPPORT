import { db } from '@/lib/db';
import Link from 'next/link';
import AgentTopBar from '@/components/agent/AgentTopBar';
import AgentDataTable, { type Column } from '@/components/agent/AgentDataTable';

const PAGE_SIZE = 10;

type Customer = {
  id: string;
  name: string;
  email: string;
  _count: { tickets: number };
  tickets: { updatedAt: Date; status: string }[];
};

const columns: Column<Customer>[] = [
  {
    key: 'name',
    header: 'Customer',
    render: (c) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-700 flex-shrink-0">
          {c.name.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium text-slate-900 text-sm">{c.name}</span>
      </div>
    ),
  },
  {
    key: 'email',
    header: 'Email',
    render: (c) => <span className="text-sm text-slate-600">{c.email}</span>,
  },
  {
    key: 'tickets',
    header: 'Total Tickets',
    render: (c) => (
      <span className="inline-flex items-center justify-center h-6 min-w-[1.5rem] px-2 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
        {c._count.tickets}
      </span>
    ),
  },
  {
    key: 'lastActivity',
    header: 'Last Activity',
    render: (c) => (
      <span className="text-xs text-slate-400">
        {c.tickets[0]
          ? new Date(c.tickets[0].updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          : '—'}
      </span>
    ),
  },
  {
    key: 'actions',
    header: 'Actions',
    render: (c) => (
      <Link
        href={`/agent/tickets?cid=${c.id}`}
        className="text-xs font-medium transition-colors hover:underline"
        style={{ color: '#319EA9' }}
      >
        View tickets →
      </Link>
    ),
  },
];

export default async function AgentCustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);

  const [total, customers] = await Promise.all([
    db.user.count({ where: { role: 'CUSTOMER' } }),
    db.user.findMany({
      where: { role: 'CUSTOMER' },
      include: {
        _count: { select: { tickets: true } },
        tickets: {
          orderBy: { updatedAt: 'desc' },
          take: 1,
          select: { updatedAt: true, status: true },
        },
      },
      orderBy: { name: 'asc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  return (
    <>
      <AgentTopBar
        title="Customers"
        subtitle={`${total} registered customer${total !== 1 ? 's' : ''}`}
      />
      <div className="p-4 sm:p-6 lg:p-8">
        <AgentDataTable
          columns={columns}
          rows={customers}
          rowKey={(c) => c.id}
          emptyMessage="No customers found."
          total={total}
          page={page}
          pageSize={PAGE_SIZE}
          buildPageHref={(p) => `/agent/customers?page=${p}`}
        />
      </div>
    </>
  );
}
