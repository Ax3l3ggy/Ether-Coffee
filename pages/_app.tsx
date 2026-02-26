// pages/_app.tsx
import '../styles/globals.css';
import '@scale/scaleui-radix/dist/styles.css';
import { Theme, Container } from '@scale/scaleui-radix';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Theme appearance="dark">
      <div
        style={{
          color: 'rgba(255, 255, 255, 0.95)',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        }}
      >
        <Header />
        <div
          style={{
            display: 'flex',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <Sidebar />
          <div
            style={{
              flex: 1,
              overflow: 'auto',
              position: 'relative',
            }}
          >
            <Container size="4" style={{ padding: '30px' }}>
              <Component {...pageProps} />
            </Container>
          </div>
        </div>
        <Analytics />
      </div>
    </Theme>
  );
}
export default MyApp;
