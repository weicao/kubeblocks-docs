import Footer from '@/components/Footer';
import { getStaticParams } from '@/locales/server';
import type { Metadata } from 'next';
import MongoDBOperatorPage from './MongoDBOperatorPage';

export async function generateStaticParams() {
  return getStaticParams();
}

const DESCRIPTION =
  'KubeBlocks MongoDB Operator for Kubernetes — deploy production-grade MongoDB with ReplicaSet HA, sharding, backup & restore, TLS, and full Day-2 operations via a single open-source operator.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'The Production-Grade MongoDB Operator for Kubernetes | KubeBlocks',
    description: DESCRIPTION,
    alternates: { canonical: '/mongodb-operator' },
    openGraph: {
      url: '/mongodb-operator',
      type: 'website',
      title: 'The Production-Grade MongoDB Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks MongoDB Operator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Production-Grade MongoDB Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: ['/logo.png'],
    },
  };
}

export default function Page() {
  return (
    <>
      <MongoDBOperatorPage />
      <Footer />
    </>
  );
}
