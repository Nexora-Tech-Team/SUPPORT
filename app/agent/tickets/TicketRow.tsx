'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import type { TicketStatus } from '@/lib/types';

interface TicketRowProps {
  ticket: {
    id: string;
    ticketId: string;
    title: string;
    department: string;
    status: string;
    priority: string;
    updatedAt: Date;
    author: { name: string };
    assignee: { name: string } | null;
  };
}

export default function TicketRow({ ticket }: TicketRowProps) {
  const [loading, setLoading] = useState(false);
  const href = `/agent/tickets/${ticket.id}`;

  return (
    <tr
      className={`transition-colors group cursor-pointer ${loading ? 'bg-blue-50/60' : 'hover:bg-blue-50/40'}`}
      onClick={() => setLoading(true)}
    >
      <td className="px-4 sm:px-6 py-3.5 text-xs font-mono text-slate-400 whitespace-nowrap">
        <Link href={href} className="hover:text-blue-600 transition-colors" onClick={(e) => e.stopPropagation()}>
          {ticket.ticketId}
        </Link>
      </td>
      <td className="px-4 sm:px-6 py-3.5">
        <Link href={href} className="block" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-2">
            <div className="font-medium text-slate-900 text-sm max-w-[220px] truncate group-hover:text-blue-700 transition-colors">
              {ticket.title}
            </div>
            {loading && <Loader2 className="h-3.5 w-3.5 text-blue-500 animate-spin flex-shrink-0" />}
          </div>
          <div className="text-xs text-slate-400 mt-0.5">{ticket.department}</div>
        </Link>
      </td>
      <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
        <StatusBadge status={ticket.status as TicketStatus} />
      </td>
      <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
        <PriorityBadge priority={ticket.priority as never} />
      </td>
      <td className="px-4 sm:px-6 py-3.5">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-semibold text-slate-600 flex-shrink-0">
            {ticket.author.name.charAt(0)}
          </div>
          <span className="text-sm text-slate-700 truncate max-w-[100px]">{ticket.author.name}</span>
        </div>
      </td>
      <td className="px-4 sm:px-6 py-3.5">
        {ticket.assignee ? (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-700 flex-shrink-0">
              {ticket.assignee.name.charAt(0)}
            </div>
            <span className="text-sm text-slate-700 truncate max-w-[100px]">{ticket.assignee.name}</span>
          </div>
        ) : (
          <span className="text-xs text-slate-400 italic">Unassigned</span>
        )}
      </td>
      <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-xs text-slate-400">
        {new Date(ticket.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </td>
    </tr>
  );
}
