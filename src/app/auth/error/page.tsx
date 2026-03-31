'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ErrorContent() {
  const params = useSearchParams();
  const error = params.get('error');

  return (
    <div className="min-h-screen bg-[#011638] flex items-center justify-center">
      <div className="bg-white rounded-2xl p-10 w-full max-w-sm shadow-2xl flex flex-col items-center gap-6">
        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
          <span className="text-red-500 text-2xl">✕</span>
        </div>
        <h1 className="text-xl font-bold text-[#011638]">Access Denied</h1>
        <p className="text-gray-500 text-sm text-center">
          {error === 'AccessDenied'
            ? 'Only @purple.ai email addresses can access this site.'
            : 'An error occurred during sign in.'}
        </p>
        <Link href="/auth/signin" className="w-full text-center bg-[#7458FD] text-white rounded-xl py-3 font-medium hover:bg-[#5f43e0] transition-colors">
          Try Again
        </Link>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense>
      <ErrorContent />
    </Suspense>
  );
}
