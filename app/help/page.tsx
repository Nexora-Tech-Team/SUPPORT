import { requireUser } from '@/lib/auth';
import HelpContent from '@/components/help/HelpContent';
import WelcomeGuide from '@/components/ui/WelcomeGuide';
import type { CategoryItem } from '@/components/help/HelpContent';
import { articles } from '@/lib/articles';

export default async function HelpPage() {
  const user = await requireUser(undefined, '/help');

  const categories: CategoryItem[] = [
    {
      id: 'lms',
      title: 'Learning Management',
      desc: 'Support your learning experience with seamless access to courses, assessments, certificates, and LMS activities.',
      href: '/help/tickets/new?dept=LMS',
      image: '/lms.jpg',
      imgPos: '50% 50%',
      large: true,
    },
    {
      id: 'crm',
      title: 'Customer Relation Management Application',
      desc: 'Simplify customer management and operational workflows with dedicated CRM support and assistance.',
      href: '/help/tickets/new?dept=CRM',
      image: '/crm.jpg',
      imgPos: '50% 50%',
    },
    {
      id: 'auditq',
      title: 'AuditQ',
      desc: 'Stay on track with audit coordination, documentation management, and project-related support.',
      href: '/help/tickets/new?dept=AUDITQ',
      image: '/auditq.jpg',
      imgPos: '50% 50%',
    },
    {
      id: 'website',
      title: 'Website',
      desc: 'Maintain a reliable digital experience through website updates, technical assistance, and issue resolution.',
      href: '/help/tickets/new?dept=Website',
      image: '/website.jpg',
      imgPos: '50% 50%',
    },
    {
      id: 'marketing',
      title: 'Marketing',
      desc: 'Support your communication and branding initiatives with collaborative marketing assistance.',
      href: '/help/tickets/new?dept=Marketing',
      image: '/marketing.jpg',
      imgPos: '50% 50%',
    },
    {
      id: 'training',
      title: 'Training Services',
      desc: 'Kelola inisiatif training dengan lebih efisien melalui dukungan jadwal, standar, dan koordinasi pembelajaran.',
      href: '/help/tickets/new?dept=Training+Service',
      image: '/training.jpg',
      imgPos: '50% 50%',
    },
    {
      id: 'general',
      title: 'General / Others',
      desc: 'Reach out for any additional questions, requests, or operational assistance beyond the listed categories.',
      href: '/help/tickets/new?dept=General',
      image: '/general.jpg',
      imgPos: '50% 50%',
    },
  ];

  return (
    <>
      <WelcomeGuide role={user.role} />
      <HelpContent
        categories={categories}
        articles={articles}
        userName={user.name}
      />
    </>
  );
}
