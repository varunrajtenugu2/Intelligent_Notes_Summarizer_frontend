'use client';

import { useEffect, useState, useCallback } from 'react';
import { summaryService, type Summary } from '@/services/summary';

interface UseSummariesOptions {
  autoFetch?: boolean;
  status?: 'completed' | 'processing' | 'pending' | 'all';
}

export const useSummaries = (options: UseSummariesOptions = {}) => {
  const { autoFetch = true, status = 'all' } = options;

  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchSummaries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let data: Summary[];

      if (status === 'all') {
        data = await summaryService.getAllSummaries();
      } else {
        data = await summaryService.getSummariesByStatus(status);
      }

      setSummaries(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch summaries');
      setError(error);
      setSummaries([]);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (autoFetch) {
      fetchSummaries();
    }
  }, [autoFetch, fetchSummaries]);

  const refetch = useCallback(() => {
    fetchSummaries();
  }, [fetchSummaries]);

  const generateSummary = useCallback(
    async (documentId: string, summaryType: 'brief' | 'detailed' | 'outline' = 'detailed') => {
      try {
        setLoading(true);
        setError(null);

        const newSummary = await summaryService.generateSummary({
          documentId,
          summaryType,
        });

        setSummaries((prev) => [newSummary, ...prev]);
        return newSummary;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to generate summary');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteSummary = useCallback(async (documentId: string) => {
    try {
      setLoading(true);
      setError(null);

      await summaryService.deleteSummary(documentId);

      setSummaries((prev) => prev.filter((s) => s.documentId !== documentId));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete summary');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    summaries,
    loading,
    error,
    refetch,
    generateSummary,
    deleteSummary,
  };
};
