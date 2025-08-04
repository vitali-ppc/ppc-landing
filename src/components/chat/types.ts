export interface Message {
  role: 'user' | 'ai';
  text: string;
  image?: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GoogleAdsData {
  total: {
    cost: number;
    clicks: number;
    impressions: number;
    conversions: number;
    ctr: number;
    cpc: number;
    conversion_rate: number;
    revenue?: number;
    roas?: number;
    roi?: number;
  };
  campaigns: Array<{
    name: string;
    status: string;
    cost: number;
    clicks: number;
    impressions: number;
    conversions: number;
    ctr: number;
    cpc: number;
    conversion_rate: number;
    revenue?: number;
    roas?: number;
    roi?: number;
  }>;
  date_range: string;
  demographics?: Array<{
    age_group: string;
    gender: string;
    clicks: number;
    cost: number;
    conversions: number;
  }>;
}

export const REPORT_TEMPLATES = {
  campaign_analysis: {
    name: 'Campaign Analysis',
    description: 'Detailed campaign performance analysis',
    prompt: 'Conduct a detailed analysis of Google Ads campaign. Include performance metrics analysis, issues identification and improvement recommendations.'
  },
  keyword_analysis: {
    name: 'Keyword Analysis',
    description: 'Keyword performance analysis',
    prompt: 'Analyze keyword effectiveness. Show best and worst performing keywords with recommendations.'
  },
  monthly_report: {
    name: 'Monthly Report',
    description: 'Comprehensive monthly report',
    prompt: 'Create a comprehensive monthly report for Google Ads campaign with key metrics and trends.'
  },
  quick_analysis: {
    name: 'Quick Analysis',
    description: 'Quick overview of key metrics',
    prompt: 'Conduct a quick analysis of key campaign metrics and highlight main issues.'
  },
  performance_review: {
    name: 'Performance Review',
    description: 'Detailed performance review',
    prompt: 'Conduct a detailed performance review of the campaign focusing on ROI and cost efficiency.'
  },
  budget_analysis: {
    name: 'Budget Analysis',
    description: 'Budget allocation and efficiency analysis',
    prompt: 'Analyze budget distribution across campaigns and provide recommendations for cost optimization.'
  }
} as const;

export const EXPORT_ENDPOINTS = {
  txt: '/api/export-txt',
  csv: '/api/export-csv',
  pdf: '/api/export-pdf',
  xlsx: '/api/export-xlsx',
  json: '/api/export-json'
} as const;

export type ExportFormat = keyof typeof EXPORT_ENDPOINTS; 