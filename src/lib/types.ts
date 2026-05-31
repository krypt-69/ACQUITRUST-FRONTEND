export interface PublicBusinessSummary {
  id: string;
  slug: string;
  legal_name: string;
  trading_name?: string;
  industry?: string;
  country: string;
  city: string;
  trust_score?: number;
  verification_status: 'verified' | 'unverified' | 'pending';
  revenue_range?: string;
  growth_trend?: number;
}

export interface PublicBusinessProfile {
  id: string;
  slug: string;
  legal_name: string;
  trading_name?: string;
  description?: string;
  industry?: string;
  country: string;
  city: string;
  branches: number;
  trust_score?: number;
  trust_score_components?: Record<string, number>;
  verification_status: string;
  verification_severity?: string;
  last_verified?: string;
  revenue_range?: string;
  growth_trend?: number;
  business_story?: string;
}
