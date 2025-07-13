'use client';

import { useState, useMemo } from 'react';
import { GoogleAdsData } from '../types';

export const useGoogleAdsData = () => {
  // Google Ads данные
  const [adsData, setAdsData] = useState<GoogleAdsData | null>(null);
  const [useAdsData, setUseAdsData] = useState(false);
  const [realAdsData, setRealAdsData] = useState<GoogleAdsData | null>(null);
  const [accountConnected, setAccountConnected] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Мемоизированные значения
  const dataToUse = useMemo(() => realAdsData || adsData, [realAdsData, adsData]);
  const hasData = useMemo(() => dataToUse && dataToUse.campaigns && dataToUse.campaigns.length > 0, [dataToUse]);

  return {
    // State
    adsData,
    useAdsData,
    realAdsData,
    accountConnected,
    accessToken,
    dataToUse,
    hasData,
    
    // Actions
    setAdsData,
    setUseAdsData,
    setRealAdsData,
    setAccountConnected,
    setAccessToken,
  };
}; 