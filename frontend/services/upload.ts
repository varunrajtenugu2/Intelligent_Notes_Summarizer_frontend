/**
 * Upload Service
 * Handles file uploads to the backend with progress tracking
 */

import { auth } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface UploadProgressEvent {
  progress: number;
  loaded: number;
  total: number;
}

export interface UploadResponse {
  success: boolean;
  documentId: string;
  fileName: string;
  message: string;
}

export interface UploadError {
  code: string;
  message: string;
  details?: string;
}

export const uploadService = {
  /**
   * Upload a single file with progress tracking
   */
  uploadFile: async (
    file: File,
    onProgress?: (event: UploadProgressEvent) => void
  ): Promise<UploadResponse> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = Math.round((event.loaded / event.total) * 100);
          onProgress({
            progress,
            loaded: event.loaded,
            total: event.total,
          });
        }
      });

      // Handle completion
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText) as UploadResponse;
            resolve(response);
          } catch (error) {
            reject({
              code: 'PARSE_ERROR',
              message: 'Failed to parse server response',
            } as UploadError);
          }
        } else {
          try {
            const errorData = JSON.parse(xhr.responseText);
            reject({
              code: errorData.code || 'UPLOAD_FAILED',
              message: errorData.message || 'Upload failed',
              details: errorData.details,
            } as UploadError);
          } catch (error) {
            reject({
              code: 'UPLOAD_FAILED',
              message: `Upload failed with status ${xhr.status}`,
            } as UploadError);
          }
        }
      });

      // Handle errors
      xhr.addEventListener('error', () => {
        reject({
          code: 'NETWORK_ERROR',
          message: 'Network error during upload. Please check your connection.',
        } as UploadError);
      });

      // Handle abort
      xhr.addEventListener('abort', () => {
        reject({
          code: 'UPLOAD_ABORTED',
          message: 'Upload was cancelled',
        } as UploadError);
      });

      // Set up request
      const token = auth.getToken();
      xhr.open('POST', `${API_BASE_URL}/documents/upload`);

      // Add auth header
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }

      // Send request
      try {
        xhr.send(formData);
      } catch (error: any) {
        reject({
          code: 'REQUEST_ERROR',
          message: error.message || 'Failed to initiate upload',
        } as UploadError);
      }
    });
  },

  /**
   * Upload multiple files sequentially
   */
  uploadFiles: async (
    files: File[],
    onFileProgress?: (
      fileIndex: number,
      fileName: string,
      event: UploadProgressEvent
    ) => void,
    onFileComplete?: (fileIndex: number, fileName: string, response: UploadResponse) => void,
    onFileError?: (fileIndex: number, fileName: string, error: UploadError) => void
  ): Promise<{ completed: UploadResponse[]; failed: Array<{ file: string; error: UploadError }> }> => {
    const completed: UploadResponse[] = [];
    const failed: Array<{ file: string; error: UploadError }> = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        const response = await uploadService.uploadFile(file, (event) => {
          if (onFileProgress) {
            onFileProgress(i, file.name, event);
          }
        });

        completed.push(response);

        if (onFileComplete) {
          onFileComplete(i, file.name, response);
        }
      } catch (error: any) {
        const uploadError: UploadError = {
          code: error.code || 'UPLOAD_FAILED',
          message: error.message || 'Upload failed',
          details: error.details,
        };

        failed.push({
          file: file.name,
          error: uploadError,
        });

        if (onFileError) {
          onFileError(i, file.name, uploadError);
        }
      }
    }

    return { completed, failed };
  },

  /**
   * Get upload status
   */
  getUploadStatus: async (documentId: string) => {
    try {
      const token = auth.getToken();
      const response = await fetch(`${API_BASE_URL}/documents/${documentId}/status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get upload status');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to retrieve upload status');
    }
  },

  /**
   * Cancel upload (if supported by backend)
   */
  cancelUpload: async (documentId: string) => {
    try {
      const token = auth.getToken();
      const response = await fetch(`${API_BASE_URL}/documents/${documentId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to cancel upload');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to cancel upload');
    }
  },
};
