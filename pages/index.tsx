import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-8">
      <h1 className="text-6xl font-bold">
        Ether Coffee
      </h1>
      <Link
        href="/dashboard"
        className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors text-lg"
      >
        View Incident Dashboard →
      </Link>
    </div>
  );
}
