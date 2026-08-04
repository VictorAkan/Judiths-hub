import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import { SiteShell } from '@/components/layout/site-shell';
import { QueryProvider } from '@/components/providers/query-provider';
import { AuthProvider } from '@/components/providers/auth-provider';
import { Toaster } from '@/components/ui/toast';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${SITE_NAME} — Sustainable Fashion, Beautifully Pre-Loved`,
  description: SITE_DESCRIPTION,
  keywords: [
    'sustainable fashion',
    'pre-loved clothing',
    'upcycled dresses',
    'eco-friendly fashion',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen bg-warm text-ink antialiased">
        <QueryProvider>
          <AuthProvider>
            <SiteShell>{children}</SiteShell>
            <Toaster />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
