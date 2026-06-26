import { LayoutShell } from '@/components/layouts/LayoutShell';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutShell>
      <main className="flex justify-center">
        <div className="w-full max-w-4xl px-4 py-6 md:px-10 md:py-10">{children}</div>
      </main>
    </LayoutShell>
  );
}
