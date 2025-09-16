import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '@/lib/api';

const noLayoutPages = ['/login', '/register'];

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const nextRouter = useRouter();
  const isNoLayout = noLayoutPages.includes(router.pathname);

  useEffect(() => {
    if (isNoLayout) return;

    const checkAuth = async () => {
      try {
        await api.get('/users/me');
      } catch {
        nextRouter.replace('/login');
      }
    };

    checkAuth();
  }, [isNoLayout, nextRouter]);

  if (isNoLayout) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}