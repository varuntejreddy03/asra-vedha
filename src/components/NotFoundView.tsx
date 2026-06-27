import { ViewState } from '../types';

export default function NotFoundView({ setView }: { setView: (v: ViewState) => void }) {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-6xl text-[#C9A84C] mb-4">404</h1>
      <p className="text-[#6B6B6B] text-lg mb-8">Page not found</p>
      <button
        onClick={() => setView('home')}
        className="bg-[#C9A84C] text-[#2B2B2B] text-xs font-bold uppercase tracking-widest px-6 py-3 rounded hover:bg-[#B8963C] transition-colors cursor-pointer"
      >
        Go Home
      </button>
    </section>
  );
}







