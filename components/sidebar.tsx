// components/Sidebar.tsx
import React from 'react';
import { Home } from 'lucide-react';
import { useRouter } from 'next/router';

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <aside className="w-16 border-r border-border bg-card">
      <nav className="flex flex-col gap-2 p-2">
        <button
          onClick={() => router.push('/')}
          className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-accent transition-colors"
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
