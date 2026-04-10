import Footer from '@/components/Footer';
import { getStaticParams } from '@/locales/server';
import type { Metadata } from 'next';
import MysqlOperatorPage from './MysqlOperatorPage';

export async function generateStaticParams() {
  return getStaticParams();
}

const DESCRIPTION =
  'KubeBlocks MySQL Operator for Kubernetes — deploy production-grade MySQL with automated failover, PITR backup, SemiSync and Group Replication (MGR), ProxySQL, and unified Day-2 operations via a single open-source operator.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'The Production-Grade MySQL Operator for Kubernetes | KubeBlocks',
    description: DESCRIPTION,
    alternates: { canonical: '/mysql-operator' },
    openGraph: {
      url: '/mysql-operator',
      type: 'website',
      title: 'The Production-Grade MySQL Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks MySQL Operator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Production-Grade MySQL Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: ['/logo.png'],
    },
  };
}

export default function Page() {
  return (
    <>
      <MysqlOperatorPage />
      <Footer />
    </>
  );
}
