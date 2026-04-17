interface ComponentPreviewProps {
  children: React.ReactNode;
  label?: string;
  bg?: 'white' | 'dark' | 'gray';
}

export function ComponentPreview({ children, label, bg = 'white' }: ComponentPreviewProps) {
  const bgClass = bg === 'dark' ? 'bg-[#011638]' : bg === 'gray' ? 'bg-gray-100' : 'bg-white';
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden my-4" data-testid="component-preview" data-label={label ?? ''}>
      {label && (
        <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200">
          <span className="text-xs font-medium text-gray-500">{label}</span>
        </div>
      )}
      <div className={`${bgClass} p-10 flex flex-wrap gap-4 items-center justify-center min-h-[160px] relative`}>
        {children}
      </div>
    </div>
  );
}
