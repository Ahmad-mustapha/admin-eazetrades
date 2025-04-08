// src/component/adsandpromotion/Adtype.tsx
'use client';

import React, { useState, useEffect } from 'react';
import InfoCard from '../InfoCard';
import { FiEdit2 } from 'react-icons/fi';

// Define or Import the AdType structure
export interface AdType {
  id: number | string;
  name: string;
  price: number;
  currency: string;
}

// --- Placeholder Fetch Function (Replace with actual API call) ---
const fetchAdTypes = async (): Promise<AdType[]> => {
  console.log("Fetching Ad Types...");
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
  // Retrieve mock data from localStorage or return default if not found
  try {
    const storedData = localStorage.getItem('mockAdTypes');
    if (storedData) {
        console.log("Found data in localStorage")
        return JSON.parse(storedData);
    }
  } catch (e) { console.error("Error reading from localStorage", e); }
  console.log("Using default data")
  return [ // Default data if nothing in localStorage
    { id: 1, name: 'Sponsored Post', price: 10000, currency: 'NGN' },
    { id: 2, name: 'Banner Ad', price: 10000, currency: 'NGN' },
    { id: 3, name: 'Pop-up Ad', price: 10000, currency: 'NGN' },
  ];
};

// Utility to save to localStorage (for demo purposes)
const saveAdTypesToStorage = (data: AdType[]) => {
    try {
        localStorage.setItem('mockAdTypes', JSON.stringify(data));
    } catch (e) { console.error("Error saving to localStorage", e); }
}
// --- End Placeholder ---


// Format currency utility
const formatCurrency = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: currencyCode, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
};

interface AdTypeCardProps {
  onEditRequest: (item: AdType) => void; // Called when Edit icon is clicked
  onAddRequest: () => void;          // Called when "Add New" is clicked
  refreshKey: number;                 // A changing value to trigger refetch
}

const AdTypeCard: React.FC<AdTypeCardProps> = ({ onEditRequest, onAddRequest, refreshKey }) => {
  const [adTypes, setAdTypes] = useState<AdType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Effect to fetch data on mount and when refreshKey changes
  useEffect(() => {
    console.log("AdTypeCard: useEffect triggered, refreshKey:", refreshKey);
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchAdTypes();
        setAdTypes(data);
        saveAdTypesToStorage(data); // Save initial/fetched data to storage for demo persistence
      } catch (err: any) {
        console.error("Failed to fetch ad types:", err);
        setError("Failed to load ad types.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [refreshKey]); // Dependency array includes refreshKey

  return (
    // Use InfoCard or basic div structure
    <InfoCard title="Ad Type" onAddNew={onAddRequest} isLoading={isLoading}>
      {error && <p className="text-center text-red-600">{error}</p>}
      {!isLoading && !error && adTypes.length === 0 && (
         <p className="text-center text-gray-500">No ad types defined yet.</p>
      )}
      {adTypes.map((ad) => (
        <div key={ad.id} className="flex items-center justify-between border-b border-gray-100 py-3 last:border-b-0 last:pb-0">
          <div>
            <p className="font-medium text-gray-800">{ad.name}</p>
            <p className="text-sm text-gray-500">
              Price: {formatCurrency(ad.price, ad.currency)}
            </p>
          </div>
          <button
            onClick={() => onEditRequest(ad)} // Pass the ad data up
            className="rounded-md p-1 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800"
            aria-label={`Edit ${ad.name}`}
          >
            <FiEdit2 size={18} />
          </button>
        </div>
      ))}
    </InfoCard>
  );
};

export default AdTypeCard;