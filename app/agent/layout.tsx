import { requireUser } from '@/lib/auth';
import AgentShell from '@/components/agent/AgentShell';

export default async function AgentLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser(['SUPPORT_AGENT', 'ADMIN'], '/login');
  return <AgentShell user={user}>{children}</AgentShell>;
}
