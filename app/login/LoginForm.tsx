'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, Mail, ArrowLeft } from 'lucide-react';

type View = 'login' | 'forgot' | 'forgot-done';

export default function LoginForm({ nextPath }: { nextPath?: string }) {
  const router = useRouter();
  const [view, setView] = useState<View>('login');

  // Login state
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [remember, setRemember] = useState(false);
  const [error,    setError]    = useState('');
  const [pending,  setPending]  = useState(false);

  // Forgot password state
  const [fpEmail,    setFpEmail]    = useState('');
  const [fpPending,  setFpPending]  = useState(false);
  const [fpError,    setFpError]    = useState('');
  const [fpResetUrl, setFpResetUrl] = useState('');

  async function handleLogin(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError('');
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, next: nextPath }),
    });
    const data = await response.json();
    setPending(false);
    if (!response.ok) { setError(data.error ?? 'Unable to sign in.'); return; }
    router.push(data.redirectTo);
    router.refresh();
  }

  async function handleForgot(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setFpPending(true);
    setFpError('');
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: fpEmail }),
    });
    const data = await response.json();
    setFpPending(false);
    if (!response.ok) { setFpError(data.error ?? 'Something went wrong.'); return; }
    if (data.resetUrl) setFpResetUrl(data.resetUrl);
    setView('forgot-done');
  }

  return (
    <div className="relative flex h-screen flex-col overflow-hidden">
      <Image src="/login-bg-image.png" alt="" fill className="object-cover object-center" priority />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(43,128,143,0.7), rgba(41,87,97,0.7))' }} />

      {/* Main content */}
      <div className="relative z-10 flex flex-1 items-center px-8 lg:px-20 min-h-0">
        {/* Left welcome text */}
        <div className="hidden flex-1 lg:block">
          <h1 className="text-5xl font-bold leading-tight text-white drop-shadow">
            Hi,<br /><span className="font-extrabold">Welcome Back!</span>
          </h1>
          <p className="mt-3 text-lg text-white/80">Enter your email and password below to log in.</p>
        </div>

        {/* Card */}
        <div className="mx-auto w-full max-w-sm lg:mx-0">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-xl">

            {/* Logo */}
            <div className="mb-5 flex justify-center">
              <Image src="/logo-cbqa-white.png" alt="CBQA Global" width={180} height={60} className="object-contain" />
            </div>

            {/* ── LOGIN VIEW ── */}
            {view === 'login' && (
              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <input id="email" type="text" autoComplete="email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email or username"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 backdrop-blur-sm"
                  />
                </div>
                <div className="relative">
                  <input id="password" type={showPw ? 'text' : 'password'} autoComplete="current-password" required value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 pr-10 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 backdrop-blur-sm"
                  />
                  <button type="button" onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white" tabIndex={-1}>
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-white/80">
                    <button type="button" role="switch" aria-checked={remember} onClick={() => setRemember((v) => !v)}
                      className={`relative h-5 w-9 rounded-full transition-colors duration-200 focus:outline-none ${remember ? 'bg-cyan-400' : 'bg-white/30'}`}>
                      <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${remember ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                    Remember me
                  </label>
                  <button type="button" onClick={() => { setFpEmail(''); setFpError(''); setView('forgot'); }}
                    className="text-sm text-cyan-300 hover:text-cyan-200">
                    Forgot password?
                  </button>
                </div>

                {error && (
                  <div className="rounded-lg border border-rose-400/30 bg-rose-500/20 px-3 py-2 text-sm text-rose-200">{error}</div>
                )}

                <button type="submit" disabled={pending}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 mt-1">
                  {pending ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</> : 'Login'}
                </button>
              </form>
            )}

            {/* ── FORGOT PASSWORD VIEW ── */}
            {view === 'forgot' && (
              <form onSubmit={handleForgot} className="space-y-3">
                <button type="button" onClick={() => setView('login')}
                  className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-1 self-start">
                  <ArrowLeft className="h-4 w-4" /> Back to login
                </button>
                <p className="text-white font-semibold text-base">Reset your password</p>
                <p className="text-white/70 text-xs">Enter your registered email and we&apos;ll send a reset link.</p>
                <input type="email" required value={fpEmail} onChange={(e) => setFpEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 backdrop-blur-sm"
                />
                {fpError && (
                  <div className="rounded-lg border border-rose-400/30 bg-rose-500/20 px-3 py-2 text-sm text-rose-200">{fpError}</div>
                )}
                <button type="submit" disabled={fpPending || !fpEmail.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60">
                  {fpPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <><Mail className="h-4 w-4" /> Send Reset Link</>}
                </button>
              </form>
            )}

            {/* ── FORGOT DONE VIEW ── */}
            {view === 'forgot-done' && (
              <div className="space-y-3 text-center">
                <div className="h-12 w-12 rounded-full bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center mx-auto">
                  <Mail className="h-6 w-6 text-cyan-300" />
                </div>
                <p className="text-white font-semibold">Check your inbox</p>
                <p className="text-white/70 text-xs">
                  If <span className="text-white font-medium">{fpEmail}</span> is registered, a reset link has been sent.
                </p>
                {fpResetUrl && (
                  <div className="rounded-lg border border-white/20 bg-white/10 p-3 text-left">
                    <p className="text-xs text-white/50 mb-1">Dev preview link:</p>
                    <Link href={fpResetUrl} className="text-xs text-cyan-300 break-all hover:text-cyan-200 underline">{fpResetUrl}</Link>
                  </div>
                )}
                <button type="button" onClick={() => { setView('login'); setFpEmail(''); setFpResetUrl(''); }}
                  className="text-sm text-cyan-300 hover:text-cyan-200">
                  ← Back to login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Nexora logo pill */}
      <div className="relative z-10 flex justify-center pb-4">
        <div className="rounded-full bg-white/90 px-3 py-1 shadow-lg backdrop-blur-sm">
          <Image src="/nexora-partofcbqa-logo.png" alt="Nexora" width={64} height={20} style={{ width: 64, height: 'auto' }} className="object-contain" />
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/10 bg-white/5 py-2.5 text-center text-xs text-white/60 backdrop-blur-sm">
        &copy; Copyright 2026 CBQA Global
      </div>
    </div>
  );
}
