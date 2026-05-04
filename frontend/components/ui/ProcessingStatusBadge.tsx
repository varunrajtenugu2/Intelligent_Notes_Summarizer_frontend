"use client";

export interface ProcessingStatusBadgeProps {
  status: "completed" | "processing" | "pending";
  animated?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function ProcessingStatusBadge({
  status,
  animated = true,
  size = "md",
}: ProcessingStatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm":
        return "px-2 py-1 text-xs gap-1";
      case "lg":
        return "px-3.5 py-2.5 text-base gap-2";
      default:
        return "px-2.5 py-1.5 text-sm gap-1.5";
    }
  };

  const getIconSize = (size: string) => {
    switch (size) {
      case "sm":
        return "w-3 h-3";
      case "lg":
        return "w-5 h-5";
      default:
        return "w-4 h-4";
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${getStatusColor(
        status
      )} ${getSizeClasses(size)} ${status === "processing" && animated ? "animate-pulse" : ""}`}
    >
      {status === "completed" && (
        <svg
          className={`${getIconSize(size)} text-green-600`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {status === "processing" && (
        <svg
          className={`${getIconSize(size)} text-blue-600 ${
            animated ? "animate-spin" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      )}
      {status === "pending" && (
        <svg
          className={`${getIconSize(size)} text-yellow-600`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
            clipRule="evenodd"
          />
        </svg>
      )}

      <span className="capitalize whitespace-nowrap">
        {status === "completed" && "Completed"}
        {status === "processing" && "Processing"}
        {status === "pending" && "Pending"}
      </span>

      {status === "processing" && animated && (
        <span className="ml-1 inline-block">
          <span className="inline-block w-1 h-1 bg-current rounded-full animate-bounce"></span>
          <span
            className="inline-block w-1 h-1 bg-current rounded-full animate-bounce ml-0.5"
            style={{ animationDelay: "0.1s" }}
          ></span>
          <span
            className="inline-block w-1 h-1 bg-current rounded-full animate-bounce ml-0.5"
            style={{ animationDelay: "0.2s" }}
          ></span>
        </span>
      )}
    </span>
  );
}
