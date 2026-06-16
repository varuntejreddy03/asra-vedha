import { ArrowRight, Leaf, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { ViewState } from '../types';

interface LoginViewProps {
  setView: (view: ViewState) => void;
  onGoogleLogin: () => void;
}

export default function LoginView({ setView, onGoogleLogin }: LoginViewProps) {
  return (
    <div className="min-h-screen bg-[#111111] text-[#e5e2e1] pt-24 px-6 md:px-12 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(31,77,54,0.38),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(200,164,93,0.14),transparent_34%)]" />
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(120deg,#c8a45d_1px,transparent_1px),linear-gradient(60deg,#e8f0e9_1px,transparent_1px)] bg-[size:46px_46px]" />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-md w-full bg-[#1e1e1e]/90 border border-[#c8a45d]/25 rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="h-1 bg-gradient-to-r from-transparent via-[#c8a45d] to-transparent" />
        <div className="p-7 md:p-8">
          <button
            onClick={() => setView('home')}
            className="mx-auto flex items-center gap-2 text-[#e8c177] hover:text-[#ffdea3] transition-colors cursor-pointer"
            aria-label="Go home"
          >
            <span className="w-10 h-10 rounded-full border border-[#c8a45d]/40 bg-[#111111] flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </span>
            <span className="font-display text-2xl tracking-[0.14em] uppercase">ASRA VEDHA</span>
          </button>

          <div className="text-center mt-8">
            <h1 className="font-display text-4xl text-[#f8f5ef]">Welcome Back</h1>
            <p className="font-sans text-sm text-[#9a8f80] mt-2">
              Sign in with Google to continue to your wellness account.
            </p>
          </div>

          <button
            type="button"
            onClick={onGoogleLogin}
            className="mt-8 w-full border border-[#c8a45d]/45 hover:border-[#c8a45d] text-[#f8f5ef] px-4 py-3.5 rounded-lg font-sans text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-3"
          >
            <span className="w-6 h-6 rounded-full bg-[#f8f5ef] text-[#111111] font-bold flex items-center justify-center text-sm">G</span>
            Sign in with Google
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="mt-6 bg-[#111111]/80 border border-[#4d4639]/40 rounded-lg p-4 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-[#a0d2b3] shrink-0 mt-0.5" />
            <p className="font-sans text-xs text-[#d1c5b4] leading-relaxed">
              Email and password login is not enabled in this backend phase. ASRA VEDHA accounts are Google OAuth only.
            </p>
          </div>

          <p className="text-center text-sm text-[#9a8f80] mt-7">
            New here?{' '}
            <button onClick={() => setView('signup')} className="text-[#e8c177] hover:text-[#ffdea3] font-semibold cursor-pointer">
              Create an account
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
