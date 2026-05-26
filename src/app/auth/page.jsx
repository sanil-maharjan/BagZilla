import { Suspense } from 'react';
import Auth from '@/app/auth/_components/Auth';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center bg-gray-50/50" />}>
      <Auth />
    </Suspense>
  );
}
