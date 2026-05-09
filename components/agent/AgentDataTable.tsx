import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  minWidth?: string;
  render: (row: T) => React.ReactNode;
}

interface AgentDataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
  // Pagination
  total: number;
  page: number;
  pageSize: number;
  buildPageHref: (page: number) => string;
}

export default function AgentDataTable<T>({
  columns,
  rows,
  rowKey,
  emptyMessage = 'No data found.',
  total,
  page,
  pageSize,
  buildPageHref,
}: AgentDataTableProps<T>) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .reduce<(number | '...')[]>((acc, p, i, arr) => {
      if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('...');
      acc.push(p);
      return acc;
    }, []);

  const showingFrom = rows.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingTo   = Math.min(page * pageSize, total);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className={`w-full ${columns[0]?.minWidth ?? 'min-w-[600px]'}`}>
          <thead>
            <tr className="text-xs text-slate-500 uppercase tracking-wide border-b border-slate-100 bg-slate-50/50">
              {columns.map((col) => (
                <th key={col.key} className="px-4 sm:px-6 py-3 text-left font-medium">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-400 text-sm">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={rowKey(row)} className="hover:bg-blue-50/40 transition-colors group">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 sm:px-6 py-3.5">
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-slate-50/50">
        <p className="text-xs text-slate-500">
          Showing {showingFrom}–{showingTo} of {total}
        </p>
        <div className="flex items-center gap-1">
          <Link
            href={buildPageHref(page - 1)}
            aria-disabled={page <= 1}
            className={`p-1.5 rounded-lg transition-colors ${page <= 1 ? 'pointer-events-none text-slate-300' : 'text-slate-600 hover:bg-slate-200'}`}
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>

          {pageNumbers.map((p, i) =>
            p === '...' ? (
              <span key={`e-${i}`} className="px-2 text-slate-400 text-sm">…</span>
            ) : (
              <Link
                key={p}
                href={buildPageHref(p as number)}
                className={`h-8 w-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  p === page ? 'text-white' : 'text-slate-600 hover:bg-slate-200'
                }`}
                style={p === page ? { background: '#319EA9' } : {}}
              >
                {p}
              </Link>
            ),
          )}

          <Link
            href={buildPageHref(page + 1)}
            aria-disabled={page >= totalPages}
            className={`p-1.5 rounded-lg transition-colors ${page >= totalPages ? 'pointer-events-none text-slate-300' : 'text-slate-600 hover:bg-slate-200'}`}
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
