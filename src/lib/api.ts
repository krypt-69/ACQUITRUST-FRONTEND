import { API_BASE } from '@/lib/config';

function getAuthHeaders(): HeadersInit {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  if (process.env.NODE_ENV === 'development') {
    return { Authorization: 'Bearer test-token' };
  }
  return {};
}

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...options?.headers,
  };
  const res = await fetch(`${API_BASE}${path}`, { headers, ...options });
  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`API error: ${res.status} ${errorBody}`);
  }
  return res.json();
}

export async function getPublicBusinesses(params?: any) {
  const searchParams = new URLSearchParams();
  if (params) Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) searchParams.append(k, String(v));
  });
  const qs = searchParams.toString();
  return fetchApi(`/public/businesses${qs ? `?${qs}` : ''}`);
}

export async function getPublicBusinessProfile(slug: string) {
  return fetchApi(`/public/businesses/${slug}`);
}
