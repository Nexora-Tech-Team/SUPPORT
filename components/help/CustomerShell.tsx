import Image from 'next/image';
import CustomerNav from './CustomerNav';

interface CustomerShellProps {
  userName: string;
  heroTitle: string;
  heroSubtitle: string;
  children: React.ReactNode;
}

export default function CustomerShell({ userName, heroTitle, heroSubtitle, children }: CustomerShellProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Hero + Nav ── */}
      <section className="relative" style={{ minHeight: '38vh' }}>
        <Image
          src="/cusotmer-hero-banner.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(43,128,143,0.78), rgba(41,87,97,0.78))' }}
        />

        <div className="relative z-10 mx-auto w-full" style={{ maxWidth: '1280px' }}>
          <CustomerNav userName={userName} />

          {/* Hero text card */}
          <div className="px-8 pt-4 lg:px-14 flex flex-col gap-3 w-full" style={{ paddingBottom: '3rem' }}>
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-5 py-4 max-w-lg">
              <h1 className="text-2xl lg:text-3xl font-bold text-white leading-snug">{heroTitle}</h1>
              <p className="text-white/80 text-sm mt-1.5">{heroSubtitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Page content ── */}
      <main className="flex-1">
        <div className="mx-auto w-full px-8 lg:px-14 py-10" style={{ maxWidth: '1280px' }}>
          {children}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 py-3">
        <div className="mx-auto w-full flex justify-center" style={{ maxWidth: '1280px' }}>
          <Image
            src="/nexora-partofcbqa-logo.png"
            alt="Nexora — Part of CBQA Global Group"
            width={130}
            height={40}
            style={{ width: 90, height: 'auto' }}
            className="object-contain"
          />
        </div>
      </footer>
    </div>
  );
}
