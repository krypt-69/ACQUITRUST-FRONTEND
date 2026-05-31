'use client';

import { useEffect, useState } from 'react';
import { API_BASE, INVESTOR_TOKEN } from '@/lib/config';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/notifications`, {
      headers: { Authorization: `Bearer ${INVESTOR_TOKEN}` },
    })
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleMarkRead = async (id: string) => {
    await fetch(`${API_BASE}/notifications/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${INVESTOR_TOKEN}` },
    });
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notifications</h1>
      {notifications.length === 0 && <p>No notifications</p>}
      <ul className="space-y-2">
        {notifications.map((n: any) => (
          <li key={n.id} className={`p-3 rounded shadow ${n.is_read ? 'bg-gray-100' : 'bg-white'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{n.title}</p>
                <p className="text-sm">{n.body}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(n.created_at).toLocaleString()}</p>
              </div>
              {!n.is_read && (
                <button
                  onClick={() => handleMarkRead(n.id)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Mark read
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
