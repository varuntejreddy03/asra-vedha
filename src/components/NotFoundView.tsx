import { ViewState } from '../types';

export default function NotFoundView({ setView }: { setView: (v: ViewState) => void }) {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-6xl text-[#C4A042] mb-4">404</h1>
      <p className="text-[#d1c5b4] text-lg mb-8">Page not found</p>
      <button
        onClick={() => setView('home')}
        className="bg-[#C4A042] text-[#1A0F00] text-xs font-bold uppercase tracking-widest px-6 py-3 rounded hover:bg-[#d4b052] transition-colors cursor-pointer"
      >
        Go Home
      </button>
    </section>
  );
}

