'use client';
import { useRouter } from 'next/navigation';
import { PurpleLogo } from '@/components/ui/PurpleLogo';

export default function SignInClient() {
  const router = useRouter();

  function enter() {
    document.cookie = 'purpleui-session=1; path=/; max-age=31536000';
    router.push('/');
  }

  return (
    <div className="min-h-screen bg-[#011638] flex items-center justify-center">
      <div className="bg-white rounded-2xl p-10 w-full max-w-sm shadow-2xl flex flex-col items-center gap-6">

        {/* Logo lockup */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <PurpleLogo variant="dark-purple" width={120} />
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: 26,
                lineHeight: 1,
                color: 'transparent',
                WebkitTextStroke: '2px #011638',
                display: 'inline-block',
                transform: 'translateY(0.1em)',
              }}
            >
              UI
            </span>
          </div>
          <p className="text-gray-400 text-sm text-center leading-relaxed">
            Design tokens, components, and patterns<br />for the Purple mobile experience.
          </p>
        </div>

        {/* Enter button */}
        <button
          onClick={enter}
          className="w-full flex items-center justify-center bg-[#7458FD] hover:bg-[#5f43e0] text-white font-semibold rounded-xl py-3 px-4 transition-colors"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Enter
        </button>

      </div>
    </div>
  );
}
