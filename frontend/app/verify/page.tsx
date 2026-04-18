import { Suspense } from 'react';
import VerifyPage from '@/components/VerifyPage';

export default function VerifyPageWrapper() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <VerifyPage />
    </Suspense>
  );
}