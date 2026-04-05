import I18nProvider from '@/components/I18nProvider';
import MessageBox from '@/components/MessageBox';
import { MuiThemeProvider } from '@/components/MuiThemeProvider';
import { NextThemeProvider } from '@/components/NextThemeProvider';
import ScrollTop from '@/components/ScrollTop';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { setStaticParamsLocale } from 'next-international/server';
import { Geist } from 'next/font/google';
import { getSiteUrl } from '@/utils/site';
import { ElevationScrollAppBar } from './ElevationScrollAppBar';

import 'highlight.js/styles/github-dark.css';
import Script from 'next/script';
import './global.css';

const geist = Geist({
  subsets: ['latin'],
});

const DEFAULT_DESCRIPTION =
  'Meet KubeBlocks, the open-source, unified database operator for Kubernetes. Simplify cloud-native data management with a single API for MySQL, PostgreSQL, MongoDB, Kafka, and more. Tame operator sprawl and streamline Day-2 operations.';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'KubeBlocks',
    template: '%s | KubeBlocks',
  },
  description: DEFAULT_DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: {
    languages: {
      'en': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'KubeBlocks',
    locale: 'en_US',
    title: 'KubeBlocks',
    description: DEFAULT_DESCRIPTION,
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KubeBlocks',
    title: 'KubeBlocks',
    description: DEFAULT_DESCRIPTION,
    images: ['/logo.png'],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning className={geist.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="me" href="https://github.com/apecloud" />
        <link rel="me" href="https://twitter.com/KubeBlocks" />
        <link rel="author" href="/humans.txt" />
      </head>
      <body>
        <Script src="/c.js" />
        <I18nProvider locale={locale as 'en'}>
          <AppRouterCacheProvider options={{ key: 'css' }}>
            <NextThemeProvider>
              <MuiThemeProvider>
                <CssBaseline />
                <MessageBox />
                <ElevationScrollAppBar />
                <Toolbar />
                <Box component="main">{children}</Box>
                <ScrollTop />
              </MuiThemeProvider>
            </NextThemeProvider>
          </AppRouterCacheProvider>
        </I18nProvider>
      </body>
      <GoogleAnalytics gaId="G-1P80WT42PB" />
    </html>
  );
}
