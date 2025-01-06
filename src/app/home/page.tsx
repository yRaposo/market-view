'use client';
import ProductsList from '@/components/ProductsList';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');
    setAccessToken(token);
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
    }

  }, []);

  return (
    <div>
      <ProductsList userId="1087712289" />
    </div>
  );
}