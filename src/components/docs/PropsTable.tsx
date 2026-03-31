interface Prop {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export function PropsTable({ props }: { props: Prop[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 my-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 py-3 font-semibold text-gray-700">Prop</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700">Type</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700">Default</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p, i) => (
            <tr key={p.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              <td className="px-4 py-3 font-mono text-[#7458FD] font-medium">
                {p.name}
                {p.required && <span className="ml-1 text-red-500 text-xs">*</span>}
              </td>
              <td className="px-4 py-3 font-mono text-gray-600 text-xs">{p.type}</td>
              <td className="px-4 py-3 text-gray-500 text-xs">{p.default ?? '—'}</td>
              <td className="px-4 py-3 text-gray-700">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
