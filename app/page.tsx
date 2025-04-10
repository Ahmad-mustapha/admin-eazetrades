// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/admin/dashboard'); // Auto-redirect to your dashboard
}

// pages/404.tsx
import Link from 'next/link';
import Head from 'next/head';
import type { ReactElement } from 'react';
import { NextPageWithLayout } from './layout';

export const Custom404: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Oops! Page Not Found.</h2>
        <p className="text-gray-500 mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <a className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
            Go Back Home
          </a>
        </Link>
      </div>
    </>
  );
};

// This is the crucial part to prevent the default layout from wrapping this page
Custom404.getLayout = function getLayout(page: ReactElement) {
  return page; // Simply return the page itself, without any layout wrapper
};

// export default Custom404;