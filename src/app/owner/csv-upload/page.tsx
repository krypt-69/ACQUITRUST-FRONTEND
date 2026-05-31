'use client';

import { useState } from 'react';
import { useBusiness } from '@/context/BusinessContext';
import { API_BASE, OWNER_TOKEN } from '@/lib/config';

export default function CsvUploadPage() {
  const { selectedBusinessId } = useBusiness();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !selectedBusinessId) return;
    setUploading(true);
    // Read CSV and send each row as a raw event (simplified)
    const text = await file.text();
    const rows = text.split('\n').filter(r => r.trim());
    let ingested = 0;
    for (const row of rows.slice(1)) { // skip header
      const cols = row.split(',');
      if (cols.length < 2) continue;
      const amount = parseFloat(cols[1]);
      if (isNaN(amount)) continue;
      try {
        const res = await fetch(`${API_BASE}/events/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OWNER_TOKEN}`,
          },
          body: JSON.stringify({
            business_id: selectedBusinessId,
            source_id: 'bac490cc-08fa-4e7e-9480-66aeb2d0c49d', // demo M-Pesa source ID
            event_type: 'payment_received',
            source_event_id: `csv-${Date.now()}-${ingested}`,
            source_name: 'CSV Upload',
            payload_json: {
              amount,
              currency: 'KES',
              customer: cols[0] || 'unknown',
              timestamp: new Date().toISOString(),
            },
          }),
        });
        if (res.ok) ingested++;
      } catch {}
    }
    setResult(`Ingested ${ingested} events from CSV.`);
    setUploading(false);
  };

  if (!selectedBusinessId) return <div>No business selected</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">CSV Upload</h1>
      <div className="bg-white p-6 rounded shadow max-w-md">
        <p className="mb-4">Upload a CSV with columns: <strong>customer, amount</strong></p>
        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload & Ingest'}
          </button>
        </form>
        {result && <p className="mt-4 text-green-700">{result}</p>}
      </div>
    </div>
  );
}
