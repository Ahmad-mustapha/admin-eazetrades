// src/components/adsandpromotion/EditPromotionPowerPanel.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

// Import or define PromotionPower structure
import { PromotionPower } from './Promotionpower';

// Export EditMode (can be shared if defined globally, or exported from each panel)
export type EditMode = 'add' | 'edit';

interface EditPromotionPowerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: EditMode;
  initialData: PromotionPower | null; // The PromotionPower being edited, or null for add
  onSaveSuccess: () => void;          // Callback to trigger refresh in parent
}

// --- Placeholder API Function for Promotion Power (Replace with actual API call) ---
const savePromotionPowerApi = async (mode: EditMode, data: { name: string }, id?: string | number): Promise<any> => {
    console.log(`API: ${mode === 'add' ? 'Adding' : `Updating ID ${id}`}`, data);
    await new Promise(resolve => setTimeout(resolve, 700)); // Simulate delay
    if (data.name.toLowerCase() === 'error') throw new Error("Simulated save error for Promo Power!");
    const newItemData = { ...data, id: id ?? Date.now() };
    // --- Simulate saving to localStorage ---
    try {
        const currentDataString = localStorage.getItem('mockPromoPowers');
        const currentData = currentDataString ? JSON.parse(currentDataString) : [];
        let updatedData;
        if (mode === 'add') { updatedData = [...currentData, newItemData]; }
        else { updatedData = currentData.map((item: any) => item.id === id ? newItemData : item); }
        localStorage.setItem('mockPromoPowers', JSON.stringify(updatedData));
    } catch (e) { console.error("Error updating localStorage for PromoPowers", e); }
    // --- End localStorage simulation ---
    return { success: true, data: newItemData };
}
// ---

const EditPromotionPowerPanel: React.FC<EditPromotionPowerPanelProps> = ({ isOpen, onClose, mode, initialData, onSaveSuccess }) => {
  // State specifically for the Promotion Power form
  const [name, setName] = useState(''); // Corresponds to the 'Name (Options)' textarea
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const panelTitle = mode === 'add' ? 'Add New Promotion Power' : 'Edit Promotion Power';

  // Effect to load initial data into form
  useEffect(() => {
    if (isOpen) {
        if (mode === 'edit' && initialData) {
            setName(initialData.name);
        } else {
            setName(''); // Reset for 'add' mode
        }
        setError(null);
        setIsSaving(false);
    }
  }, [isOpen, mode, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    if (!name.trim()) {
        setError("Name (Options) cannot be empty.");
        setIsSaving(false);
        return;
    }

    const saveData = { name }; // Data structure for the API
    const itemId = mode === 'edit' ? initialData?.id : undefined;

    try {
      await savePromotionPowerApi(mode, saveData, itemId);
      onSaveSuccess(); // Notify parent to refresh
      onClose();       // Close panel
    } catch (err: any) {
      console.error("Failed to save Promotion Power:", err);
      setError(err.message || "Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className={`fixed inset-0 z-50 bg-black/30 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={onClose} aria-hidden="true" />

      {/* Panel Content */}
      <div className={`fixed inset-y-0 right-0 z-50 w-4/5 max-w-md transform overflow-y-auto bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} role="dialog" aria-modal="true" aria-labelledby="panel-title-promo-power">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 id="panel-title-promo-power" className="text-xl font-semibold text-gray-800">{panelTitle}</h2>
            <button onClick={onClose} disabled={isSaving} className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50" aria-label="Close panel"> <FiX size={22} /> </button>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} id="promo-power-form" className="flex-grow space-y-4">
            <div>
              <label htmlFor="promo-name" className="block text-sm font-medium text-gray-700 mb-1">Name (Options)</label>
              <textarea
                id="promo-name"
                name="name" // The state variable is also 'name'
                rows={4} // Adjust rows as needed
                value={name}
                disabled={isSaving}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100"
                placeholder="e.g., Standard (Basic reach)"
              ></textarea>
            </div>
            {/* Add other fields like Description here if needed */}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
          {/* Footer Button */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <button
              type="submit"
              form="promo-power-form"
              disabled={isSaving}
              className="w-full rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : (mode === 'add' ? 'Add Promotion Power' : 'Save Changes')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPromotionPowerPanel;