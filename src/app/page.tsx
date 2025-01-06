'use client';
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { verifyRefreshToken, fetchToken } from "@/services/authService";
import { MLApi } from "@/libs/MLApi";
import AuthStatus from "@/components/AuthStatus";

export default function Access() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const storedRefreshToken = localStorage.getItem('refresh_token');
    if (storedRefreshToken) {
      verifyRefreshToken(storedRefreshToken)
        .then(data => {
          setToken(data.access_token);
          setRefreshToken(data.refresh_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          localStorage.setItem('access_token', data.access_token);
          MLApi.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
          window.location.href = `http://localhost:3000/home?access_token=${data.access_token}`;
        })
        .catch(() => {
          const codeParam = searchParams.get('code');
          if (codeParam) {
            setCode(codeParam);
          } else {
            window.location.href = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;
          }
        });
    } else {
      const codeParam = searchParams.get('code');
      if (codeParam) {
        setCode(codeParam);
      } else {
        window.location.href = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (code && !token) {
      fetchToken(code)
        .then(data => {
          setToken(data.access_token);
          setRefreshToken(data.refresh_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          localStorage.setItem('access_token', data.access_token);
          MLApi.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
          window.location.href = '/home';
        })
        .catch(() => setIsError(true));
    }
  }, [code, token]);

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">
        Market View
      </h1>
      <AuthStatus isError={isError} token={token} code={code} />
    </div>
  );
}