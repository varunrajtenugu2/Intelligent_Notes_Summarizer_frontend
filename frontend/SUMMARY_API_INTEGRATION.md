# Summary API Integration Guide

This guide explains how to use the summary API integration for fetching and displaying generated summaries.

## Architecture

### Services (`services/summary.ts`)

The summary service provides methods to interact with the backend API:

- **`getAllSummaries()`** - Fetch all summaries for the current user
- **`getSummaryByDocumentId(id)`** - Get a specific summary by document ID
- **`generateSummary(request)`** - Generate or regenerate a summary
- **`deleteSummary(documentId)`** - Delete a summary
- **`updateSummary(documentId, updates)`** - Update summary metadata
- **`getSummariesByStatus(status)`** - Filter summaries by status (completed, processing, pending)
- **`exportSummary(documentId, format)`** - Export summary to PDF, DOCX, or TXT

### Custom Hook (`hooks/useSummaries.ts`)

The `useSummaries` hook provides easy access to summary data with automatic loading, error handling, and actions:

```typescript
const { summaries, loading, error, refetch, generateSummary, deleteSummary } = useSummaries({
  autoFetch: true,
  status: 'all' // or 'completed', 'processing', 'pending'
});
```

**Return Values:**
- `summaries` - Array of summary objects
- `loading` - Boolean indicating if data is being fetched
- `error` - Error object if something went wrong
- `refetch()` - Function to manually refresh summaries
- `generateSummary(documentId, type)` - Generate a new summary
- `deleteSummary(documentId)` - Delete a summary

## Components

### 1. SummaryDisplay
Displays a detailed view of a single summary with:
- Full summary text with expand/collapse
- Copy to clipboard functionality
- Download options (PDF, DOCX, TXT)
- Regenerate button with loading state
- Status badge and flashcard count
- Word count, read time, and topic stats

**Props:**
```typescript
interface SummaryDisplayProps {
  documentId: string;
  documentName: string;
  summary: string;
  status?: 'completed' | 'processing' | 'pending';
  flashcardsCount?: number;
  onClose?: () => void;
  onRegenerate?: (newSummary: string) => void;
}
```

### 2. SummaryCard
Compact card component for grid layouts:
- Document name with status
- Summary preview (150 characters)
- Stats: Words, Read Time, Flashcards
- Action buttons: View Summary, Share

**Props:**
```typescript
interface SummaryCardProps {
  documentId: string;
  documentName: string;
  summary: string;
  status?: 'completed' | 'processing' | 'pending';
  flashcardsCount?: number;
  date?: string;
  onClick?: () => void;
  onViewSummary?: () => void;
}
```

### 3. SummaryList
Grid layout with filtering and responsive design:
- Filter tabs (All, Completed, Processing, Pending)
- Responsive grid (1, 2, or 3 columns)
- Loading animations
- Empty state messaging

**Props:**
```typescript
interface SummaryListProps {
  summaries: Summary[];
  onSelectSummary?: (summary: Summary) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  columns?: 1 | 2 | 3;
}
```

### 4. SummarySection
Main wrapper component with list/detail view toggle:
- Header with title and view mode buttons
- List view with SummaryList
- Detail view with SummaryDisplay
- Navigation between views

**Props:**
```typescript
interface SummarySectionProps {
  title?: string;
  description?: string;
  summaries: Summary[];
  isLoading?: boolean;
  columns?: 1 | 2 | 3;
}
```

## Usage Example

### Basic Page Implementation

```typescript
'use client';

import { useSummaries } from '@/hooks';
import { SummarySection } from '@/components/summary';
import Sidebar from '@/components/sidebar/Sidebar';
import { useState } from 'react';

export default function SummariesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { summaries, loading, error } = useSummaries({ autoFetch: true });

  return (
    <div className="flex h-full bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 md:ml-64 p-8">
        {error ? (
          <div className="bg-red-50 p-6 rounded-lg">
            <p>Error: {error.message}</p>
          </div>
        ) : (
          <SummarySection summaries={summaries} isLoading={loading} columns={2} />
        )}
      </div>
    </div>
  );
}
```

### Using the Hook with Manual Actions

```typescript
import { useSummaries } from '@/hooks';

export default function ManageSummaries() {
  const { summaries, loading, generateSummary, deleteSummary } = useSummaries({
    autoFetch: true,
    status: 'completed'
  });

  const handleRegenerate = async (documentId: string) => {
    try {
      const newSummary = await generateSummary(documentId, 'detailed');
      console.log('Generated:', newSummary);
    } catch (error) {
      console.error('Failed:', error);
    }
  };

  return (
    <div>
      {summaries.map((summary) => (
        <div key={summary.documentId}>
          <h3>{summary.documentName}</h3>
          <button onClick={() => handleRegenerate(summary.documentId)}>
            Regenerate
          </button>
        </div>
      ))}
    </div>
  );
}
```

## API Endpoints Expected

The following API endpoints should be available on your backend:

```
GET    /api/summaries                     - Get all summaries
GET    /api/summaries?status={status}     - Get summaries by status
GET    /api/summaries/{documentId}        - Get specific summary
POST   /api/summaries/generate            - Generate new summary
PUT    /api/summaries/{documentId}        - Update summary
DELETE /api/summaries/{documentId}        - Delete summary
GET    /api/summaries/{documentId}/export - Export summary
```

## Error Handling

All service methods throw errors that can be caught:

```typescript
try {
  const summaries = await summaryService.getAllSummaries();
} catch (error) {
  console.error('Failed to fetch summaries:', error.message);
}
```

The `useSummaries` hook automatically handles errors and stores them in the `error` state.

## Status Badges

Summaries have three statuses:
- **Completed** (green) - Summary is ready
- **Processing** (yellow) - Summary is being generated
- **Pending** (gray) - Waiting to be processed

## Features

✅ Auto-fetch summaries on component mount
✅ Manual refetch capability
✅ Copy summary to clipboard
✅ Download in multiple formats (PDF, DOCX, TXT)
✅ Regenerate summaries
✅ Filter by status
✅ Responsive grid layouts
✅ Loading and error states
✅ Pagination support (for future enhancement)
✅ Search functionality (for future enhancement)
