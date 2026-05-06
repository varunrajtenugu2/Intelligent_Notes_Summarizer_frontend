/**
 * Summary Service
 * Handles summary API requests
 */

import { api } from './api';

export interface Summary {
  documentId: string;
  documentName: string;
  summary: string;
  status: 'completed' | 'processing' | 'pending';
  flashcardsCount?: number;
  date?: string;
}

export interface SummaryResponse {
  success: boolean;
  data: Summary[];
  message?: string;
}

export interface SummaryDetailResponse {
  success: boolean;
  data: Summary;
  message?: string;
}

export interface GenerateSummaryRequest {
  documentId: string;
  summaryType?: 'brief' | 'detailed' | 'outline';
}

export const summaryService = {
  /**
   * Get all summaries for the current user
   */
  getAllSummaries: async (): Promise<Summary[]> => {
    try {
      const response = await api.get('/summaries');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as SummaryResponse;

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch summaries');
      }

      return data.data || [];
    } catch (error) {
      console.error('Error fetching summaries:', error);
      throw error;
    }
  },

  /**
   * Get a specific summary by document ID
   */
  getSummaryByDocumentId: async (documentId: string): Promise<Summary> => {
    try {
      const response = await api.get(`/summaries/${documentId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as SummaryDetailResponse;

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch summary');
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching summary:', error);
      throw error;
    }
  },

  /**
   * Generate or regenerate a summary for a document
   */
  generateSummary: async (request: GenerateSummaryRequest): Promise<Summary> => {
    try {
      const response = await api.post('/summaries/generate', request);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as SummaryDetailResponse;

      if (!data.success) {
        throw new Error(data.message || 'Failed to generate summary');
      }

      return data.data;
    } catch (error) {
      console.error('Error generating summary:', error);
      throw error;
    }
  },

  /**
   * Delete a summary
   */
  deleteSummary: async (documentId: string): Promise<void> => {
    try {
      const response = await api.delete(`/summaries/${documentId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as SummaryResponse;

      if (!data.success) {
        throw new Error(data.message || 'Failed to delete summary');
      }
    } catch (error) {
      console.error('Error deleting summary:', error);
      throw error;
    }
  },

  /**
   * Update summary metadata (e.g., title, notes)
   */
  updateSummary: async (documentId: string, updates: Partial<Summary>): Promise<Summary> => {
    try {
      const response = await api.put(`/summaries/${documentId}`, updates);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as SummaryDetailResponse;

      if (!data.success) {
        throw new Error(data.message || 'Failed to update summary');
      }

      return data.data;
    } catch (error) {
      console.error('Error updating summary:', error);
      throw error;
    }
  },

  /**
   * Filter summaries by status
   */
  getSummariesByStatus: async (status: 'completed' | 'processing' | 'pending'): Promise<Summary[]> => {
    try {
      const response = await api.get(`/summaries?status=${status}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as SummaryResponse;

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch summaries');
      }

      return data.data || [];
    } catch (error) {
      console.error('Error fetching summaries by status:', error);
      throw error;
    }
  },

  /**
   * Export summary to various formats
   */
  exportSummary: async (documentId: string, format: 'pdf' | 'docx' | 'txt'): Promise<Blob> => {
    try {
      const response = await api.get(`/summaries/${documentId}/export?format=${format}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Error exporting summary:', error);
      throw error;
    }
  },
};
