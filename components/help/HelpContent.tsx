'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ArrowUpRight, Headphones, Clock } from 'lucide-react';
import CustomerNav from './CustomerNav';
import type { Article as KbArticle } from '@/lib/articles';

export type { KbArticle };

export interface CategoryItem {
  id: string;
  title: string;
  desc: string;
  href: string;
  image: string;
  imgPos: string;
  large?: boolean;
}



interface HelpContentProps {
  categories: CategoryItem[];
  userName: string;
  articles: KbArticle[];
}

const TRENDING = ['Reset Password', 'Website Bug', 'Marketing Collaterals'];

const CATEGORY_COLORS: Record<string, string> = {
  'Getting Started': '#2ba8b8',
  'Account':        '#6366f1',
  'LMS':            '#8b5cf6',
  'Website':        '#0ea5e9',
  'Marketing':      '#f59e0b',
  'Training':       '#10b981',
  'AuditQ':         '#f97316',
};

export default function HelpContent({ categories, userName, articles }: HelpContentProps) {
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();

  const largeCard = categories.find((c) => c.large);
  const smallCards = categories.filter((c) => !c.large);

  const kbResults = q
    ? articles.filter(
        (a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.category.toLowerCase().includes(q),
      )
    : [];

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ══════════════════════════════
          HERO (photo + teal overlay + nav + content)
          ══════════════════════════════ */}
      <section className="relative" style={{ minHeight: '42vh' }}>
        {/* Background photo */}
        <Image
          src="/cusotmer-hero-banner.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        {/* Teal gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(43,128,143,0.78), rgba(41,87,97,0.78))',
          }}
        />

        {/* ── constrained inner wrapper ── */}
        <div className="relative z-10 mx-auto w-full" style={{ maxWidth: '1280px' }}>

        {/* ── Nav ── */}
        <CustomerNav userName={userName} />

        {/* ── Hero content (bottom-left) ── */}
        <div className="relative z-10 px-8 pt-6 lg:px-14 flex flex-col gap-3 w-full" style={{ paddingBottom: '3rem' }}>
          {/* Card 1 — Heading + subtitle */}
          <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-5 py-4 max-w-lg">
            <h1 className="text-2xl lg:text-3xl font-bold text-white leading-snug">
              Find Answers Faster. <br />Submit Requests Easier
            </h1>
            <p className="text-white/80 text-sm mt-1.5">
              A centralized support hub for all CBQA Global services and operational need
            </p>
          </div>

          {/* Card 2 — Search */}
          <div className="rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2.5 flex items-center gap-3 max-w-lg">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for reset password, billing or others"
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/50 outline-none"
            />
            <div className="rounded-full border border-white/20 bg-white/10 p-1.5 flex-shrink-0">
              <Search className="h-4 w-4 text-white" />
            </div>
          </div>

          {/* Trending — outside cards */}
          <div className="flex flex-wrap items-center gap-1 text-xs px-1">
            <span className="font-semibold text-white">Trending Searches:</span>
            {TRENDING.map((term, i) => (
              <span key={term}>
                <button
                  type="button"
                  onClick={() => setQuery(term)}
                  className="text-white underline underline-offset-2 hover:text-cyan-200 transition-colors"
                >
                  {term}
                </button>
                {i < TRENDING.length - 1 && <span className="text-white">,</span>}
              </span>
            ))}
          </div>
        </div>
        </div> {/* end constrained wrapper */}
      </section>

      {/* ══════════════════════════════
          CATEGORIES / SEARCH RESULTS SECTION
          ══════════════════════════════ */}
      <section className="flex-1 bg-white">
        <div className="mx-auto w-full px-8 lg:px-14 py-10" style={{ maxWidth: '1280px' }}>

        {/* ── KB search results ── */}
        {q ? (
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-1">
              Search results for &ldquo;{query}&rdquo;
            </h2>
            <p className="text-slate-500 text-sm mb-6">{kbResults.length} article{kbResults.length !== 1 ? 's' : ''} found</p>
            {kbResults.length === 0 ? (
              <p className="text-center text-slate-400 text-sm py-16">No articles match your search.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {kbResults.map((article) => {
                  const color = CATEGORY_COLORS[article.category] ?? '#2ba8b8';
                  return (
                    <Link
                      key={article.id}
                      href={`/help/knowledge-base/${article.id}`}
                      className="group flex flex-col bg-white rounded-2xl border border-slate-200 p-5 hover:border-cyan-200 hover:shadow-sm transition-all"
                    >
                      <span className="self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-3"
                        style={{ background: `${color}18`, color }}>
                        {article.category}
                      </span>
                      <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-2 group-hover:text-cyan-700 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed flex-1">{article.excerpt}</p>
                      <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400">
                        <Clock className="h-3.5 w-3.5" />
                        {article.readTime}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-cyan-600">How Can We Help You Today?</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-lg mx-auto">
              Get faster assistance by choosing a category below to connect with the right team and move your request forward more efficiently
            </p>
          </div>

        {/* Bento grid — col 1: LMS tall, col 2-3: 3 cards each */}
        <div className="grid gap-2.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:[grid-template-rows:190px_190px_190px]">
            {/* Col 1 — Learning Management (spans all 3 rows) */}
            {largeCard && (
              <Link
                href={largeCard.href}
                className="relative rounded-2xl overflow-hidden group h-52 sm:col-span-2 sm:h-64 lg:col-span-1 lg:h-auto lg:row-span-3"
              >
                <Image
                  src={largeCard.image}
                  alt={largeCard.title}
                  fill
                  className="object-cover group-hover:[transform:scale(1.05)]"
                  style={{ objectPosition: largeCard.imgPos, transition: 'transform 0.3s ease' }}
                />
                {/* gradient + blur fade: clear at top, dark+blur at bottom */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0) 100%)' }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{ height: '60%', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)', maskImage: 'linear-gradient(to top, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)' }}
                />
                <div className="absolute inset-0 flex flex-col justify-end" style={{ padding: '1.5rem', paddingBottom: '5rem' }}>
                  <h3 className="text-white font-bold text-xl leading-tight" style={{ marginBottom: '0.5rem' }}>{largeCard.title}</h3>
                  <div className="overflow-hidden max-h-0 group-hover:max-h-24" style={{ transition: 'max-height 0.3s ease 0.1s' }}>
                    <p className="text-white text-sm leading-relaxed opacity-0 group-hover:opacity-100" style={{ transition: 'opacity 0.3s ease 0.15s' }}>{largeCard.desc}</p>
                  </div>
                  <div className="absolute bottom-6 right-6 h-9 w-9 rounded-full border border-white/40 bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20" style={{ transition: 'background-color 0.3s ease' }}>
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                </div>
              </Link>
            )}

            {/* Col 2 & 3 — 6 small cards, row by row */}
            {smallCards.slice(0, 6).map((cat) => {
              return (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className="relative rounded-2xl overflow-hidden group h-48"
                >
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:[transform:scale(1.05)]"
                    style={{ objectPosition: cat.imgPos, transition: 'transform 0.3s ease' }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'rgba(0,0,0,0.45)' }}
                  />
                  {/* blur fade at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{ height: '60%', background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)', maskImage: 'linear-gradient(to top, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)' }}
                  />
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-white font-bold text-base leading-snug mb-2">{cat.title}</h3>
                      <p className="text-white text-xs leading-relaxed opacity-0 group-hover:opacity-100" style={{ transition: 'opacity 0.3s ease 0.1s' }}>{cat.desc}</p>
                    </div>
                    <div className="flex justify-end">
                      <div className="h-9 w-9 rounded-full border border-white/40 bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20" style={{ transition: 'background-color 0.3s ease' }}>
                        <ArrowUpRight className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          </>
        )}
        </div> {/* end constrained wrapper */}
      </section>

      {/* ══════════════════════════════
          STILL NEED ASSISTANCE
          ══════════════════════════════ */}
      <section className="pb-10">
        <div className="mx-auto w-full px-8 lg:px-14" style={{ maxWidth: '1280px' }}>
        <div
          className="rounded-2xl flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
          style={{ background: 'rgba(204,240,240,0.45)', border: '1px solid rgba(153,220,220,0.5)', padding: '1.5rem 2rem' }}
        >
          <div
            className="h-16 w-16 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: '#2ba8b8' }}
          >
            <Headphones className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-bold" style={{ color: '#2ba8b8' }}>Still Need Assistance?</h3>
            <p className="text-slate-500 text-sm mt-0.5">
              Our team are ready to help with technical issues, operational requests, and service coordination
            </p>
          </div>
          <div className="flex flex-wrap gap-3 sm:flex-shrink-0">
            <Link
              href="/help/tickets/new"
              className="rounded-lg text-white text-sm font-medium px-5 py-2.5 transition-colors"
              style={{ background: '#2ba8b8' }}
            >
              Create Ticket
            </Link>
            <Link
              href="/help/tickets"
              className="rounded-lg text-white text-sm font-medium px-5 py-2.5 transition-colors"
              style={{ background: '#2ba8b8' }}
            >
              My Tickets
            </Link>
          </div>
        </div>
        </div> {/* end constrained wrapper */}
      </section>

      {/* ══════════════════════════════
          FOOTER
          ══════════════════════════════ */}
      <footer className="border-t border-slate-200 py-5">
        <div className="mx-auto w-full flex justify-center" style={{ maxWidth: '1280px' }}>
          <Image
            src="/nexora-partofcbqa-logo.png"
            alt="Nexora — Part of CBQA Global Group"
            width={130}
            height={40}
            style={{ width: 130, height: 'auto' }}
            className="object-contain"
          />
        </div>
      </footer>
    </div>
  );
}
