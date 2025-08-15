'use client';

import React, { useState, useEffect } from 'react';

interface GoogleAdsStatusProps {
  className?: string;
}

interface Account {
  id: string;
  name: string;
  customerId: string;
}

interface GoogleAdsStatusData {
  connected: boolean;
  accounts: Account[];
  currentAccount?: Account;
}

export default function GoogleAdsStatus({ className = '' }: GoogleAdsStatusProps) {
  const [status, setStatus] = useState<GoogleAdsStatusData>({
    connected: false,
    accounts: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showAccountsModal, setShowAccountsModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Завантаження статусу при монтуванні
  useEffect(() => {
    loadGoogleAdsStatus();
    
    // Слухаємо події для відкриття модальних вікон
    const handleOpenAuth = () => setShowAuthModal(true);
    const handleOpenAccounts = () => setShowAccountsModal(true);
    
    window.addEventListener('openGoogleAdsAuth', handleOpenAuth);
    window.addEventListener('openGoogleAdsAccounts', handleOpenAccounts);
    
    return () => {
      window.removeEventListener('openGoogleAdsAuth', handleOpenAuth);
      window.removeEventListener('openGoogleAdsAccounts', handleOpenAccounts);
    };
  }, []);

  // Завантаження статусу Google Ads
  const loadGoogleAdsStatus = async () => {
    try {
      setIsLoading(true);
      
      const accessToken = localStorage.getItem('googleAccessToken');
      const refreshToken = localStorage.getItem('googleRefreshToken');
      
      if (!accessToken || !refreshToken) {
        setStatus({ connected: false, accounts: [] });
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
        setStatus(data);
      } else {
        setStatus({ connected: false, accounts: [] });
      }
    } catch (error) {
      console.error('Error loading Google Ads status:', error);
      setStatus({ connected: false, accounts: [] });
    } finally {
      setIsLoading(false);
    }
  };

  // Обробка кліку по іконці
  const handleIconClick = () => {
    if (status.connected) {
      setShowAccountsModal(true);
    } else {
      setShowAuthModal(true);
    }
  };

  // Авторизація через Google
  const handleGoogleAuth = async () => {
    try {
      const response = await fetch('/api/google-ads-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.authUrl) {
          window.location.href = data.authUrl;
        }
      }
    } catch (error) {
      console.error('Error starting Google Auth:', error);
    }
  };

  // Зміна аккаунта
  const handleChangeAccount = async (accountId: string) => {
    try {
      const response = await fetch('/api/google-ads-change-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId })
      });

      if (response.ok) {
        await loadGoogleAdsStatus();
        setShowAccountsModal(false);
        
        // Оновлюємо сторінку дашборду якщо ми на ній
        if (window.location.pathname === '/dashboard') {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Error changing account:', error);
    }
  };

  // Відключення Google Ads
  const handleDisconnect = async () => {
    try {
      const response = await fetch('/api/google-ads-disconnect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        setStatus({ connected: false, accounts: [] });
        setShowAccountsModal(false);
        
        // Очищаємо localStorage
        localStorage.removeItem('googleAccessToken');
        localStorage.removeItem('googleRefreshToken');
        localStorage.removeItem('currentGoogleAdsAccountId');
        
        // Оновлюємо сторінку якщо ми на дашборді
        if (window.location.pathname === '/dashboard') {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Error disconnecting Google Ads:', error);
    }
  };

  // Визначаємо іконку та tooltip
  const getIconAndTooltip = () => {
    if (isLoading) {
      return {
        icon: '⏳',
        tooltip: 'Loading...',
        className: 'text-gray-400'
      };
    }
    
    if (status.connected) {
      return {
        icon: '✅',
        tooltip: 'Google Ads Connected',
        className: 'text-green-500 hover:text-green-600'
      };
    } else {
      return {
        icon: '❌',
        tooltip: 'Google Ads Not Connected',
        className: 'text-gray-400 hover:text-gray-600'
      };
    }
  };

  const { icon, tooltip, className: iconClassName } = getIconAndTooltip();

  return (
    <>
      {/* Глобальний індикатор в Header */}
      <div 
        className={`google-ads-status ${className} cursor-pointer transition-colors duration-200`}
        onClick={handleIconClick}
        title={tooltip}
      >
        <span className={`text-lg ${iconClassName}`}>
          {icon}
        </span>
      </div>

      {/* Модальне вікно авторизації */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Connect your Google Ads account</h3>
            <p className="text-gray-600 mb-6">
              Authorize with Google to access your Google Ads data and enable AI-powered analytics.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleGoogleAuth}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Authorize with Google
              </button>
              <button
                onClick={() => setShowAuthModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальне вікно управління аккаунтами */}
      {showAccountsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Google Ads Accounts</h3>
            
            {status.accounts.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Select account:</p>
                <select 
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) => handleChangeAccount(e.target.value)}
                  value={status.currentAccount?.id || ''}
                >
                  {status.accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} ({account.customerId})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleDisconnect}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Disconnect
              </button>
              <button
                onClick={() => setShowAccountsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
