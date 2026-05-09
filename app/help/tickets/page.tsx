import { requireUser } from '@/lib/auth';
import { getCustomerTickets } from '@/lib/tickets';
import CustomerShell from '@/components/help/CustomerShell';
import TicketList from './TicketList';

export default async function CustomerTicketListPage() {
  const user = await requireUser(['CUSTOMER'], '/help/tickets');
  const tickets = await getCustomerTickets(user.id);

  const sorted = [...tickets].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <CustomerShell
      userName={user.name}
      heroTitle="My Tickets"
      heroSubtitle="Track and manage all your support requests in one place."
    >
      <TicketList tickets={sorted} />
    </CustomerShell>
  );
}
