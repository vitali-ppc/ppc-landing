import React from 'react';

interface GoogleAdsConnectionProps {
  useAdsData: boolean;
  setUseAdsData: (use: boolean) => void;
  accountConnected: boolean;
  setShowAccountModal: (show: boolean) => void;
  adsData: any;
  realAdsData: any;
}

export const GoogleAdsConnection: React.FC<GoogleAdsConnectionProps> = React.memo(({
  useAdsData,
  setUseAdsData,
  accountConnected,
  setShowAccountModal,
  adsData,
  realAdsData,
}) => {
  return (
    <div style={{
      padding: '16px 48px',
      borderTop: '1px solid #e2e8f0',
      background: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
    }}>
      {/* Left side - Toggle and status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          fontSize: 14,
          color: '#374151',
        }}>
          <input
            type="checkbox"
            checked={useAdsData}
            onChange={(e) => setUseAdsData(e.target.checked)}
            style={{
              width: 16,
              height: 16,
              accentColor: '#0ea5e9',
            }}
          />
          Use Google Ads data
        </label>
        
        {useAdsData && (adsData || realAdsData) && (
          <span style={{
            fontSize: 13,
            color: realAdsData ? '#059669' : '#d97706',
            fontWeight: 500,
          }}>
            {realAdsData ? '✓ Real data connected' : '✓ Test data loaded'}
          </span>
        )}
      </div>

      {/* Right side - Connect button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {!accountConnected && (
          <button
            onClick={() => setShowAccountModal(true)}
            style={{
              background: '#fff',
              color: '#23272f',
              border: '1.5px solid #d1d5db',
              borderRadius: 8,
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
              e.currentTarget.style.background = '#f9fafb';
              e.currentTarget.style.border = '1.5px solid #9ca3af';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.border = '1.5px solid #d1d5db';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Connect Google Ads
          </button>
        )}
        
        {accountConnected && (
          <span style={{
            fontSize: 13,
            color: '#059669',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Connected
          </span>
        )}
      </div>
    </div>
  );
}); 