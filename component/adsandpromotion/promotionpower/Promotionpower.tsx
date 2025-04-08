// src/components/adsandpromotion/PromotionPowerCard.tsx
'use client';

import React, { useState, useEffect } from 'react';
// Assuming InfoCard is in a shared UI directory
import InfoCard from '../InfoCard';
import { FiEdit2 } from 'react-icons/fi';

// Define the PromotionPower interface (Export if needed by the Panel)
export interface PromotionPower {
  id: number | string;
  name: string; // In the panel, this maps to the 'Name (Options)' textarea
  // Add other fields like description if needed
}

// --- Placeholder API Functions for Promotion Power ---
const fetchPromotionPowers = async (): Promise<PromotionPower[]> => {
  console.log("Fetching Promotion Powers...");
  await new Promise(resolve => setTimeout(resolve, 600));
  try {
    const storedData = localStorage.getItem('mockPromoPowers');
    if (storedData) {
      console.log("Found PromoPowers in localStorage");
      return JSON.parse(storedData);
    }
  } catch (e) { console.error("Error reading PromoPowers from localStorage", e); }
  console.log("Using default PromoPowers data");
  return [
    { id: 1, name: 'Standard (Basic reach)' },
    { id: 2, name: 'Premium (Wider reach)' },
  ];
};

const savePromotionPowersToStorage = (data: PromotionPower[]) => {
    try {
        localStorage.setItem('mockPromoPowers', JSON.stringify(data));
    } catch (e) { console.error("Error saving PromoPowers to localStorage", e); }
}
// --- End Placeholder ---

interface PromotionPowerCardProps {
  onEditRequest: (item: PromotionPower) => void; // Callback when Edit icon is clicked
  onAddRequest: () => void;             // Callback when "Add New" is clicked
  refreshKey: number;                    // A changing value to trigger refetch
}

const PromotionPowerCard: React.FC<PromotionPowerCardProps> = ({ onEditRequest, onAddRequest, refreshKey }) => {
  const [powers, setPowers] = useState<PromotionPower[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Effect to fetch data on mount and when refreshKey changes
  useEffect(() => {
    console.log("PromotionPowerCard: useEffect triggered, refreshKey:", refreshKey);
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchPromotionPowers();
        setPowers(data);
        savePromotionPowersToStorage(data); // Save initial/fetched data for demo
      } catch (err: any) {
        console.error("Failed to fetch promotion powers:", err);
        setError("Failed to load promotion powers.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [refreshKey]); // Rerun when refreshKey changes

  return (
    <InfoCard title="Promotion Power" onAddNew={onAddRequest} isLoading={isLoading}>
      {error && <p className="text-center text-red-600">{error}</p>}
      {!isLoading && !error && powers.length === 0 && (
         <p className="text-center text-gray-500">No promotion powers defined yet.</p>
      )}
      {powers.map((power) => (
        <div key={power.id} className="flex items-center justify-between border-b border-gray-100 py-3 last:border-b-0 last:pb-0">
          <div>
            <p className="font-medium text-gray-800">{power.name}</p>
            {/* Display other fields like description if available */}
          </div>
          <button
            onClick={() => onEditRequest(power)} // Pass the power item up
            className="rounded-md p-1 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800"
            aria-label={`Edit ${power.name}`}
          >
            <FiEdit2 size={18} />
          </button>
        </div>
      ))}
    </InfoCard>
  );
};

export default PromotionPowerCard;