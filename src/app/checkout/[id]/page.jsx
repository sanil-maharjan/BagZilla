import { Suspense } from 'react';
import Checkout from '@/app/checkout/[id]/_components/Checkout';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-gray-500">Loading checkout...</div>}>
      <Checkout />
    </Suspense>
  );
}
