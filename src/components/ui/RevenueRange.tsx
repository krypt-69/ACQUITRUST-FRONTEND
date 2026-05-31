export default function RevenueRange({ range }: { range?: string }) {
  if (!range) return <span className="text-gray-400">N/A</span>;
  return <span className="font-medium">{range}</span>;
}
