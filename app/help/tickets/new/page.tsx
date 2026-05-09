import { requireUser } from '@/lib/auth';
import NewTicketForm from './NewTicketForm';

export default async function NewTicketPage({
  searchParams,
}: {
  searchParams: Promise<{ dept?: string }>;
}) {
  const user = await requireUser(['CUSTOMER'], '/help/tickets/new');
  const params = await searchParams;

  return <NewTicketForm initialDepartment={params.dept} userName={user.name} />;
}
