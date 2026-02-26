// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { useRouter } from 'next/router';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isFullscreen = router.pathname === '/dashboard' || router.pathname === '/monitoring';

  if (isFullscreen) {
    // Fullscreen pages with no wrapper
    return (
      <div className="dark">
        <Component {...pageProps} />
        <Analytics />
      </div>
    );
  }

  // Regular layout for other pages
  return (
    <div className="dark">
      <div className="flex flex-col min-h-screen fixed inset-0 overflow-hidden text-foreground">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-auto relative">
            <div className="max-w-7xl mx-auto p-8">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
        <Analytics />
      </div>
    </div>
  );
}
export default MyApp;
