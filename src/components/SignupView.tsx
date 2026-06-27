import { ArrowRight, Leaf, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { ViewState } from '../types';

interface SignupViewProps {
  setView: (view: ViewState) => void;
  onGoogleLogin: () => void;
}

export default function SignupView({ setView, onGoogleLogin }: SignupViewProps) {
  return (
    <div className="min-h-screen bg-[#EDEDEC] text-[rgba(0,0,0,0.87)] pt-24 px-6 md:px-12 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,77,54,0.42),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(200,164,93,0.13),transparent_32%)]" />
      <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(200,164,93,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(200,164,93,.7)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-md w-full bg-white/90 border border-[#C9A84C]/25 rounded-xl shadow-2xl overflow-hidden my-10"
      >
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="p-7 md:p-8">
          <button
            onClick={() => setView('home')}
            className="mx-auto flex items-center gap-2 text-[#C9A84C] hover:text-[#B8963C] transition-colors cursor-pointer"
            aria-label="Go home"
          >
            <span className="w-10 h-10 rounded-full border border-[#C9A84C]/40 bg-[#EDEDEC] flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </span>
            <span className="font-display text-2xl tracking-[0.14em] uppercase">ASRA VEDHA</span>
          </button>

          <div className="text-center mt-8">
            <h1 className="font-display text-4xl text-[rgba(0,0,0,0.87)]">Create Your Account</h1>
            <p className="font-sans text-sm text-[rgba(0,0,0,0.38)] mt-2">
              Google creates your ASRA VEDHA account securely in one step.
            </p>
          </div>

          <button
            type="button"
            onClick={onGoogleLogin}
            className="mt-8 w-full border border-[#C9A84C]/45 hover:border-[#C9A84C] text-[rgba(0,0,0,0.87)] px-4 py-3.5 rounded-lg font-sans text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-3"
          >
            <span className="w-6 h-6 rounded-full bg-[#f8f5ef] text-[rgba(0,0,0,0.87)] font-bold flex items-center justify-center text-sm">G</span>
            Continue with Google
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="mt-6 bg-[#EDEDEC]/80 border border-[#C9A84C]/40 rounded-lg p-4 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
            <p className="font-sans text-xs text-[rgba(0,0,0,0.58)] leading-relaxed">
              Password signup is intentionally disabled for this phase. Customer and admin access both use Google OAuth.
            </p>
          </div>

          <p className="text-center text-sm text-[rgba(0,0,0,0.38)] mt-7">
            Already have an account?{' '}
            <button onClick={() => setView('login')} className="text-[#C9A84C] hover:text-[#B8963C] font-semibold cursor-pointer">
              Sign in
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}









