import { Result } from '@/components/Result';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return <Result status="notfound" title="404" description="Sorry, the page you visited does not exist." />;
}
