import { PurpleLogo, PurpleIcon } from '@/components/ui/PurpleLogo';

const colourways = [
  {
    label: 'Blue with Purple dots',
    bg: '#F5F1ED',
    variant: 'dark-purple' as const,
    usage: 'Use on light / pearl white backgrounds',
  },
  {
    label: 'White with Navy dots',
    bg: '#7458FD',
    variant: 'white-navy' as const,
    usage: 'Use on the Purple brand colour',
  },
  {
    label: 'White with Purple dots',
    bg: '#011638',
    variant: 'white-purple' as const,
    usage: 'Use on dark navy / dark backgrounds',
  },
];

export default function LogosPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Logo</h1>
      <p className="text-gray-500 mb-10">
        The Purple logo is available in colourways designed to work on both light and dark backgrounds.
      </p>

      {/* Wordmark */}
      <div className="flex flex-col gap-3 mb-12">
        {colourways.map(({ label, bg, variant, usage }) => (
          <div key={label + bg} className="rounded-2xl overflow-hidden border border-[#DDDDDF]">
            <div
              className="flex items-center justify-center py-12"
              style={{ backgroundColor: bg }}
            >
              <PurpleLogo variant={variant} width={320} />
            </div>
            <div className="px-5 py-4 bg-white flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-black">{label}</p>
                <p className="text-sm text-[#595959] mt-0.5">{usage}</p>
              </div>
              <div
                className="w-8 h-8 rounded-full border border-[#DDDDDF] flex-shrink-0"
                style={{ backgroundColor: bg }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Icon mark */}
      <h2 className="text-xl font-bold text-gray-900 mb-2">Logo Icon</h2>
      <p className="text-gray-500 mb-6">
        The standalone icon mark, used where the full wordmark would be too large.
      </p>
      <div className="flex flex-col gap-3">
        {colourways.map(({ label, bg, variant, usage }) => (
          <div key={'icon-' + bg} className="rounded-2xl overflow-hidden border border-[#DDDDDF]">
            <div
              className="flex items-center justify-center py-12"
              style={{ backgroundColor: bg }}
            >
              <PurpleIcon variant={variant} size={96} />
            </div>
            <div className="px-5 py-4 bg-white flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-black">{label}</p>
                <p className="text-sm text-[#595959] mt-0.5">{usage}</p>
              </div>
              <div
                className="w-8 h-8 rounded-full border border-[#DDDDDF] flex-shrink-0"
                style={{ backgroundColor: bg }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
