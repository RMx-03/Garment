import { useState, useEffect, useCallback, useRef } from 'react';

const cache = new Map();
const prefetchQueue = new Set();
const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

export const useOptimizedQuery = (key, fetchFn, options = {}) => {
  const {
    enabled = true,
    staleTime = CACHE_TIME,
    prefetch = false,
    dependencies = [],
  } = options;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const lastFetchTime = useRef(0);

  const fetchData = useCallback(async (forceFetch = false) => {
    const now = Date.now();
    const cached = cache.get(key);

    // Return cached data if it's not stale
    if (!forceFetch && cached && now - cached.timestamp < staleTime) {
      setData(cached.data);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const result = await fetchFn();
      
      // Cache the fresh data
      cache.set(key, {
        data: result,
        timestamp: now,
      });
      
      setData(result);
      lastFetchTime.current = now;
    } catch (err) {
      setError(err);
      console.error(`Error fetching data for key ${key}:`, err);
    } finally {
      setIsLoading(false);
    }
  }, [key, fetchFn, staleTime]);

  // Prefetch data
  const prefetchData = useCallback(() => {
    if (prefetchQueue.has(key)) return;
    prefetchQueue.add(key);
    
    const now = Date.now();
    const cached = cache.get(key);
    
    if (cached && now - cached.timestamp < staleTime) {
      return;
    }

    // Low priority fetch
    const controller = new AbortController();
    fetchFn({ signal: controller.signal })
      .then((result) => {
        cache.set(key, {
          data: result,
          timestamp: now,
        });
      })
      .catch(() => {})
      .finally(() => {
        prefetchQueue.delete(key);
      });

    // Cleanup prefetch if component unmounts
    return () => {
      controller.abort();
      prefetchQueue.delete(key);
    };
  }, [key, fetchFn, staleTime]);

  useEffect(() => {
    if (!enabled) return;
    
    if (prefetch) {
      return prefetchData();
    } else {
      fetchData();
    }
  }, [enabled, prefetch, fetchData, prefetchData, ...dependencies]);

  return {
    data,
    error,
    isLoading,
    refetch: () => fetchData(true),
    prefetch: prefetchData,
  };
};

// Helper function to clear the entire cache
export const clearQueryCache = () => {
  cache.clear();
};

// Helper function to remove a specific key from cache
export const removeFromQueryCache = (key) => {
  cache.delete(key);
}; 