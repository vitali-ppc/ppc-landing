'use client';

import React, { useState, useEffect, useMemo } from 'react';

// Google Ads Connection Status Component
const GoogleAdsConnectionStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentAccount, setCurrentAccount] = useState<any>(null);

  useEffect(() => {
    loadGoogleAdsStatus();
  }, []);

  const loadGoogleAdsStatus = async () => {
    try {
      setIsLoading(true);
      
      const accessToken = localStorage.getItem('googleAccessToken');
      const refreshToken = localStorage.getItem('googleRefreshToken');
      
      if (!accessToken || !refreshToken) {
        setIsConnected(false);
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/google-ads-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken, refreshToken })
      });

      if (response.ok) {
        const data = await response.json();
        setIsConnected(data.connected);
        setCurrentAccount(data.currentAccount);
      } else {
        setIsConnected(false);
      }
    } catch (error) {
      console.error('Error loading Google Ads status:', error);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = () => {
    // Відкриваємо модальне вікно авторизації через глобальний компонент
    const event = new CustomEvent('openGoogleAdsAuth');
    window.dispatchEvent(event);
  };

  if (isLoading) {
    return (
      <div style={{
        padding: '12px 24px',
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#9ca3af',
            animation: 'pulse 2s infinite',
          }} />
          <span style={{ fontSize: 14, color: '#6b7280' }}>Checking connection...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: '12px 24px',
      background: '#f8fafc',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: isConnected ? '#10b981' : '#ef4444',
        }} />
        <span style={{ 
          fontSize: 14, 
          color: isConnected ? '#059669' : '#dc2626',
          fontWeight: 500,
        }}>
          {isConnected ? 'Google Ads Connected' : 'Google Ads Not Connected'}
        </span>
        {isConnected && currentAccount && (
          <span style={{ 
            fontSize: 12, 
            color: '#64748b',
            backgroundColor: '#f1f5f9',
            padding: '2px 6px',
            borderRadius: '4px'
          }}>
            {currentAccount.name}
          </span>
        )}
      </div>
      
      <button
        onClick={handleConnect}
        style={{
          background: isConnected ? '#f3f4f6' : '#667eea',
          color: isConnected ? '#374151' : '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '8px 16px',
          fontSize: 13,
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = isConnected ? '#e5e7eb' : '#5a67d8';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = isConnected ? '#f3f4f6' : '#667eea';
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        {isConnected ? 'Change Account' : 'Connect Google Ads'}
      </button>
    </div>
  );
};

// Types
interface Campaign {
  id: number;
  name: string;
  status: 'ENABLED' | 'PAUSED';
  type: 'Search' | 'Display' | 'Discovery' | 'Performance Max';
  cost: number;
  cpc: number;
  ctr: number;
  conversions: number;
}

interface SortConfig {
  key: keyof Campaign;
  direction: 'asc' | 'desc';
}

// Mock data
const mockCampaigns: Campaign[] = [
  { id: 1, name: 'Summer Sale 2024', status: 'ENABLED', type: 'Search', cost: 2450.50, cpc: 2.15, ctr: 3.2, conversions: 45 },
  { id: 2, name: 'Brand Awareness Q1', status: 'ENABLED', type: 'Display', cost: 1890.75, cpc: 1.85, ctr: 2.8, conversions: 32 },
  { id: 3, name: 'Product Launch', status: 'PAUSED', type: 'Discovery', cost: 3200.00, cpc: 3.45, ctr: 4.1, conversions: 67 },
  { id: 4, name: 'Holiday Special', status: 'ENABLED', type: 'Search', cost: 1567.25, cpc: 1.95, ctr: 2.9, conversions: 28 },
  { id: 5, name: 'Retargeting Campaign', status: 'ENABLED', type: 'Display', cost: 890.50, cpc: 1.25, ctr: 1.8, conversions: 15 },
  { id: 6, name: 'Local SEO Boost', status: 'PAUSED', type: 'Search', cost: 2100.00, cpc: 2.75, ctr: 3.5, conversions: 38 },
  { id: 7, name: 'Mobile App Install', status: 'ENABLED', type: 'Discovery', cost: 3450.75, cpc: 4.20, ctr: 5.2, conversions: 89 },
  { id: 8, name: 'Lead Generation', status: 'ENABLED', type: 'Search', cost: 1780.25, cpc: 2.10, ctr: 2.7, conversions: 42 },
  { id: 9, name: 'Competitor Targeting', status: 'PAUSED', type: 'Display', cost: 1200.00, cpc: 1.65, ctr: 2.1, conversions: 19 },
  { id: 10, name: 'Seasonal Promotion', status: 'ENABLED', type: 'Discovery', cost: 2980.50, cpc: 3.15, ctr: 3.8, conversions: 56 },
  { id: 11, name: 'Performance Max Q4', status: 'ENABLED', type: 'Performance Max', cost: 4200.00, cpc: 2.85, ctr: 4.5, conversions: 78 },
  { id: 12, name: 'Smart Shopping Campaign', status: 'ENABLED', type: 'Performance Max', cost: 3150.25, cpc: 2.40, ctr: 3.9, conversions: 65 },
];

const mockAccounts = [
  { id: 'account-a', name: 'Account A', customerId: '123456789' },
  { id: 'account-b', name: 'Account B', customerId: '987654321' },
  { id: 'account-c', name: 'Account C', customerId: '456789123' },
  { id: 'account-d', name: 'Digital Marketing Pro', customerId: '789123456' },
  { id: 'account-e', name: 'E-commerce Solutions', customerId: '321654987' },
  { id: 'account-f', name: 'Startup Growth', customerId: '654321987' },
  { id: 'account-g', name: 'Enterprise Solutions', customerId: '147258369' },
  { id: 'account-h', name: 'Local Business Hub', customerId: '963852741' },
];

export default function DashboardPage() {
  // State
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<{id: string, name: string, customerId: string} | null>(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });
     const [filters, setFilters] = useState({
     search: '',
     status: 'All',
     type: 'All',
     minConversions: '',
   });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Account dropdown state
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [accountSearchTerm, setAccountSearchTerm] = useState('');
  const [focusedAccountIndex, setFocusedAccountIndex] = useState(-1);
  
  // Real accounts state
  const [accounts, setAccounts] = useState<Array<{id: string, name: string, customerId: string}>>([]);
  const [accountsLoading, setAccountsLoading] = useState(false);
  const [accountsError, setAccountsError] = useState<string | null>(null);

  // Load accounts from Google Ads API
  const loadAccounts = async () => {
    try {
      setAccountsLoading(true);
      setAccountsError(null);
      
      // Получаем токены из localStorage (или из другого места где они хранятся)
      const accessToken = localStorage.getItem('googleAccessToken');
      const refreshToken = localStorage.getItem('googleRefreshToken');
      
      if (!accessToken || !refreshToken) {
        console.log('No Google Ads tokens found, using mock accounts');
        setAccounts(mockAccounts);
        if (!selectedAccount) {
          setSelectedAccount(mockAccounts[0]);
        }
        setAccountsLoading(false);
        return;
      }
      
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken,
          refreshToken
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to load accounts');
      }
      
      const data = await response.json();
      
      // Преобразуем данные в нужный формат
      const formattedAccounts = data.accounts?.map((account: any, index: number) => ({
        id: account.customerId || `account-${index}`,
        name: account.descriptiveName || account.name || `Account ${index + 1}`,
        customerId: account.customerId || `CID-${index + 1}`
      })) || [];
      
      setAccounts(formattedAccounts);
      
      // Если есть аккаунты, выбираем первый
      if (formattedAccounts.length > 0 && !selectedAccount) {
        setSelectedAccount(formattedAccounts[0]);
      }
      
    } catch (error) {
      console.error('Error loading accounts:', error);
      setAccountsError(error instanceof Error ? error.message : 'Failed to load accounts');
      
      // Fallback to mock accounts if API fails
      setAccounts(mockAccounts);
      if (!selectedAccount) {
        setSelectedAccount(mockAccounts[0]);
      }
    } finally {
      setAccountsLoading(false);
    }
  };

  // Load accounts on component mount
  useEffect(() => {
    loadAccounts();
  }, []);

  // Load dashboard data
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const accessToken = localStorage.getItem('googleAccessToken');
      const refreshToken = localStorage.getItem('googleRefreshToken');
      
      if (!accessToken || !refreshToken || !selectedAccount) {
        // Fallback to mock data if no tokens or account selected
        console.log('No Google Ads tokens found, using mock data');
        setCampaigns(mockCampaigns);
        setLoading(false);
        return;
      }
      
      const response = await fetch('/api/dashboard-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken,
          refreshToken,
          customerId: selectedAccount.customerId,
          dateRange: {
            from: dateFrom,
            to: dateTo
          }
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Dashboard data error:', errorData);
        // Fallback to mock data on error
        setCampaigns(mockCampaigns);
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        // Transform API data to match our interface
        const transformedCampaigns = data.data.campaigns.map((campaign: any, index: number) => ({
          id: index + 1,
          name: campaign.name,
          status: campaign.status,
          type: campaign.type || 'Search',
          cost: campaign.cost,
          cpc: campaign.cpc,
          ctr: campaign.ctr,
          conversions: campaign.conversions
        }));
        
        setCampaigns(transformedCampaigns);
      } else {
        // Fallback to mock data
        setCampaigns(mockCampaigns);
      }
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Fallback to mock data on error
      setCampaigns(mockCampaigns);
    } finally {
      setLoading(false);
    }
  };

  // Load dashboard data when account or date range changes
  useEffect(() => {
    if (selectedAccount) {
      loadDashboardData();
    }
  }, [selectedAccount, dateFrom, dateTo]);

  // Force English locale for date inputs
  useEffect(() => {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
      input.setAttribute('lang', 'en');
      input.setAttribute('data-date-format', 'dd.mm.yyyy');
    });
  }, []);

  // Close account dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-account-dropdown]')) {
        setIsAccountDropdownOpen(false);
        setAccountSearchTerm('');
        setFocusedAccountIndex(-1);
      }
    };

    if (isAccountDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAccountDropdownOpen]);

  // Keyboard navigation for account dropdown
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isAccountDropdownOpen) return;

      const currentAccounts = accounts.length > 0 ? accounts : mockAccounts;
      const filteredAccounts = currentAccounts.filter(account => 
        account.name.toLowerCase().includes(accountSearchTerm.toLowerCase()) ||
        account.customerId.includes(accountSearchTerm)
      );

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setFocusedAccountIndex(prev => 
            prev < filteredAccounts.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedAccountIndex(prev => 
            prev > 0 ? prev - 1 : filteredAccounts.length - 1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (focusedAccountIndex >= 0 && focusedAccountIndex < filteredAccounts.length) {
            setSelectedAccount(filteredAccounts[focusedAccountIndex]);
            setIsAccountDropdownOpen(false);
            setAccountSearchTerm('');
            setFocusedAccountIndex(-1);
          }
          break;
        case 'Escape':
          event.preventDefault();
          setIsAccountDropdownOpen(false);
          setAccountSearchTerm('');
          setFocusedAccountIndex(-1);
          break;
      }
    };

    if (isAccountDropdownOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAccountDropdownOpen, accountSearchTerm, focusedAccountIndex]);

  // Filter and sort campaigns
  useEffect(() => {
    let filtered = [...campaigns];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(campaign =>
        campaign.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

         // Status filter
     if (filters.status !== 'All') {
       filtered = filtered.filter(campaign => campaign.status === filters.status);
     }

     // Type filter
     if (filters.type !== 'All') {
       filtered = filtered.filter(campaign => campaign.type === filters.type);
     }

    // Min conversions filter
    if (filters.minConversions) {
      filtered = filtered.filter(campaign => 
        campaign.conversions >= parseInt(filters.minConversions)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    setFilteredCampaigns(filtered);
    setCurrentPage(1);
  }, [campaigns, filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // KPI calculations
  const kpis = {
    spend: campaigns.reduce((sum, campaign) => sum + campaign.cost, 0),
    impressions: campaigns.reduce((sum, campaign) => sum + Math.round((campaign.cost / campaign.cpc) / (campaign.ctr / 100)), 0),
    clicks: campaigns.reduce((sum, campaign) => sum + Math.round(campaign.cost / campaign.cpc), 0),
    conversions: campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0),
    cpa: campaigns.reduce((sum, campaign) => sum + campaign.cost, 0) / 
         campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0) || 0,
  };

  // Mock trend data (in real app, this would come from API)
  const trends = {
    spend: { value: 12.5, direction: 'up' },
    impressions: { value: 18.2, direction: 'up' },
    clicks: { value: 8.3, direction: 'up' },
    conversions: { value: 15.7, direction: 'up' },
    cpa: { value: 3.2, direction: 'down' }, // CPA down is good
  };

  // Target CPA value (in real app, this would come from settings/API)
  const targetCPA = 50.00;

  // Handlers
  const handleSort = (key: keyof Campaign) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCampaigns(paginatedCampaigns.map(c => c.id));
    } else {
      setSelectedCampaigns([]);
    }
  };

  const handleSelectCampaign = (campaignId: number, checked: boolean) => {
    if (checked) {
      setSelectedCampaigns(prev => [...prev, campaignId]);
    } else {
      setSelectedCampaigns(prev => prev.filter(id => id !== campaignId));
    }
  };

  const handleAnalyzeWithAI = () => {
    console.log('Analyzing campaigns:', selectedCampaigns);
    // TODO: Implement AI analysis
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  const getCampaignTypeIcon = (type: string) => {
    switch (type) {
      case 'Search':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: '#667eea' }}>
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
             case 'Display':
         return (
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: '#764ba2' }}>
             <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
             <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
             <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2"/>
           </svg>
         );
                    case 'Discovery':
         return (
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: '#f093fb' }}>
             <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
           </svg>
         );
       case 'Performance Max':
         return (
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: '#10b981' }}>
             <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
         );
       default:
         return null;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      margin: 0,
      padding: 0
    }}>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      
      {/* Google Ads Connection Status */}
      <GoogleAdsConnectionStatus />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 16px'
      }} className="dashboard-container">
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(102, 126, 234, 0.05)',
          padding: '24px',
          marginBottom: '32px',
          border: '1px solid rgba(102, 126, 234, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative accent */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '120px',
            height: '120px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
            borderRadius: '0 12px 0 120px',
            zIndex: 0
          }}></div>
                      <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative',
              zIndex: 1
            }}>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#1e293b',
                margin: 0,
                background: 'linear-gradient(135deg, #1e293b 0%, #667eea 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Campaign Dashboard</h1>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {/* Account Dropdown */}
              <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }} data-account-dropdown>
                                 <div style={{
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'space-between',
                   marginBottom: '4px'
                 }}>
                   <label style={{
                     fontSize: '14px',
                     fontWeight: '500',
                     color: '#667eea'
                   }}>Account</label>
                   <button
                     onClick={(e) => {
                       e.stopPropagation();
                       loadAccounts();
                     }}
                     disabled={accountsLoading}
                     style={{
                       background: 'none',
                       border: 'none',
                       cursor: accountsLoading ? 'not-allowed' : 'pointer',
                       padding: '4px',
                       borderRadius: '4px',
                       color: '#667eea',
                       opacity: accountsLoading ? 0.5 : 1,
                       transition: 'all 0.2s ease'
                     }}
                     title="Refresh accounts"
                   >
                     <svg 
                       width="14" 
                       height="14" 
                       viewBox="0 0 24 24" 
                       fill="none"
                       style={{
                         transform: accountsLoading ? 'rotate(360deg)' : 'rotate(0deg)',
                         transition: 'transform 0.5s ease'
                       }}
                     >
                       <path d="M1 4v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                       <path d="M23 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                       <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                   </button>
                 </div>
                
                {/* Custom Dropdown */}
                <div style={{ position: 'relative' }}>
                  {/* Selected Account Display */}
                                     <button
                     onClick={() => {
                       if (accounts.length === 0 && !accountsLoading) {
                         loadAccounts();
                       }
                       setIsAccountDropdownOpen(!isAccountDropdownOpen);
                     }}
                    style={{
                      width: '100%',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      fontSize: '14px',
                      outline: 'none',
                      color: '#1e293b',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#667eea';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#667eea'
                      }}></div>
                                             <span style={{ fontWeight: '500' }}>
                         {accountsLoading ? 'Loading...' : selectedAccount?.name || 'No account selected'}
                       </span>
                       <span style={{ 
                         fontSize: '12px', 
                         color: '#64748b',
                         backgroundColor: '#f1f5f9',
                         padding: '2px 6px',
                         borderRadius: '4px'
                       }}>
                         {selectedAccount?.customerId || 'N/A'}
                       </span>
                    </div>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      style={{ 
                        color: '#667eea',
                        transform: isAccountDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isAccountDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                      zIndex: 1000,
                      marginTop: '4px',
                      maxHeight: '300px',
                      overflow: 'hidden'
                    }}>
                      {/* Search Input */}
                      <div style={{
                        padding: '12px',
                        borderBottom: '1px solid #e2e8f0',
                        position: 'relative'
                      }}>
                        <input
                          type="text"
                          placeholder="Search accounts..."
                          value={accountSearchTerm}
                          onChange={(e) => setAccountSearchTerm(e.target.value)}
                          style={{
                            width: '100%',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            padding: '8px 12px 8px 36px',
                            fontSize: '14px',
                            outline: 'none',
                            color: '#1e293b'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#667eea';
                            e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          style={{ 
                            position: 'absolute',
                            left: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#9ca3af',
                            pointerEvents: 'none'
                          }}
                        >
                          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                                             {/* Account List */}
                       <div style={{
                         maxHeight: '200px',
                         overflowY: 'auto'
                       }}>
                         {(() => {
                           const currentAccounts = accounts.length > 0 ? accounts : mockAccounts;
                           const filteredAccounts = currentAccounts.filter(account => 
                             account.name.toLowerCase().includes(accountSearchTerm.toLowerCase()) ||
                             account.customerId.includes(accountSearchTerm)
                           );
                           
                           if (accountsLoading) {
                             return (
                               <div style={{
                                 padding: '16px',
                                 textAlign: 'center',
                                 color: '#64748b',
                                 fontSize: '14px'
                               }}>
                                 Loading accounts...
                               </div>
                             );
                           }
                           
                           if (accountsError) {
                             return (
                               <div style={{
                                 padding: '16px',
                                 textAlign: 'center',
                                 color: '#dc2626',
                                 fontSize: '14px'
                               }}>
                                 {accountsError}
                               </div>
                             );
                           }
                           
                           if (filteredAccounts.length === 0) {
                             return (
                               <div style={{
                                 padding: '16px',
                                 textAlign: 'center',
                                 color: '#64748b',
                                 fontSize: '14px'
                               }}>
                                 No accounts found
                               </div>
                             );
                           }
                           
                           return filteredAccounts.map((account, index) => (
                            <button
                              key={account.id}
                                                             onClick={() => {
                                 setSelectedAccount(account);
                                 setIsAccountDropdownOpen(false);
                                 setAccountSearchTerm('');
                                 setFocusedAccountIndex(-1);
                               }}
                                                             style={{
                                 width: '100%',
                                 padding: '12px 16px',
                                 border: 'none',
                                 backgroundColor: selectedAccount?.id === account.id ? 'rgba(102, 126, 234, 0.1)' : 
                                                   focusedAccountIndex === index ? 'rgba(102, 126, 234, 0.05)' : 'transparent',
                                 color: selectedAccount?.id === account.id ? '#667eea' : '#1e293b',
                                 fontSize: '14px',
                                 cursor: 'pointer',
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'space-between',
                                 transition: 'all 0.2s ease',
                                 borderBottom: '1px solid #f1f5f9',
                                 outline: focusedAccountIndex === index ? '2px solid #667eea' : 'none',
                                 outlineOffset: '-2px'
                               }}
                                                             onMouseEnter={(e) => {
                                 if (selectedAccount?.id !== account.id) {
                                   e.currentTarget.style.backgroundColor = '#f8fafc';
                                 }
                                 setFocusedAccountIndex(index);
                               }}
                               onMouseLeave={(e) => {
                                 if (selectedAccount?.id !== account.id) {
                                   e.currentTarget.style.backgroundColor = 'transparent';
                                 }
                                 setFocusedAccountIndex(-1);
                               }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  backgroundColor: selectedAccount?.id === account.id ? '#667eea' : '#cbd5e1'
                                }}></div>
                                                                 <span style={{ fontWeight: selectedAccount?.id === account.id ? '600' : '400' }}>
                                   {account.name}
                                 </span>
                                <span style={{ 
                                  fontSize: '12px', 
                                  color: '#64748b',
                                  backgroundColor: '#f1f5f9',
                                  padding: '2px 6px',
                                  borderRadius: '4px'
                                }}>
                                  {account.customerId}
                                </span>
                              </div>
                                                             {selectedAccount?.id === account.id && (
                                <svg 
                                  width="16" 
                                  height="16" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  style={{ color: '#667eea' }}
                                >
                                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </button>
                          ));
                         })()}
                      </div>
                    </div>
                  )}
                </div>
              </div>

                             {/* Date Range */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                   {/* Quick Presets */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => {
                        const today = new Date();
                        const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                        setDateFrom(sevenDaysAgo.toISOString().split('T')[0]);
                        setDateTo(today.toISOString().split('T')[0]);
                      }}
                      style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        backgroundColor: 'white',
                        color: '#1e293b',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                        e.currentTarget.style.borderColor = '#667eea';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                      }}
                    >
                      Last 7 days
                    </button>
                    <button
                      onClick={() => {
                        const today = new Date();
                        const fourteenDaysAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
                        setDateFrom(fourteenDaysAgo.toISOString().split('T')[0]);
                        setDateTo(today.toISOString().split('T')[0]);
                      }}
                      style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        backgroundColor: 'white',
                        color: '#1e293b',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                        e.currentTarget.style.borderColor = '#667eea';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                      }}
                    >
                      Last 14 days
                    </button>
                    <button
                      onClick={() => {
                        const today = new Date();
                        const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                        setDateFrom(thirtyDaysAgo.toISOString().split('T')[0]);
                        setDateTo(today.toISOString().split('T')[0]);
                      }}
                      style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        backgroundColor: 'white',
                        color: '#1e293b',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                        e.currentTarget.style.borderColor = '#667eea';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                      }}
                    >
                      Last 30 days
                    </button>
                  </div>
                 
                 {/* Custom Date Range */}
                 <div style={{ display: 'flex', gap: '8px' }}>
                   <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <label style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#667eea',
                        marginBottom: '4px'
                                          }}>Date From</label>
                                                           <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        lang="en"
                        data-date-format="dd.mm.yyyy"
                        style={{
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          fontSize: '14px',
                          outline: 'none',
                          color: '#1e293b'
                        }}
                        onFocus={(e) => {
                          e.target.setAttribute('lang', 'en');
                          e.target.setAttribute('data-date-format', 'dd.mm.yyyy');
                        }}
                      />
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <label style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#667eea',
                        marginBottom: '4px'
                                          }}>Date To</label>
                                                           <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        lang="en"
                        data-date-format="dd.mm.yyyy"
                        style={{
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          fontSize: '14px',
                          outline: 'none',
                          color: '#1e293b'
                        }}
                        onFocus={(e) => {
                          e.target.setAttribute('lang', 'en');
                          e.target.setAttribute('data-date-format', 'dd.mm.yyyy');
                        }}
                      />
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

                 {/* KPI Cards */}
                   <div className="kpi-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '24px',
            marginBottom: '32px',
            alignItems: 'stretch'
          }}>
                     <div style={{
             background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
             borderRadius: '12px',
             boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(102, 126, 234, 0.05)',
             padding: '24px',
             transition: 'all 0.3s ease',
             border: '1px solid rgba(102, 126, 234, 0.1)',
             position: 'relative',
             overflow: 'hidden',
             height: '100%',
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'space-between'
           }}>
             {/* Decorative accent */}
             <div style={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '4px',
               height: '100%',
               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
               borderRadius: '0 2px 2px 0'
             }}></div>
                                                         <div style={{
                  fontSize: '14px',
                  color: '#64748b',
                  cursor: 'help',
                  marginBottom: '8px'
                }} 
                                                                 title="Total amount spent on advertising campaigns for the selected period"
                 >Total Spend</div>
                 <div style={{
                   fontSize: '28px',
                   fontWeight: 'bold',
                   color: '#1e293b',
                   marginBottom: '8px'
                 }}>
                   {formatCurrency(kpis.spend)}
                 </div>
                                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    backgroundColor: trends.spend.direction === 'up' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: trends.spend.direction === 'up' ? '#16a34a' : '#dc2626',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    <span style={{ 
                      color: trends.spend.direction === 'up' ? '#16a34a' : '#dc2626',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>{trends.spend.direction === 'up' ? '↑' : '↓'}</span>
                    <span>{trends.spend.value}%</span>
                  </div>
           </div>
          
                     <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(102, 126, 234, 0.05)',
              padding: '24px',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(102, 126, 234, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              {/* Decorative accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                background: 'linear-gradient(135deg, #f093fb 0%, #667eea 100%)',
                borderRadius: '0 2px 2px 0'
              }}></div>
                                                           <div style={{
                   fontSize: '14px',
                   color: '#64748b',
                   cursor: 'help',
                   marginBottom: '8px'
                 }}
                                 title="Total number of times your ads were shown to users"
                 >Impressions</div>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: '#1e293b',
                    marginBottom: '8px'
                  }}>
                    {formatNumber(kpis.impressions)}
                  </div>
                                   <div style={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '4px',
                     padding: '4px 8px',
                     borderRadius: '6px',
                     backgroundColor: trends.impressions.direction === 'up' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                     color: trends.impressions.direction === 'up' ? '#16a34a' : '#dc2626',
                     fontSize: '12px',
                     fontWeight: '600'
                   }}>
                     <span style={{ 
                       color: trends.impressions.direction === 'up' ? '#16a34a' : '#dc2626',
                       fontSize: '14px',
                       fontWeight: 'bold'
                     }}>{trends.impressions.direction === 'up' ? '↑' : '↓'}</span>
                     <span>{trends.impressions.value}%</span>
                   </div>
            </div>
          
                     <div style={{
             background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
             borderRadius: '12px',
             boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(102, 126, 234, 0.05)',
             padding: '24px',
             transition: 'all 0.3s ease',
             border: '1px solid rgba(102, 126, 234, 0.1)',
             position: 'relative',
             overflow: 'hidden',
             height: '100%',
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'space-between'
           }}>
             {/* Decorative accent */}
             <div style={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '4px',
               height: '100%',
               background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
               borderRadius: '0 2px 2px 0'
             }}></div>
                                                         <div style={{
                  fontSize: '14px',
                  color: '#64748b',
                  cursor: 'help',
                  marginBottom: '8px'
                }}
                                title="Total number of clicks on your advertising ads"
                >Clicks</div>
                 <div style={{
                   fontSize: '28px',
                   fontWeight: 'bold',
                   color: '#1e293b',
                   marginBottom: '8px'
                 }}>
                   {formatNumber(kpis.clicks)}
                 </div>
                                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    backgroundColor: trends.clicks.direction === 'up' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: trends.clicks.direction === 'up' ? '#16a34a' : '#dc2626',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    <span style={{ 
                      color: trends.clicks.direction === 'up' ? '#16a34a' : '#dc2626',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>{trends.clicks.direction === 'up' ? '↑' : '↓'}</span>
                    <span>{trends.clicks.value}%</span>
                  </div>
           </div>
          
                     <div style={{
             background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
             borderRadius: '12px',
             boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(102, 126, 234, 0.05)',
             padding: '24px',
             transition: 'all 0.3s ease',
             border: '1px solid rgba(102, 126, 234, 0.1)',
             position: 'relative',
             overflow: 'hidden',
             height: '100%',
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'space-between'
           }}>
             {/* Decorative accent */}
             <div style={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '4px',
               height: '100%',
               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
               borderRadius: '0 2px 2px 0'
             }}></div>
                                                         <div style={{
                  fontSize: '14px',
                  color: '#64748b',
                  cursor: 'help',
                  marginBottom: '8px'
                }}
                                title="Number of target user actions (purchases, registrations, downloads, etc.)"
                >Conversions</div>
                 <div style={{
                   fontSize: '28px',
                   fontWeight: 'bold',
                   color: '#1e293b',
                   marginBottom: '8px'
                 }}>
                   {formatNumber(kpis.conversions)}
                 </div>
                                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    backgroundColor: trends.conversions.direction === 'up' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: trends.conversions.direction === 'up' ? '#16a34a' : '#dc2626',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    <span style={{ 
                      color: trends.conversions.direction === 'up' ? '#16a34a' : '#dc2626',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>{trends.conversions.direction === 'up' ? '↑' : '↓'}</span>
                    <span>{trends.conversions.value}%</span>
                  </div>
           </div>
          
                     <div style={{
             background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
             borderRadius: '12px',
             boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(102, 126, 234, 0.05)',
             padding: '24px',
             transition: 'all 0.3s ease',
             border: '1px solid rgba(102, 126, 234, 0.1)',
             position: 'relative',
             overflow: 'hidden',
             height: '100%',
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'space-between'
           }}>
             {/* Decorative accent */}
             <div style={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '4px',
               height: '100%',
               background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
               borderRadius: '0 2px 2px 0'
             }}></div>
                                                         <div style={{
                  fontSize: '14px',
                  color: '#64748b',
                  cursor: 'help',
                  marginBottom: '8px'
                }}
                                title="Cost Per Acquisition (CPA) - average cost of acquiring one customer"
                >CPA</div>
                                  <div style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: kpis.cpa < targetCPA ? '#16a34a' : kpis.cpa > targetCPA ? '#dc2626' : '#1e293b',
                    marginBottom: '8px'
                  }}>
                    {formatCurrency(kpis.cpa)}
                  </div>
                                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    backgroundColor: trends.cpa.direction === 'down' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: trends.cpa.direction === 'down' ? '#16a34a' : '#dc2626',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    <span style={{ 
                      color: trends.cpa.direction === 'down' ? '#16a34a' : '#dc2626',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>{trends.cpa.direction === 'down' ? '↓' : '↑'}</span>
                    <span>{trends.cpa.value}%</span>
                  </div>
           </div>
        </div>

                 {/* Campaign Performance */}
         <div style={{
           background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
           borderRadius: '12px',
           boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(102, 126, 234, 0.05)',
           border: '1px solid rgba(102, 126, 234, 0.1)',
           position: 'relative',
           overflow: 'hidden'
         }}>
           {/* Decorative accent */}
           <div style={{
             position: 'absolute',
             top: 0,
             left: 0,
             width: '100%',
             height: '3px',
             background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
             borderRadius: '12px 12px 0 0'
           }}></div>
          <div style={{
            padding: '24px',
            borderBottom: '1px solid #e2e8f0'
          }}>
                                                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h2 style={{
                              fontSize: '20px',
                              fontWeight: '600',
                              color: '#1e293b',
                              margin: 0,
                              background: 'linear-gradient(135deg, #1e293b 0%, #667eea 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text'
                            }}>Campaign Performance</h2>
                            {selectedCampaigns.length > 0 && (
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 12px',
                                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                borderRadius: '20px',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#667eea'
                              }}>
                                <svg 
                                  width="16" 
                                  height="16" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  style={{ color: '#667eea' }}
                                >
                                  <path 
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span>{selectedCampaigns.length} selected</span>
                              </div>
                            )}
                          </div>
          </div>

          {/* Filters */}
          <div style={{
            padding: '24px',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <div className="filters-container" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
                             <div style={{ flex: 1, position: 'relative' }}>
                 <input
                   type="text"
                   placeholder="Search campaigns..."
                   value={filters.search}
                   onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                   style={{
                     width: '100%',
                     border: '1px solid #e2e8f0',
                     borderRadius: '8px',
                     padding: '8px 12px 8px 40px',
                     fontSize: '14px',
                     outline: 'none',
                     color: '#1e293b'
                   }}
                 />
                 <svg 
                   width="16" 
                   height="16" 
                   viewBox="0 0 24 24" 
                   fill="none" 
                   style={{ 
                     position: 'absolute',
                     left: '12px',
                     top: '50%',
                     transform: 'translateY(-50%)',
                     color: '#9ca3af',
                     pointerEvents: 'none'
                   }}
                 >
                   <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               </div>
              
                             <div style={{ display: 'flex', gap: '16px' }}>
                                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    backgroundColor: 'white'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: '#667eea' }}>
                      <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" fill="currentColor"/>
                    </svg>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                      style={{
                        border: 'none',
                        outline: 'none',
                        fontSize: '14px',
                        color: '#1e293b',
                        backgroundColor: 'transparent',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="All">Status: All</option>
                      <option value="ENABLED">Status: Enabled</option>
                      <option value="PAUSED">Status: Paused</option>
                    </select>
                  </div>
                 
                                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    backgroundColor: 'white'
                  }}>
                                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: '#764ba2' }}>
                       <path d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4zM9 2v2h6V2H9z" fill="currentColor"/>
                     </svg>
                    <select
                      value={filters.type}
                      onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                      style={{
                        border: 'none',
                        outline: 'none',
                        fontSize: '14px',
                        color: '#1e293b',
                        backgroundColor: 'transparent',
                        cursor: 'pointer'
                      }}
                    >
                                             <option value="All">Type: All</option>
                       <option value="Search">Type: Search</option>
                       <option value="Display">Type: Display</option>
                       <option value="Discovery">Type: Discovery</option>
                       <option value="Performance Max">Type: Performance Max</option>
                    </select>
                  </div>
                
                                 <input
                   type="number"
                   placeholder="Min conversions"
                   value={filters.minConversions}
                   onChange={(e) => setFilters(prev => ({ ...prev, minConversions: e.target.value }))}
                   style={{
                     border: '1px solid #e2e8f0',
                     borderRadius: '8px',
                     padding: '8px 12px',
                     fontSize: '14px',
                     outline: 'none',
                     width: '140px',
                     color: '#1e293b'
                   }}
                   onFocus={(e) => {
                     e.target.style.borderColor = '#667eea';
                     e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                   }}
                   onBlur={(e) => {
                     e.target.style.borderColor = '#e2e8f0';
                     e.target.style.boxShadow = 'none';
                   }}
                 />
              </div>
            </div>
          </div>

                     {/* Table */}
           <div className="table-container" style={{ overflowX: 'auto' }}>
            {loading ? (
              // Skeleton loading
              <div style={{ padding: '24px' }}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px 0'
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '4px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}></div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{
                        height: '16px',
                        backgroundColor: '#e2e8f0',
                        borderRadius: '4px',
                        width: '75%',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                      }}></div>
                      <div style={{
                        height: '12px',
                        backgroundColor: '#e2e8f0',
                        borderRadius: '4px',
                        width: '50%',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                      }}></div>
                    </div>
                    <div style={{
                      width: '64px',
                      height: '16px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '4px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}></div>
                    <div style={{
                      width: '80px',
                      height: '16px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '4px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}></div>
                    <div style={{
                      width: '64px',
                      height: '16px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '4px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}></div>
                    <div style={{
                      width: '64px',
                      height: '16px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '4px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}></div>
                    <div style={{
                      width: '80px',
                      height: '16px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '4px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}></div>
                  </div>
                ))}
              </div>
            ) : filteredCampaigns.length === 0 ? (
              <div style={{
                padding: '48px',
                textAlign: 'center'
              }}>
                <div style={{
                  color: '#6b7280',
                  fontSize: '18px'
                }}>No campaigns found for this period</div>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                  <thead style={{ 
                    background: 'linear-gradient(135deg, #e2e8f0 0%, rgba(102, 126, 234, 0.08) 100%)'
                  }}>
                  <tr>
                    <th style={{
                      padding: '12px 24px',
                      textAlign: 'left',
                      borderBottom: '1px solid #e2e8f0'
                    }}>
                                               <input
                           type="checkbox"
                           checked={selectedCampaigns.length === paginatedCampaigns.length && paginatedCampaigns.length > 0}
                           onChange={(e) => handleSelectAll(e.target.checked)}
                           style={{
                             borderRadius: '4px',
                             border: '2px solid #667eea',
                             backgroundColor: selectedCampaigns.length === paginatedCampaigns.length && paginatedCampaigns.length > 0 ? '#667eea' : 'white',
                             cursor: 'pointer',
                             width: '16px',
                             height: '16px',
                             accentColor: '#667eea'
                           }}
                         />
                    </th>
                                         <th 
                       style={{
                         padding: '12px 24px',
                         textAlign: 'left',
                         fontSize: '14px',
                         fontWeight: '600',
                         textTransform: 'uppercase',
                         letterSpacing: '0.05em',
                         cursor: 'pointer',
                         borderBottom: '1px solid #e2e8f0',
                         background: 'linear-gradient(135deg, #1e293b 0%, #667eea 100%)',
                         WebkitBackgroundClip: 'text',
                         WebkitTextFillColor: 'transparent',
                         backgroundClip: 'text'
                       }}
                       onClick={() => handleSort('name')}
                     >
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <span title="Name of the advertising campaign">Name</span>
                                                   <span style={{ 
                             color: sortConfig.key === 'name' ? '#667eea' : '#9ca3af',
                             fontWeight: sortConfig.key === 'name' ? '600' : '400'
                           }}>
                             {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                           </span>
                        </div>
                     </th>
                                                                                   <th 
                        style={{
                          padding: '12px 24px',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          cursor: 'pointer',
                          borderBottom: '1px solid #e2e8f0',
                          background: 'linear-gradient(135deg, #1e293b 0%, #667eea 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                        onClick={() => handleSort('status')}
                      >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                           <span title="Campaign status: active or paused">Status</span>
                                                    <span style={{ 
                              color: sortConfig.key === 'status' ? '#667eea' : '#9ca3af',
                              fontWeight: sortConfig.key === 'status' ? '600' : '400'
                            }}>
                              {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                            </span>
                         </div>
                      </th>
                                           <th 
                        style={{
                          padding: '12px 24px',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          cursor: 'pointer',
                          borderBottom: '1px solid #e2e8f0',
                          background: 'linear-gradient(135deg, #1e293b 0%, #667eea 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                        onClick={() => handleSort('type')}
                      >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                           <span title="Campaign type: Search, Display, or Discovery">Type</span>
                                                    <span style={{ 
                              color: sortConfig.key === 'type' ? '#667eea' : '#9ca3af',
                              fontWeight: sortConfig.key === 'type' ? '600' : '400'
                            }}>
                              {sortConfig.key === 'type' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                            </span>
                         </div>
                      </th>
                                                                                   <th 
                        style={{
                          padding: '12px 24px',
                          textAlign: 'right',
                          fontSize: '14px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          cursor: 'pointer',
                          borderBottom: '1px solid #e2e8f0',
                          background: 'linear-gradient(135deg, #1e293b 0%, #667eea 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                        onClick={() => handleSort('cost')}
                      >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                           <span title="Total campaign cost for the selected period">Cost</span>
                                                    <span style={{ 
                              color: sortConfig.key === 'cost' ? '#667eea' : '#9ca3af',
                              fontWeight: sortConfig.key === 'cost' ? '600' : '400'
                            }}>
                              {sortConfig.key === 'cost' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                            </span>
                         </div>
                      </th>
                                                                                   <th 
                        style={{
                          padding: '12px 24px',
                          textAlign: 'right',
                          fontSize: '14px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          cursor: 'pointer',
                          borderBottom: '1px solid #e2e8f0',
                          background: 'linear-gradient(135deg, #1e293b 0%, #667eea 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                        onClick={() => handleSort('cpc')}
                      >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                           <span title="Cost Per Click (CPC) - average cost of one click">CPC</span>
                                                    <span style={{ 
                              color: sortConfig.key === 'cpc' ? '#667eea' : '#9ca3af',
                              fontWeight: sortConfig.key === 'cpc' ? '600' : '400'
                            }}>
                              {sortConfig.key === 'cpc' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                            </span>
                         </div>
                      </th>
                                                                                   <th 
                        style={{
                          padding: '12px 24px',
                          textAlign: 'right',
                          fontSize: '14px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          cursor: 'pointer',
                          borderBottom: '1px solid #e2e8f0',
                          background: 'linear-gradient(135deg, #1e293b 0%, #667eea 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                        onClick={() => handleSort('ctr')}
                      >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                           <span title="Click-Through Rate (CTR) - percentage of clicks from impressions">CTR</span>
                                                    <span style={{ 
                              color: sortConfig.key === 'ctr' ? '#667eea' : '#9ca3af',
                              fontWeight: sortConfig.key === 'ctr' ? '600' : '400'
                            }}>
                              {sortConfig.key === 'ctr' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                            </span>
                         </div>
                      </th>
                                                                                   <th 
                        style={{
                          padding: '12px 24px',
                          textAlign: 'right',
                          fontSize: '14px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          cursor: 'pointer',
                          borderBottom: '1px solid #e2e8f0',
                          background: 'linear-gradient(135deg, #1e293b 0%, #667eea 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                        onClick={() => handleSort('conversions')}
                      >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                           <span title="Number of conversions - target user actions">Conversions</span>
                                                    <span style={{ 
                              color: sortConfig.key === 'conversions' ? '#667eea' : '#9ca3af',
                              fontWeight: sortConfig.key === 'conversions' ? '600' : '400'
                            }}>
                              {sortConfig.key === 'conversions' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                            </span>
                         </div>
                      </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCampaigns.map((campaign) => (
                                                               <tr key={campaign.id} style={{
                        borderBottom: '1px solid #e2e8f0',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        position: 'relative',
                        backgroundColor: selectedCampaigns.includes(campaign.id) ? 'rgba(102, 126, 234, 0.12)' : 'transparent',
                        borderLeft: selectedCampaigns.includes(campaign.id) ? '4px solid #667eea' : '4px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        if (!selectedCampaigns.includes(campaign.id)) {
                          e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.08)';
                        }
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        if (!selectedCampaigns.includes(campaign.id)) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        } else {
                          e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.12)';
                        }
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}>
                      <td style={{
                        padding: '16px 24px',
                        whiteSpace: 'nowrap'
                      }}>
                                                 <input
                           type="checkbox"
                           checked={selectedCampaigns.includes(campaign.id)}
                           onChange={(e) => handleSelectCampaign(campaign.id, e.target.checked)}
                           style={{
                             borderRadius: '4px',
                             border: '2px solid #667eea',
                             backgroundColor: selectedCampaigns.includes(campaign.id) ? '#667eea' : 'white',
                             cursor: 'pointer',
                             width: '16px',
                             height: '16px',
                             accentColor: '#667eea'
                           }}
                         />
                      </td>
                                             <td style={{
                         padding: '16px 24px',
                         whiteSpace: 'nowrap',
                         fontSize: '14px',
                         fontWeight: '500',
                         color: '#1e293b',
                         position: 'relative'
                       }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                           {selectedCampaigns.includes(campaign.id) && (
                             <svg 
                               width="16" 
                               height="16" 
                               viewBox="0 0 24 24" 
                               fill="none" 
                               style={{ 
                                 color: '#667eea',
                                 flexShrink: 0
                               }}
                             >
                               <path 
                                 d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                                 stroke="currentColor" 
                                 strokeWidth="2" 
                                 strokeLinecap="round" 
                                 strokeLinejoin="round"
                               />
                             </svg>
                           )}
                           <span>{campaign.name}</span>
                         </div>
                       </td>
                                             <td style={{
                         padding: '16px 24px',
                         whiteSpace: 'nowrap'
                       }}>
                         <span style={{
                           display: 'inline-flex',
                           padding: '4px 8px',
                           fontSize: '12px',
                           fontWeight: '600',
                           borderRadius: '9999px',
                           backgroundColor: campaign.status === 'ENABLED' ? 'rgba(102, 126, 234, 0.1)' : '#f3f4f6',
                           color: campaign.status === 'ENABLED' ? '#667eea' : '#374151'
                         }}>
                           {campaign.status}
                         </span>
                       </td>
                       <td style={{
                         padding: '16px 24px',
                         whiteSpace: 'nowrap'
                       }}>
                         <div style={{
                           display: 'flex',
                           alignItems: 'center',
                           gap: '6px'
                         }}>
                           {getCampaignTypeIcon(campaign.type)}
                           <span style={{
                             fontSize: '12px',
                             fontWeight: '500',
                             color: '#1e293b'
                           }}>
                             {campaign.type}
                           </span>
                         </div>
                       </td>
                                             <td style={{
                         padding: '16px 24px',
                         whiteSpace: 'nowrap',
                         fontSize: '14px',
                         color: '#1e293b',
                         textAlign: 'right'
                       }}>
                         {formatCurrency(campaign.cost)}
                       </td>
                                             <td style={{
                         padding: '16px 24px',
                         whiteSpace: 'nowrap',
                         fontSize: '14px',
                         color: '#1e293b',
                         textAlign: 'right'
                       }}>
                         {formatCurrency(campaign.cpc)}
                       </td>
                                                                     <td style={{
                          padding: '16px 24px',
                          whiteSpace: 'nowrap',
                          fontSize: '14px',
                          textAlign: 'right'
                        }}>
                          <span style={{
                            color: campaign.ctr > 3 ? '#16a34a' : campaign.ctr < 1 ? '#dc2626' : '#1e293b',
                            fontWeight: campaign.ctr > 3 || campaign.ctr < 1 ? '600' : '400'
                          }}>
                            {formatPercentage(campaign.ctr)}
                          </span>
                        </td>
                                                                     <td style={{
                          padding: '16px 24px',
                          whiteSpace: 'nowrap',
                          fontSize: '14px',
                          textAlign: 'right'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                            <span style={{
                              color: campaign.conversions > 50 ? '#16a34a' : campaign.conversions < 20 ? '#dc2626' : '#1e293b',
                              fontWeight: campaign.conversions > 50 || campaign.conversions < 20 ? '600' : '400'
                            }}>
                              {formatNumber(campaign.conversions)}
                            </span>
                            {campaign.conversions > 50 && (
                              <span style={{
                                display: 'inline-flex',
                                padding: '2px 6px',
                                fontSize: '10px',
                                fontWeight: '600',
                                borderRadius: '4px',
                                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                                color: '#16a34a'
                              }}>
                                HIGH
                              </span>
                            )}
                            {campaign.conversions < 20 && (
                              <span style={{
                                display: 'inline-flex',
                                padding: '2px 6px',
                                fontSize: '10px',
                                fontWeight: '600',
                                borderRadius: '4px',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                color: '#dc2626'
                              }}>
                                LOW
                              </span>
                            )}
                          </div>
                        </td>
                    </tr>
                  ))}
                                 </tbody>
                 {/* Summary Row */}
                 {!loading && filteredCampaigns.length > 0 && (
                   <tfoot style={{ 
                     background: 'linear-gradient(135deg, #f8fafc 0%, rgba(102, 126, 234, 0.05) 100%)',
                     borderTop: '2px solid #e2e8f0'
                   }}>
                     <tr>
                       <td style={{
                         padding: '16px 24px',
                         fontWeight: '600',
                         color: '#1e293b',
                         fontSize: '14px'
                       }}>
                         Total ({filteredCampaigns.length} campaigns)
                       </td>
                       <td style={{
                         padding: '16px 24px',
                         textAlign: 'center'
                       }}>
                         <span style={{
                           display: 'inline-flex',
                           padding: '4px 8px',
                           fontSize: '12px',
                           fontWeight: '600',
                           borderRadius: '9999px',
                           backgroundColor: 'rgba(102, 126, 234, 0.1)',
                           color: '#667eea'
                         }}>
                           {filteredCampaigns.filter(c => c.status === 'ENABLED').length} Active
                         </span>
                       </td>
                       <td style={{
                         padding: '16px 24px',
                         textAlign: 'center'
                       }}>
                         <span style={{
                           fontSize: '12px',
                           fontWeight: '500',
                           color: '#64748b'
                         }}>
                           All Types
                         </span>
                       </td>
                       <td style={{
                         padding: '16px 24px',
                         textAlign: 'right',
                         fontWeight: '600',
                         color: '#1e293b',
                         fontSize: '14px'
                       }}>
                         {formatCurrency(filteredCampaigns.reduce((sum, campaign) => sum + campaign.cost, 0))}
                       </td>
                       <td style={{
                         padding: '16px 24px',
                         textAlign: 'right',
                         fontWeight: '600',
                         color: '#1e293b',
                         fontSize: '14px'
                       }}>
                         {formatCurrency(filteredCampaigns.reduce((sum, campaign) => sum + campaign.cpc, 0) / filteredCampaigns.length)}
                       </td>
                       <td style={{
                         padding: '16px 24px',
                         textAlign: 'right',
                         fontWeight: '600',
                         color: '#1e293b',
                         fontSize: '14px'
                       }}>
                         {formatPercentage(filteredCampaigns.reduce((sum, campaign) => sum + campaign.ctr, 0) / filteredCampaigns.length)}
                       </td>
                       <td style={{
                         padding: '16px 24px',
                         textAlign: 'right',
                         fontWeight: '600',
                         color: '#1e293b',
                         fontSize: '14px'
                       }}>
                         {formatNumber(filteredCampaigns.reduce((sum, campaign) => sum + campaign.conversions, 0))}
                       </td>
                     </tr>
                   </tfoot>
                 )}
               </table>
             )}
           </div>

                     {/* Pagination */}
           {!loading && filteredCampaigns.length > 0 && (
                           <div className="pagination-container" style={{
                padding: '16px 24px',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                               <div className="pagination-info" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                 <div style={{
                   fontSize: '14px',
                   color: '#374151'
                 }}>
                   Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredCampaigns.length)} of {filteredCampaigns.length} results
                 </div>
                 <div style={{
                   display: 'flex',
                   alignItems: 'center',
                   gap: '8px'
                 }}>
                   <span style={{
                     fontSize: '14px',
                     color: '#6b7280'
                   }}>Show:</span>
                   <select
                     value={itemsPerPage}
                     onChange={(e) => {
                       setItemsPerPage(Number(e.target.value));
                       setCurrentPage(1); // Reset to first page when changing items per page
                     }}
                     style={{
                       border: '1px solid #e2e8f0',
                       borderRadius: '6px',
                       padding: '4px 8px',
                       fontSize: '14px',
                       outline: 'none',
                       color: '#1e293b',
                       backgroundColor: 'white',
                       cursor: 'pointer'
                     }}
                   >
                                           <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                   </select>
                   <span style={{
                     fontSize: '14px',
                     color: '#6b7280'
                   }}>per page</span>
                 </div>
               </div>
               <div className="pagination-controls" style={{ display: 'flex', gap: '8px' }}>
                 <button
                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                   disabled={currentPage === 1}
                   style={{
                     padding: '8px 12px',
                     fontSize: '14px',
                     border: '1px solid #e2e8f0',
                     borderRadius: '8px',
                     backgroundColor: 'white',
                     cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                     opacity: currentPage === 1 ? 0.5 : 1,
                     color: '#1e293b',
                     transition: 'all 0.2s ease'
                   }}
                   onMouseEnter={(e) => {
                     if (currentPage !== 1) {
                       e.currentTarget.style.backgroundColor = '#f8fafc';
                       e.currentTarget.style.borderColor = '#667eea';
                     }
                   }}
                   onMouseLeave={(e) => {
                     if (currentPage !== 1) {
                       e.currentTarget.style.backgroundColor = 'white';
                       e.currentTarget.style.borderColor = '#e2e8f0';
                     }
                   }}
                 >
                   Prev
                 </button>
                 <div style={{
                   display: 'flex',
                   alignItems: 'center',
                   gap: '4px'
                 }}>
                   {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                     let pageNumber;
                     if (totalPages <= 5) {
                       pageNumber = i + 1;
                     } else if (currentPage <= 3) {
                       pageNumber = i + 1;
                     } else if (currentPage >= totalPages - 2) {
                       pageNumber = totalPages - 4 + i;
                     } else {
                       pageNumber = currentPage - 2 + i;
                     }
                     
                     return (
                       <button
                         key={pageNumber}
                         onClick={() => setCurrentPage(pageNumber)}
                         style={{
                           padding: '8px 12px',
                           fontSize: '14px',
                           border: '1px solid #e2e8f0',
                           borderRadius: '8px',
                           backgroundColor: currentPage === pageNumber ? '#667eea' : 'white',
                           color: currentPage === pageNumber ? 'white' : '#1e293b',
                           cursor: 'pointer',
                           transition: 'all 0.2s ease',
                           minWidth: '40px'
                         }}
                         onMouseEnter={(e) => {
                           if (currentPage !== pageNumber) {
                             e.currentTarget.style.backgroundColor = '#f8fafc';
                             e.currentTarget.style.borderColor = '#667eea';
                           }
                         }}
                         onMouseLeave={(e) => {
                           if (currentPage !== pageNumber) {
                             e.currentTarget.style.backgroundColor = 'white';
                             e.currentTarget.style.borderColor = '#e2e8f0';
                           }
                         }}
                       >
                         {pageNumber}
                       </button>
                     );
                   })}
                 </div>
                 <button
                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                   disabled={currentPage === totalPages}
                   style={{
                     padding: '8px 12px',
                     fontSize: '14px',
                     border: '1px solid #e2e8f0',
                     borderRadius: '8px',
                     backgroundColor: 'white',
                     cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                     opacity: currentPage === totalPages ? 0.5 : 1,
                     color: '#1e293b',
                     transition: 'all 0.2s ease'
                   }}
                   onMouseEnter={(e) => {
                     if (currentPage !== totalPages) {
                       e.currentTarget.style.backgroundColor = '#f8fafc';
                       e.currentTarget.style.borderColor = '#667eea';
                     }
                   }}
                   onMouseLeave={(e) => {
                     if (currentPage !== totalPages) {
                       e.currentTarget.style.backgroundColor = 'white';
                       e.currentTarget.style.borderColor = '#e2e8f0';
                     }
                   }}
                 >
                   Next
                 </button>
               </div>
             </div>
           )}
        </div>

                 {/* AI Analysis Button */}
         <div style={{
           marginTop: '32px',
           display: 'flex',
           justifyContent: 'center'
         }}>
           <div style={{ position: 'relative' }}>
             <button
               onClick={handleAnalyzeWithAI}
               disabled={selectedCampaigns.length === 0}
                               title={selectedCampaigns.length === 0 ? "Select a campaign to analyze" : "Analyze selected campaigns with AI"}
                            style={{
                  padding: '12px 24px',
                  background: selectedCampaigns.length === 0 ? '#e5e7eb' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: selectedCampaigns.length === 0 ? '#9ca3af' : 'white',
                  borderRadius: '8px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: selectedCampaigns.length === 0 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: selectedCampaigns.length === 0 ? 'none' : '0 4px 16px rgba(102, 126, 234, 0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (selectedCampaigns.length > 0) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCampaigns.length > 0) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(102, 126, 234, 0.3)';
                  }
                }}
             >
               Analyze selected with AI
             </button>
           </div>
         </div>
      </div>

                           <style jsx>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: .5;
            }
          }
          
          input::placeholder {
            color: #9ca3af !important;
            opacity: 1;
          }
          
          input:focus::placeholder {
            color: #d1d5db !important;
          }
          
                     /* Enhanced mobile responsiveness for KPI cards */
           @media (max-width: 1200px) {
             .kpi-grid {
               grid-template-columns: repeat(3, 1fr) !important;
               gap: 20px !important;
             }
           }
           
           @media (max-width: 900px) {
             .kpi-grid {
               grid-template-columns: repeat(2, 1fr) !important;
               gap: 18px !important;
             }
           }
           
           @media (max-width: 600px) {
             .kpi-grid {
               grid-template-columns: 1fr !important;
               gap: 16px !important;
             }
             
             /* Compact KPI cards on mobile */
             .kpi-grid > div {
               padding: 16px !important;
             }
             
             .kpi-grid > div > div:first-child {
               font-size: 12px !important;
               margin-bottom: 6px !important;
             }
             
             .kpi-grid > div > div:nth-child(2) {
               font-size: 24px !important;
               margin-bottom: 6px !important;
             }
             
             .kpi-grid > div > div:last-child {
               font-size: 11px !important;
               padding: 3px 6px !important;
             }
           }
           
           @media (max-width: 480px) {
             .kpi-grid {
               grid-template-columns: 1fr !important;
               gap: 12px !important;
               margin-bottom: 24px !important;
             }
             
             /* Even more compact for very small screens */
             .kpi-grid > div {
               padding: 12px !important;
             }
             
             .kpi-grid > div > div:first-child {
               font-size: 11px !important;
               margin-bottom: 4px !important;
             }
             
             .kpi-grid > div > div:nth-child(2) {
               font-size: 20px !important;
               margin-bottom: 4px !important;
             }
             
             .kpi-grid > div > div:last-child {
               font-size: 10px !important;
               padding: 2px 4px !important;
             }
           }
              
              /* Mobile pagination */
              .pagination-container {
                flex-direction: column;
                gap: 16px;
                align-items: stretch;
              }
              
              .pagination-info {
                text-align: center;
                order: 2;
              }
              
              .pagination-controls {
                order: 1;
                justify-content: center;
              }
              
              .pagination-controls button {
                min-width: 36px;
                padding: 6px 8px;
                font-size: 12px;
              }
            }
           
                       /* Table horizontal scroll for mobile */
            .table-container {
              -webkit-overflow-scrolling: touch;
              scrollbar-width: thin;
              scrollbar-color: #cbd5e1 #f1f5f9;
              overflow-x: auto;
              overflow-y: hidden;
            }
            
            .table-container::-webkit-scrollbar {
              height: 8px;
            }
            
            .table-container::-webkit-scrollbar-track {
              background: #f1f5f9;
              border-radius: 4px;
            }
            
            .table-container::-webkit-scrollbar-thumb {
              background: #cbd5e1;
              border-radius: 4px;
              border: 1px solid #e2e8f0;
            }
            
            .table-container::-webkit-scrollbar-thumb:hover {
              background: #94a3b8;
            }
            
            /* Mobile optimizations */
            @media (max-width: 1024px) {
              .table-container {
                margin: 0 -16px;
                padding: 0 16px;
              }
              
              .table-container table {
                min-width: 900px;
              }
            }
            
            @media (max-width: 768px) {
              .table-container {
                margin: 0 -16px;
                padding: 0 16px;
                border-radius: 8px;
              }
              
              .table-container table {
                min-width: 850px;
                font-size: 13px;
              }
              
              .table-container th,
              .table-container td {
                padding: 12px 16px !important;
              }
              
              /* Compact filters on mobile */
              .filters-container {
                flex-direction: column;
                gap: 12px;
              }
              
              .filters-container > div {
                width: 100%;
              }
              
              .filters-container input[type="number"] {
                width: 100% !important;
              }
            }
            
            @media (max-width: 480px) {
              .table-container {
                margin: 0 -12px;
                padding: 0 12px;
              }
              
              .table-container table {
                min-width: 800px;
                font-size: 12px;
              }
              
              .table-container th,
              .table-container td {
                padding: 8px 12px !important;
              }
              
              /* Hide less important columns on very small screens */
              .table-container th:nth-child(4),
              .table-container td:nth-child(4) {
                display: none;
              }
            }
            
                         /* Date input formatting for English locale */
             input[type="date"] {
               font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
               direction: ltr;
             }
             
             input[type="date"]::-webkit-calendar-picker-indicator {
               filter: invert(0.5);
             }
             
             /* Force English locale for date inputs */
             input[type="date"][lang="en"] {
               direction: ltr;
             }
             
             /* Ensure date format displays in English */
             input[type="date"]::-webkit-datetime-edit {
               color: #1e293b;
               direction: ltr;
             }
             
             input[type="date"]::-webkit-datetime-edit-fields-wrapper {
               color: #1e293b;
               direction: ltr;
             }
             
             input[type="date"]::-webkit-datetime-edit-text {
               color: #1e293b;
               direction: ltr;
             }
             
             input[type="date"]::-webkit-datetime-edit-month-field,
             input[type="date"]::-webkit-datetime-edit-day-field,
             input[type="date"]::-webkit-datetime-edit-year-field {
               color: #1e293b;
               direction: ltr;
             }
             
                           /* Additional styles to force English format */
              input[type="date"]::-webkit-inner-spin-button,
              input[type="date"]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
              
              /* Dashboard container responsiveness */
              @media (max-width: 768px) {
                .dashboard-container {
                  padding: 24px 12px !important;
                }
              }
              
              @media (max-width: 480px) {
                .dashboard-container {
                  padding: 16px 8px !important;
                }
              }
        `}</style>
    </div>
  );
}
