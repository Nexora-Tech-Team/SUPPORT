import { requireUser } from '@/lib/auth';
import CustomerShell from '@/components/help/CustomerShell';
import KnowledgeBaseContent from './KnowledgeBaseContent';
import { articles } from '@/lib/articles';

const categories = ['All', 'Getting Started', 'Account', 'LMS', 'Website', 'Marketing', 'Training', 'AuditQ'];

export default async function KnowledgeBasePage() {
  const user = await requireUser(undefined, '/help/knowledge-base');

  return (
    <CustomerShell
      userName={user.name}
      heroTitle="Knowledge Base"
      heroSubtitle="Browse guides and answers to help you get the most out of our services."
    >
      <KnowledgeBaseContent articles={articles} categories={categories} />
    </CustomerShell>
  );
}
