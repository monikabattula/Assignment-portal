'use client';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

function SessionRefresher({ children }) {
  const { data: session, update } = useSession();

  useEffect(() => {
    if (!session) return;

    // Set up periodic token refresh every 4 minutes (before 5-minute expiration)
    const refreshInterval = setInterval(async () => {
      try {
        await update();
      } catch (error) {
        console.error('Failed to refresh session:', error);
      }
    }, 4 * 60 * 1000); // 4 minutes

    // Refresh session when user returns to the app
    const handleFocus = () => {
      update();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(refreshInterval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [session, update]);

  return children;
}

export default function AuthProvider({ children }) {
  return (
    <SessionProvider>
      <SessionRefresher>{children}</SessionRefresher>
    </SessionProvider>
  );
}