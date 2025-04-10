// src/components/adsandpromotion/DurationCard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import InfoCard from '../InfoCard'; // Assuming InfoCard is one level up
import { FiEdit2 } from 'react-icons/fi';

// Define the DurationOption interface
export interface DurationOption {
  id: number | string;
  label: string;     // e.g., "7 Days", "1 Month"
  valueDays: number; // e.g., 7, 30
}

// --- Placeholder API Functions for Duration ---
const fetchDurations = async (): Promise<DurationOption[]> => {
  console.log("Fetching Durations...");
  await new Promise(resolve => setTimeout(resolve, 450)); // Simulate delay
  try {
    const storedData = localStorage.getItem('mockDurations');
    if (storedData) {
        console.log("Found Durations in localStorage");
        return JSON.parse(storedData);
    }
  } catch (e) { console.error("Error reading Durations from localStorage", e); }
  console.log("Using default Durations data");
  // Default data
  return [
    { id: 1, label: '7 Days', valueDays: 7 },
    { id: 2, label: '14 Days', valueDays: 14 },
    { id: 3, label: '1 Month', valueDays: 30 },
  ];
};

// Utility to save Durations to localStorage (for demo purposes)
const saveDurationsToStorage = (data: DurationOption[]) => {
    try {
        localStorage.setItem('mockDurations', JSON.stringify(data));
    } catch (e) { console.error("Error saving Durations to localStorage", e); }
}
// --- End Placeholder ---

interface DurationCardProps {
  onEditRequest: (item: DurationOption) => void; // Callback for Edit click
  onAddRequest: () => void;                 // Callback for Add New click
  refreshKey: number;                        // Trigger for refetching data
}

const DurationCard: React.FC<DurationCardProps> = ({ onEditRequest, onAddRequest, refreshKey }) => {
  const [durations, setDurations] = useState<DurationOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Effect to fetch data on mount and when refreshKey changes
  useEffect(() => {
    console.log("DurationCard: useEffect triggered, refreshKey:", refreshKey);
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchDurations();
        setDurations(data);
        saveDurationsToStorage(data); // Save initial/fetched data for demo persistence
      } catch (err: any) {
        console.error("Failed to fetch durations:", err);
        setError("Failed to load durations.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [refreshKey]); // Rerun effect when refreshKey changes

  return (
    // Use InfoCard component for consistent styling
    <InfoCard title="Duration" onAddNew={onAddRequest} isLoading={isLoading}>
      {error && <p className="text-center text-red-600">{error}</p>}
      {!isLoading && !error && durations.length === 0 && (
         <p className="text-center text-gray-500">No durations defined yet.</p>
      )}
      {durations.map((duration) => (
        <div key={duration.id} className="flex items-center justify-between border-b border-gray-100 py-3 last:border-b-0 last:pb-0">
          <div>
            <p className="font-medium text-gray-800">{duration.label}</p>
            <p className="text-sm text-gray-500">
              ({duration.valueDays} days) {/* Optionally display the day value */}
            </p>
          </div>
          <button
            onClick={() => onEditRequest(duration)} // Pass the duration item up
            className="rounded-md p-1 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800"
            aria-label={`Edit ${duration.label}`}
          >
            <FiEdit2 size={18} />
          </button>
        </div>
      ))}
    </InfoCard>
  );
};

export default DurationCard;