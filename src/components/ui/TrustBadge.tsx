export default function TrustBadge({ score }: { score?: number }) {
  if (score === undefined) return <span className="text-xs bg-gray-200 px-2 py-1 rounded">Pending</span>;
  const color = score >= 80 ? 'bg-green-100 text-green-800' : score >= 60 ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800';
  return <span className={`text-xs font-semibold px-2 py-1 rounded ${color}`}>{score}/100</span>;
}
