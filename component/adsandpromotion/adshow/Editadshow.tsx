// src/component/adsandpromotion/adshow/Editadshow.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

// Import AdShowOption structure
import { AdShowOption } from './Adshow';

// Export EditMode (can be shared or exported from each panel)
export type EditMode = 'add' | 'edit';

interface EditAdShowPanelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: EditMode;
  initialData: AdShowOption | null; // The AdShowOption being edited, or null for add
  onSaveSuccess: () => void;          // Callback to trigger refresh in parent
}

// --- Placeholder API Function for Ad Show Option ---
const saveAdShowOptionApi = async (mode: EditMode, data: { name: string }, id?: string | number): Promise<any> => {
    console.log(`API: ${mode === 'add' ? 'Adding' : `Updating ID ${id}`}`, data);
    await new Promise(resolve => setTimeout(resolve, 750)); // Simulate delay
    if (data.name.toLowerCase() === 'fail') throw new Error("Simulated save error for Ad Show Option!");
    const newItemData = { ...data, id: id ?? `as_${Date.now()}` }; // Use prefix for new IDs potentially
    // --- Simulate saving to localStorage ---
    try {
        const currentDataString = localStorage.getItem('mockAdShowOptions');
        const currentData = currentDataString ? JSON.parse(currentDataString) : [];
        let updatedData;
        if (mode === 'add') { updatedData = [...currentData, newItemData]; }
        else { updatedData = currentData.map((item: any) => item.id === id ? newItemData : item); }
        localStorage.setItem('mockAdShowOptions', JSON.stringify(updatedData));
    } catch (e) { console.error("Error updating localStorage for AdShowOptions", e); }
    // --- End localStorage simulation ---
    return { success: true, data: newItemData };
}
// ---

const EditAdShowPanel: React.FC<EditAdShowPanelProps> = ({ isOpen, onClose, mode, initialData, onSaveSuccess }) => {
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const panelTitle = mode === 'add' ? 'Add New Ad Show Option' : 'Edit Ad Show Option';

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
        setError("Name cannot be empty.");
        setIsSaving(false);
        return;
    }

    const saveData = { name }; // Data structure for the API
    const itemId = mode === 'edit' ? initialData?.id : undefined;

    try {
      await saveAdShowOptionApi(mode, saveData, itemId);
      onSaveSuccess(); // Notify parent to refresh
      onClose();       // Close panel
    } catch (err: any) {
      console.error("Failed to save Ad Show Option:", err);
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
      <div className={`fixed inset-y-0 right-0 z-50 w-4/5 max-w-md transform overflow-y-auto bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} role="dialog" aria-modal="true" aria-labelledby="panel-title-ad-show">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 id="panel-title-ad-show" className="text-xl font-semibold text-gray-800">{panelTitle}</h2>
            <button onClick={onClose} disabled={isSaving} className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50" aria-label="Close panel"> <FiX size={22} /> </button>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} id="ad-show-form" className="flex-grow space-y-4">
            <div>
              <label htmlFor="ad-show-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              {/* Using a simple input here, could be textarea if needed */}
              <input
                type="text"
                id="ad-show-name"
                name="name"
                value={name}
                disabled={isSaving}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full p-4 rounded-[5px] bg-[#e1e1e1] border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                placeholder="e.g., Standard Visibility"
              />
            </div>
            {/* Add other fields like Description here if needed */}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
          {/* Footer Button */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <button
              type="submit"
              form="ad-show-form"
              disabled={isSaving}
              className="w-full rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : (mode === 'add' ? 'Add Ad Show Option' : 'Save Changes')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAdShowPanel;