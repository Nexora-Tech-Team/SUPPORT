'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, UserPlus, X } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [modal, setModal] = useState<'tos' | 'privacy' | null>(null);

  function setField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!passwordValid) {
      setError('Password does not meet the requirements.');
      return;
    }

    setPending(true);
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });

    const data = await response.json();
    setPending(false);

    if (!response.ok) {
      setError(data.error ?? 'Registration failed. Please try again.');
      return;
    }

    router.push(data.redirectTo ?? '/help');
    router.refresh();
  }

  const requirements = [
    { label: 'At least 8 characters', met: form.password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(form.password) },
    { label: 'One number', met: /[0-9]/.test(form.password) },
  ];

  const metCount = requirements.filter((r) => r.met).length;
  const strengthLabel = ['', 'Weak', 'Fair', 'Strong'][metCount];
  const strengthColor = ['', 'bg-rose-500', 'bg-amber-400', 'bg-emerald-500'][metCount];
  const passwordValid = metCount === requirements.length;

  return (
    <div className="relative flex h-screen flex-col overflow-hidden">
      <Image src="/login-bg-image.png" alt="" fill className="object-cover object-center" priority />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(43,128,143,0.7), rgba(41,87,97,0.7))' }} />

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8 lg:flex-row lg:px-20 min-h-0 gap-8 lg:gap-16 overflow-y-auto py-6">
        {/* Left welcome text */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold leading-tight text-white drop-shadow">
            Hello,<br /><span className="font-extrabold">Get Started!</span>
          </h1>
          <p className="mt-3 text-lg text-white/80">Create an account to get support from our team.</p>
        </div>

        {/* Card */}
        <div className="w-full max-w-sm">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-xl">

            {/* Logo */}
            <div className="mb-5 flex justify-center">
              <Image src="/logo-cbqa-white.png" alt="CBQA Global" width={180} height={60} className="object-contain" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setField('name', e.target.value)}
                  placeholder="Full name"
                  required
                  minLength={2}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 backdrop-blur-sm"
                />
              </div>

              <div>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 backdrop-blur-sm"
                />
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setField('password', e.target.value)}
                  placeholder="Password (min. 8 characters)"
                  required
                  minLength={8}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 pr-10 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 backdrop-blur-sm"
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white" tabIndex={-1}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {form.password.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${strengthColor}`} style={{ width: `${(metCount / 3) * 100}%` }} />
                    </div>
                    <span className={`text-xs font-medium ${metCount === 3 ? 'text-emerald-300' : metCount === 2 ? 'text-amber-300' : 'text-rose-300'}`}>
                      {strengthLabel}
                    </span>
                  </div>
                  <ul className="space-y-0.5">
                    {requirements.map((r) => (
                      <li key={r.label} className={`flex items-center gap-1.5 text-xs transition-colors ${r.met ? 'text-emerald-300' : 'text-white/50'}`}>
                        <span className="text-[10px]">{r.met ? '✓' : '○'}</span>
                        {r.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={(e) => setField('confirmPassword', e.target.value)}
                    placeholder="Confirm password"
                    required
                    className={`w-full rounded-lg border bg-white/10 px-3 py-2.5 pr-10 text-sm text-white outline-none placeholder:text-white/40 focus:ring-2 backdrop-blur-sm ${
                      form.confirmPassword && form.password !== form.confirmPassword
                        ? 'border-rose-400/60 focus:border-rose-400 focus:ring-rose-400/30'
                        : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400/30'
                    }`}
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white" tabIndex={-1}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <p className="mt-1 text-xs text-rose-300">Passwords do not match</p>
                )}
              </div>

              {error && (
                <div className="rounded-lg border border-rose-400/30 bg-rose-500/20 px-3 py-2 text-sm text-rose-200">{error}</div>
              )}

              <button
                type="submit"
                disabled={pending || !passwordValid || (!!form.confirmPassword && form.password !== form.confirmPassword)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 mt-1"
              >
                {pending ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating account…</> : <><UserPlus className="h-4 w-4" /> Create Account</>}
              </button>

              <p className="text-center text-xs text-white/60 pt-1">
                Already have an account?{' '}
                <Link href="/login" className="text-cyan-300 hover:text-cyan-200 font-medium">Sign in</Link>
              </p>
            </form>
          </div>

          <p className="mt-3 text-center text-xs text-white/50">
            By creating an account you agree to our{' '}
            <button type="button" onClick={() => setModal('tos')} className="text-white/70 underline hover:text-white">Terms of Service</button>{' '}
            and{' '}
            <button type="button" onClick={() => setModal('privacy')} className="text-white/70 underline hover:text-white">Privacy Policy</button>.
          </p>
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

      {/* ToS / Privacy Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={() => setModal(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-md rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white">
                {modal === 'tos' ? 'Terms of Service' : 'Privacy Policy'}
              </h2>
              <button onClick={() => setModal(null)} className="text-white/50 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs text-white/70 leading-relaxed max-h-72 overflow-y-auto pr-1">
              {modal === 'tos' ? (
                <>
                  <p><span className="text-white font-medium">1. Acceptance</span><br />By registering, you agree to these Terms and all applicable laws.</p>
                  <p><span className="text-white font-medium">2. Use of Service</span><br />You may use this platform only for legitimate support requests related to CBQA Global products and services.</p>
                  <p><span className="text-white font-medium">3. Account Responsibility</span><br />You are responsible for maintaining the confidentiality of your account credentials and all activity under your account.</p>
                  <p><span className="text-white font-medium">4. Prohibited Conduct</span><br />You agree not to misuse the service, submit false information, or attempt to gain unauthorised access to any part of the system.</p>
                  <p><span className="text-white font-medium">5. Termination</span><br />We reserve the right to suspend or terminate accounts that violate these Terms without prior notice.</p>
                  <p><span className="text-white font-medium">6. Changes</span><br />We may update these Terms from time to time. Continued use of the service constitutes acceptance of the revised Terms.</p>
                </>
              ) : (
                <>
                  <p><span className="text-white font-medium">1. Data We Collect</span><br />We collect your name, email address, and support-related communications you submit through this platform.</p>
                  <p><span className="text-white font-medium">2. How We Use It</span><br />Your data is used solely to manage your support tickets and communicate with you regarding your enquiries.</p>
                  <p><span className="text-white font-medium">3. Data Sharing</span><br />We do not sell or share your personal data with third parties except where required by law or to operate the service.</p>
                  <p><span className="text-white font-medium">4. Security</span><br />We implement industry-standard measures to protect your data against unauthorised access, disclosure, or loss.</p>
                  <p><span className="text-white font-medium">5. Retention</span><br />Your data is retained for as long as your account is active or as needed to provide the service.</p>
                  <p><span className="text-white font-medium">6. Contact</span><br />For privacy-related enquiries, please contact us through the support portal.</p>
                </>
              )}
            </div>
            <button
              onClick={() => setModal(null)}
              className="mt-5 w-full rounded-lg bg-cyan-400 py-2 text-sm font-semibold text-white hover:bg-cyan-500"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
