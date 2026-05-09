'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Clock, ArrowUpRight } from 'lucide-react';

interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
}

interface KnowledgeBaseContentProps {
  articles: Article[];
  categories: string[];
}

const CATEGORY_COLORS: Record<string, string> = {
  'Getting Started': '#2ba8b8',
  'Account':        '#6366f1',
  'LMS':            '#8b5cf6',
  'Website':        '#0ea5e9',
  'Marketing':      '#f59e0b',
  'Training':       '#10b981',
  'AuditQ':         '#f97316',
};

export default function KnowledgeBaseContent({ articles, categories }: KnowledgeBaseContentProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const q = search.trim().toLowerCase();
  const filtered = articles
    .filter((a) => category === 'All' || a.category === category)
    .filter((a) => !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));

  const countFor = (c: string) =>
    c === 'All' ? articles.length : articles.filter((a) => a.category === c).length;

  return (
    <div className="max-w-4xl mx-auto">

      {/* Search */}
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 mb-5">
        <Search className="h-4 w-4 text-slate-400 flex-shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles…"
          className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        {categories.map((c) => {
          const active = category === c;
          const count = countFor(c);
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border whitespace-nowrap flex-shrink-0"
              style={active
                ? { background: '#2ba8b8', color: '#fff', borderColor: '#2ba8b8' }
                : { background: '#fff', color: '#475569', borderColor: '#e2e8f0' }
              }
            >
              {c}
              <span
                className="text-xs rounded-full font-semibold flex-shrink-0 flex items-center justify-center"
                style={{
                  ...(active ? { background: 'rgba(255,255,255,0.25)', color: '#fff' } : { background: '#f1f5f9', color: '#64748b' }),
                  minWidth: '20px', height: '20px', padding: '0 5px',
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Articles grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <BookOpen className="h-10 w-10 mx-auto mb-3 text-slate-300" />
          <h3 className="font-bold text-slate-900 mb-1">No articles found</h3>
          <p className="text-slate-500 text-sm">Try a different search or category.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((article) => {
            const color = CATEGORY_COLORS[article.category] ?? '#2ba8b8';
            return (
              <Link
                key={article.id}
                href={`/help/knowledge-base/${article.id}`}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200 p-5 hover:border-cyan-200 hover:shadow-sm transition-all"
              >
                {/* Category tag */}
                <span
                  className="self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-3"
                  style={{ background: `${color}18`, color }}
                >
                  {article.category}
                </span>

                <h3 className="font-semibold text-slate-900 text-base leading-snug mb-2 group-hover:text-cyan-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{article.excerpt}</p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readTime}
                  </span>
                  <div
                    className="h-7 w-7 rounded-full flex items-center justify-center border border-slate-200 group-hover:border-cyan-300 group-hover:bg-cyan-50 transition-colors"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Still need help CTA */}
      <div
        className="mt-8 rounded-2xl flex items-center"
        style={{ background: 'rgba(204,240,240,0.45)', border: '1px solid rgba(153,220,220,0.5)', gap: '1.5rem', padding: '1.25rem 1.5rem' }}
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base" style={{ color: '#2ba8b8' }}>Can&apos;t find what you&apos;re looking for?</h3>
          <p className="text-slate-500 text-sm mt-0.5">Submit a ticket and our team will help you out.</p>
        </div>
        <Link
          href="/help/tickets/new"
          className="flex-shrink-0 rounded-lg text-white text-sm font-medium px-4 py-2 transition-colors"
          style={{ background: '#2ba8b8' }}
        >
          Create Ticket
        </Link>
      </div>
    </div>
  );
}
