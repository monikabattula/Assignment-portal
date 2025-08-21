'use client';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';

export function useApi() {
  const { data: session, update } = useSession();

  const apiCall = useCallback(async (url, options = {}) => {
    if (!session?.accessToken) {
      throw new Error('No access token available');
    }

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      // If token is expired, try to refresh
      if (response.status === 401) {
        console.log('Token expired, attempting refresh...');
        
        // Update session to trigger token refresh
        const newSession = await update();
        
        if (newSession?.accessToken) {
          console.log('Token refreshed successfully, retrying request...');
          // Retry the request with new token
          const retryConfig = {
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${newSession.accessToken}`,
            },
          };
          const retryResponse = await fetch(url, retryConfig);
          
          // If retry also fails, throw error
          if (retryResponse.status === 401) {
            throw new Error('Authentication failed after token refresh');
          }
          
          return retryResponse;
        } else {
          throw new Error('Failed to refresh token - user may need to re-authenticate');
        }
      }
      
      return response;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }, [session?.accessToken, update]);

  return { apiCall };
} 