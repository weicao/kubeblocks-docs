import Footer from '@/components/Footer';
import { getStaticParams } from '@/locales/server';
import type { Metadata } from 'next';
import PgOperatorPage from './PgOperatorPage';

export async function generateStaticParams() {
  return getStaticParams();
}

const DESCRIPTION =
  'KubeBlocks PostgreSQL Operator for Kubernetes — deploy production-grade PostgreSQL with Patroni HA, WAL-based PITR, built-in pgbouncer, pgvector, PostGIS, and unified Day-2 operations via a single open-source operator.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'The Production-Grade PostgreSQL Operator for Kubernetes | KubeBlocks',
    description: DESCRIPTION,
    alternates: { canonical: '/pg-operator' },
    openGraph: {
      url: '/pg-operator',
      type: 'website',
      title: 'The Production-Grade PostgreSQL Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks PostgreSQL Operator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Production-Grade PostgreSQL Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: ['/logo.png'],
    },
  };
}

export default function Page() {
  return (
    <>
      <PgOperatorPage />
      <Footer />
    </>
  );
}
