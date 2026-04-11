import Footer from '@/components/Footer';
import { getStaticParams } from '@/locales/server';
import type { Metadata } from 'next';
import RedisOperatorPage from './RedisOperatorPage';

export async function generateStaticParams() {
  return getStaticParams();
}

const DESCRIPTION =
  'KubeBlocks Redis Operator for Kubernetes — deploy production-grade Redis with Sentinel-based HA, ACL management, RDB backup & restore, horizontal scaling, and unified Day-2 operations via a single open-source operator.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'The Production-Grade Redis Operator for Kubernetes | KubeBlocks',
    description: DESCRIPTION,
    alternates: { canonical: '/redis-operator' },
    openGraph: {
      url: '/redis-operator',
      type: 'website',
      title: 'The Production-Grade Redis Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks Redis Operator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Production-Grade Redis Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: ['/logo.png'],
    },
  };
}

export default function Page() {
  return (
    <>
      <RedisOperatorPage />
      <Footer />
    </>
  );
}
