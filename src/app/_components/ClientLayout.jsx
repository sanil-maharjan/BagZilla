"use client";

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const hideFooter = pathname === '/auth' || pathname === '/forgot-password';

  return (
    <>
      <Suspense fallback={<div className="h-16 bg-white border-b border-gray-100" />}>
        <Navbar />
      </Suspense>
      <main className="pt-16 min-h-screen">
        {children}
      </main>
      {!hideFooter && <Footer />}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}
