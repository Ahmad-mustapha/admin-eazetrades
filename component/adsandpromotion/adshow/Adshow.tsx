// src/component/adsandpromotion/adshow/Adshow.tsx
'use client';

import React, { useState, useEffect } from 'react';
// Assuming InfoCard is in a shared UI directory relative to this file
import InfoCard from '../InfoCard';
import { FiEdit2 } from 'react-icons/fi';

// Define the AdShowOption interface (Export if needed by the Panel)
export interface AdShowOption {
  id: number | string;
  name: string; // e.g., "Standard Visibility", "High Frequency"
  // Add other fields like description if needed
}

// --- Placeholder API Functions for Ad Show Options ---
const fetchAdShowOptions = async (): Promise<AdShowOption[]> => {
  console.log("Fetching Ad Show Options...");
  await new Promise(resolve => setTimeout(resolve, 550)); // Simulate slightly different delay
  try {
    const storedData = localStorage.getItem('mockAdShowOptions');
    if (storedData) {
      console.log("Found AdShowOptions in localStorage");
      return JSON.parse(storedData);
    }
  } catch (e) { console.error("Error reading AdShowOptions from localStorage", e); }
  console.log("Using default AdShowOptions data");
  return [
    { id: 'as1', name: 'Premium' },
    { id: 'as2', name: 'High Frequency Display' },
    { id: 'as3', name: 'Top Placement Priority' },
  ];
};

const saveAdShowOptionsToStorage = (data: AdShowOption[]) => {
    try {
        localStorage.setItem('mockAdShowOptions', JSON.stringify(data));
    } catch (e) { console.error("Error saving AdShowOptions to localStorage", e); }
}
// --- End Placeholder ---

interface AdShowCardProps {
  onEditRequest: (item: AdShowOption) => void; // Callback when Edit icon is clicked
  onAddRequest: () => void;             // Callback when "Add New" is clicked
  refreshKey: number;                    // A changing value to trigger refetch
}

const AdShowCard: React.FC<AdShowCardProps> = ({ onEditRequest, onAddRequest, refreshKey }) => {
  const [options, setOptions] = useState<AdShowOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Effect to fetch data on mount and when refreshKey changes
  useEffect(() => {
    console.log("AdShowCard: useEffect triggered, refreshKey:", refreshKey);
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchAdShowOptions();
        setOptions(data);
        saveAdShowOptionsToStorage(data); // Save initial/fetched data for demo
      } catch (err: any) {
        console.error("Failed to fetch ad show options:", err);
        setError("Failed to load ad show options.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [refreshKey]); // Rerun when refreshKey changes

  return (
    <InfoCard title="Ad Show Options" onAddNew={onAddRequest} isLoading={isLoading}>
      {error && <p className="text-center text-red-600">{error}</p>}
      {!isLoading && !error && options.length === 0 && (
         <p className="text-center text-gray-500">No ad show options defined yet.</p>
      )}
      {options.map((option) => (
        <div key={option.id} className="flex items-center justify-between border-b border-gray-100 py-3 last:border-b-0 last:pb-0">
          <div>
            <p className="font-medium text-gray-800">{option.name}</p>
            {/* Display other fields like description if available */}
          </div>
          <button
            onClick={() => onEditRequest(option)} // Pass the option item up
            className="rounded-md p-1 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800"
            aria-label={`Edit ${option.name}`}
          >
            <FiEdit2 size={18} />
          </button>
        </div>
      ))}
    </InfoCard>
  );
};

export default AdShowCard;