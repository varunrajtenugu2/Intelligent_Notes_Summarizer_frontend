"use client";

import { useRef, useState } from "react";
import { uploadService, type UploadError, type UploadResponse } from "@/services/upload";

interface FileWithPreview extends File {
  preview?: string;
}

interface ValidationError {
  file: string;
  error: string;
}

interface UploadFile {
  file: File;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
  error?: string;
  documentId?: string;
  response?: UploadResponse;
}

const ALLOWED_FORMATS = ["pdf", "docx", "doc", "txt", "png", "jpg", "jpeg"];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_FILES = 5;

export default function UploadZone() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const validateFiles = (files: FileList): { valid: File[]; errors: ValidationError[] } => {
    const valid: File[] = [];
    const errors: ValidationError[] = [];

    // Check max files limit
    if (files.length + uploadedFiles.length > MAX_FILES) {
      errors.push({
        file: "Multiple files",
        error: `Maximum ${MAX_FILES} files allowed. You can upload ${MAX_FILES - uploadedFiles.length} more.`,
      });
    }

    Array.from(files).forEach((file) => {
      // Check file extension
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (!fileExtension || !ALLOWED_FORMATS.includes(fileExtension)) {
        errors.push({
          file: file.name,
          error: `Invalid format. Allowed: ${ALLOWED_FORMATS.join(", ")}`,
        });
        return;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        errors.push({
          file: file.name,
          error: `File too large. Maximum size is ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(0)}MB`,
        });
        return;
      }

      // Check if file already uploaded
      if (uploadedFiles.some((uf) => uf.file.name === file.name)) {
        errors.push({
          file: file.name,
          error: "This file has already been uploaded",
        });
        return;
      }

      valid.push(file);
    });

    return { valid, errors };
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const { valid, errors } = validateFiles(files);

    // Add errors to display
    if (errors.length > 0) {
      setValidationErrors((prev) => [...prev, ...errors]);
    }

    // Add valid files to upload queue
    if (valid.length > 0) {
      const newFiles = valid.map((file) => ({
        file,
        progress: 0,
        status: "pending" as const,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }

    // Clear input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const uploadFile = async (index: number) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[index].status = "uploading";
    setUploadedFiles(updatedFiles);

    try {
      await uploadService.uploadFile(updatedFiles[index].file, (event) => {
        const updatedFilesProgress = [...uploadedFiles];
        updatedFilesProgress[index].progress = event.progress;
        setUploadedFiles(updatedFilesProgress);
      });

      // Mark as completed
      updatedFiles[index].status = "completed";
      updatedFiles[index].progress = 100;
      setUploadedFiles([...updatedFiles]);
    } catch (error: any) {
      // Handle upload error
      updatedFiles[index].status = "error";
      updatedFiles[index].error =
        error.message ||
        "Upload failed. Please check your file and try again.";

      // Add detailed error info
      if (error.code === "NETWORK_ERROR") {
        updatedFiles[index].error =
          "Network error. Please check your internet connection.";
      } else if (error.code === "FILE_SIZE_ERROR") {
        updatedFiles[index].error = "File size exceeds the maximum allowed.";
      } else if (error.code === "INVALID_FILE_TYPE") {
        updatedFiles[index].error = "File type is not supported.";
      }

      setUploadedFiles([...updatedFiles]);
    }
  };

  const handleUploadAll = async () => {
    setIsUploading(true);
    const pendingIndices = uploadedFiles
      .map((f, i) => (f.status === "pending" ? i : -1))
      .filter((i) => i !== -1);

    for (const index of pendingIndices) {
      await uploadFile(index);
      // Small delay between uploads to avoid overwhelming the server
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setIsUploading(false);
  };

  const simulateUpload = async (index: number) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[index].status = "uploading";
    setUploadedFiles(updatedFiles);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += Math.random() * 30) {
      updatedFiles[index].progress = Math.min(i, 100);
      setUploadedFiles([...updatedFiles]);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    // Simulate random success/failure (90% success rate)
    if (Math.random() > 0.1) {
      updatedFiles[index].status = "completed";
      updatedFiles[index].progress = 100;
    } else {
      updatedFiles[index].status = "error";
      updatedFiles[index].error = "Upload failed. Please try again.";
    }

    setUploadedFiles([...updatedFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearErrors = () => {
    setValidationErrors([]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const getFileIcon = (fileName: string): string => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    const icons: { [key: string]: string } = {
      pdf: "📕",
      doc: "📘",
      docx: "📘",
      txt: "📄",
      png: "🖼️",
      jpg: "🖼️",
      jpeg: "🖼️",
    };
    return icons[ext || ""] || "📄";
  };

  const pendingCount = uploadedFiles.filter((f) => f.status === "pending").length;
  const completedCount = uploadedFiles.filter((f) => f.status === "completed").length;
  const errorCount = uploadedFiles.filter((f) => f.status === "error").length;

  return (
    <div className="space-y-6">
      {/* Drag and Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
          dragActive
            ? "border-blue-500 bg-blue-50 shadow-lg"
            : "border-gray-300 bg-gray-50 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleBrowse}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.txt,.png,.jpg,.jpeg"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="text-6xl mb-4">
          {dragActive ? "📥" : "📤"}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {dragActive ? "Drop files here" : "Drag and drop your files here"}
        </h2>

        <p className="text-gray-600 mb-4">
          or click to browse from your computer
        </p>

        <div className="inline-block">
          <button
            onClick={handleBrowse}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
          >
            Browse Files
          </button>
        </div>

        {/* Supported Formats */}
        <div className="mt-8 pt-8 border-t border-gray-300">
          <p className="text-sm font-medium text-gray-700 mb-3">Supported formats:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {ALLOWED_FORMATS.map((format) => (
              <span
                key={format}
                className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700"
              >
                .{format.toUpperCase()}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Maximum file size: {(MAX_FILE_SIZE / 1024 / 1024).toFixed(0)}MB • Max {MAX_FILES} files
          </p>
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-semibold text-red-900">
                  {validationErrors.length} file validation error{validationErrors.length !== 1 ? "s" : ""}
                </h3>
                <p className="text-xs text-red-700 mt-1">
                  Please fix these issues before uploading
                </p>
              </div>
            </div>
            <button
              onClick={handleClearErrors}
              className="text-red-600 hover:text-red-700 text-sm font-medium flex-shrink-0"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            {validationErrors.map((error, idx) => (
              <div key={idx} className="bg-white rounded px-3 py-2 text-sm border-l-4 border-red-400">
                <p className="font-medium text-gray-900 flex items-center gap-2">
                  <span>📄</span> {error.file}
                </p>
                <p className="text-red-600 text-xs mt-1 ml-6">{error.error}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Queue */}
      {uploadedFiles.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Files Ready to Upload</h3>
              <p className="text-sm text-gray-600 mt-1">
                {pendingCount} pending • {completedCount} completed
                {errorCount > 0 && ` • ${errorCount} failed`}
              </p>
            </div>

            {pendingCount > 0 && (
              <button
                onClick={handleUploadAll}
                disabled={isUploading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {isUploading ? "Uploading..." : "Upload All"}
              </button>
            )}
          </div>

          {/* Progress Bar Summary */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-700 font-medium">Overall Progress</span>
              <span className="text-gray-600">
                {completedCount}/{uploadedFiles.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{
                  width: `${(completedCount / uploadedFiles.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Files List */}
          <div className="space-y-3">
            {uploadedFiles.map((fileItem, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-3xl flex-shrink-0">
                      {getFileIcon(fileItem.file.name)}
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {fileItem.file.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {formatFileSize(fileItem.file.size)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Status Badge */}
                    {fileItem.status === "completed" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        ✓ Completed
                      </span>
                    )}
                    {fileItem.status === "uploading" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        ⟳ Uploading
                      </span>
                    )}
                    {fileItem.status === "error" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        ✕ Failed
                      </span>
                    )}
                    {fileItem.status === "pending" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        ⏱ Pending
                      </span>
                    )}

                    {/* Delete Button */}
                    <button
                      onClick={() => handleRemoveFile(index)}
                      disabled={fileItem.status === "uploading"}
                      className="text-gray-400 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      title="Remove file"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                {(fileItem.status === "uploading" || fileItem.status === "completed") && (
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-gray-600">{fileItem.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          fileItem.status === "completed"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                        style={{ width: `${fileItem.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {fileItem.error && (
                  <div className="mt-3 p-3 bg-red-50 rounded border border-red-200">
                    <p className="text-xs text-red-700 font-medium mb-2">
                      Error: {fileItem.error}
                    </p>
                    <button
                      onClick={() => {
                        // Reset to pending for retry
                        const updatedFiles = [...uploadedFiles];
                        updatedFiles[index].status = "pending";
                        updatedFiles[index].error = undefined;
                        updatedFiles[index].progress = 0;
                        setUploadedFiles(updatedFiles);
                      }}
                      className="text-xs text-red-600 hover:text-red-700 font-medium hover:underline"
                    >
                      Retry Upload
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          {completedCount > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3 flex-wrap">
              <button className="flex-1 min-w-fit bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                ✓ Process Completed Files
              </button>
              {(pendingCount > 0 || errorCount > 0) && (
                <button
                  onClick={() => setUploadedFiles([])}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          {/* Retry Failed Uploads */}
          {errorCount > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  // Reset all failed uploads to pending
                  const updatedFiles = uploadedFiles.map((f) =>
                    f.status === "error"
                      ? { ...f, status: "pending" as const, error: undefined, progress: 0 }
                      : f
                  );
                  setUploadedFiles(updatedFiles);
                }}
                className="px-4 py-2 text-red-600 bg-red-50 rounded-lg font-medium hover:bg-red-100 transition border border-red-200"
              >
                🔄 Retry {errorCount} Failed Upload{errorCount !== 1 ? "s" : ""}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tips Section */}
      {uploadedFiles.length === 0 && validationErrors.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex gap-4">
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Tips for best results:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✓ Use clear, high-quality document scans</li>
                <li>✓ Make sure text is readable and well-formatted</li>
                <li>✓ Upload one subject per document for better summaries</li>
                <li>✓ Supported formats: PDF, Word, Text, and Images</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Error Recovery Tips */}
      {uploadedFiles.some((f) => f.status === "error") && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <div className="flex gap-4">
            <span className="text-2xl flex-shrink-0">🔧</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Upload troubleshooting:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✓ Check your internet connection</li>
                <li>✓ Verify the file size is under 50MB</li>
                <li>✓ Ensure your file format is supported (PDF, Word, TXT, or Images)</li>
                <li>✓ Try uploading the file again using the retry button</li>
                <li>✓ If the problem persists, try a different file</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
