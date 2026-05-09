import { notFound } from 'next/navigation';
import Link from 'next/link';
import { requireUser } from '@/lib/auth';
import CustomerShell from '@/components/help/CustomerShell';
import { getArticleById, articles } from '@/lib/articles';
import { ArrowLeft, Clock, Tag, PlusCircle } from 'lucide-react';

const CATEGORY_COLORS: Record<string, string> = {
  'Getting Started': '#2ba8b8',
  'Account':         '#6366f1',
  'LMS':             '#8b5cf6',
  'Website':         '#0ea5e9',
  'Marketing':       '#f59e0b',
  'Training':        '#10b981',
  'AuditQ':          '#f97316',
};

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser(undefined, '/help/knowledge-base');
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) notFound();

  const color = CATEGORY_COLORS[article.category] ?? '#2ba8b8';

  // Related articles: same category, excluding current
  const related = articles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);

  // Parse content into sections: ## Heading\n\nBody
  const sections = article.content.split('\n\n').map((block) => {
    if (block.startsWith('## ')) return { type: 'heading', text: block.replace('## ', '') };
    if (block.startsWith('- ')) return { type: 'list', items: block.split('\n').map((l) => l.replace(/^- /, '')) };
    return { type: 'paragraph', text: block };
  });

  return (
    <CustomerShell
      userName={user.name}
      heroTitle={article.title}
      heroSubtitle={article.excerpt}
    >
      <div className="max-w-3xl mx-auto">

        {/* Back + meta */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/help/knowledge-base"
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Knowledge Base
          </Link>
          <span className="text-slate-300">|</span>
          <span
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: `${color}18`, color }}
          >
            <Tag className="h-3 w-3" /> {article.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="h-3.5 w-3.5" /> {article.readTime}
          </span>
        </div>

        {/* Article card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">{article.title}</h1>

          <div className="space-y-5 text-slate-700">
            {sections.map((section, i) => {
              if (section.type === 'heading') {
                return (
                  <h2 key={i} className="text-lg font-bold text-slate-900 pt-2">
                    {section.text}
                  </h2>
                );
              }
              if (section.type === 'list') {
                return (
                  <ul key={i} className="space-y-2 pl-4">
                    {section.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm leading-relaxed">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                        <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: section.text?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') ?? '' }}
                />
              );
            })}
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Related Articles</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {related.map((a) => (
                <Link
                  key={a.id}
                  href={`/help/knowledge-base/${a.id}`}
                  className="block bg-white rounded-xl border border-slate-200 p-4 hover:border-cyan-200 hover:shadow-sm transition-all"
                >
                  <p className="text-sm font-semibold text-slate-800 leading-snug mb-1 hover:text-cyan-700 transition-colors">{a.title}</p>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="h-3 w-3" /> {a.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div
          className="rounded-2xl flex items-center"
          style={{ background: 'rgba(204,240,240,0.45)', border: '1px solid rgba(153,220,220,0.5)', gap: '1.5rem', padding: '1.25rem 1.5rem' }}
        >
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base" style={{ color: '#2ba8b8' }}>Still need help?</h3>
            <p className="text-slate-500 text-sm mt-0.5">Our team is ready to assist you directly.</p>
          </div>
          <Link
            href="/help/tickets/new"
            className="flex-shrink-0 flex items-center gap-2 rounded-lg text-white text-sm font-medium px-4 py-2"
            style={{ background: '#2ba8b8' }}
          >
            <PlusCircle className="h-4 w-4" /> Create Ticket
          </Link>
        </div>
      </div>
    </CustomerShell>
  );
}
