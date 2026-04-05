import { DOCS_DIR, getMarkDownSideBar, getFirstMenuItem } from '@/utils/markdown';
import { getStaticParams } from '@/locales/server';
import fs from 'fs';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import path from 'path';

type Params = { locale: string; version: string };

export async function generateStaticParams() {
  const data: Params[] = [];
  getStaticParams().forEach(({ locale }) => {
    const localeDir = path.join(DOCS_DIR, locale);
    if (!fs.existsSync(localeDir)) return;
    fs.readdirSync(localeDir).forEach((version) => {
      if (fs.statSync(path.join(localeDir, version)).isDirectory()) {
        data.push({ locale, version });
      }
    });
  });
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { version } = await params;
  return {
    title: `KubeBlocks ${version} Documentation`,
    description: `Official KubeBlocks ${version} documentation covering installation, cluster management, backup, scaling, and 35+ supported databases.`,
    robots: { index: true, follow: true },
  };
}

export default async function DocsVersionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, version } = await params;

  const dir = path.join(DOCS_DIR, locale, version);
  const enDir = path.join(DOCS_DIR, 'en', version);
  const baseDir = fs.existsSync(dir) ? dir : enDir;

  if (!fs.existsSync(baseDir)) redirect('/');

  // Find first category's first doc
  const categories = fs.readdirSync(baseDir).filter((c) => !c.startsWith('_'));
  for (const category of categories) {
    const menu = await getMarkDownSideBar(path.join(baseDir, category));
    const first = getFirstMenuItem(menu);
    if (first?.href) redirect(first.href);
  }

  redirect('/');
}
