import { Suspense } from 'react';
import PaymentStatus from '@/app/payment-status/_components/PaymentStatus';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center bg-gray-50/50" />}>
      <PaymentStatus />
    </Suspense>
  );
}
