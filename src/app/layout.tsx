import ToastProvider from '@/providers/ToastProvider';
import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/providers/QueryProvider';
import localFont from 'next/font/local';
import Footer from '@/components/Footer';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import { Suspense } from 'react';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '지금여기',
  description: '로컬의 정보를 확인하고 공유할 수 있는 플랫폼입니다.',
  icons: {
    icon: '/Symbol.png',
  },
};

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable} font-pretendard bg-gray0`}>
        <QueryProvider>
          <div className="max-w-[375px] mx-auto">
            <ToastProvider>{children}</ToastProvider>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
export default RootLayout;
