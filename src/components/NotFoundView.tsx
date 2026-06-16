import { ViewState } from '../types';

export default function NotFoundView({ setView }: { setView: (v: ViewState) => void }) {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-6xl text-[#e8c177] mb-4">404</h1>
      <p className="text-[#d1c5b4] text-lg mb-8">Page not found</p>
      <button
        onClick={() => setView('home')}
        className="bg-[#c8a45d] text-[#261900] text-xs font-bold uppercase tracking-widest px-6 py-3 rounded hover:bg-[#ffdea3] transition-colors cursor-pointer"
      >
        Go Home
      </button>
    </section>
  );
}
