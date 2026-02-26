import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-8">
      <h1 className="text-6xl font-bold">
        Ether Coffee
      </h1>
      <p className="text-xl text-slate-400 text-center max-w-2xl">
        AI-powered industrial diagnostic system for aseptic production lines
      </p>
      <Link
        href="/monitoring"
        className="px-12 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all text-xl shadow-xl transform hover:scale-105"
      >
        Launch Monitoring System →
      </Link>
    </div>
  );
}
