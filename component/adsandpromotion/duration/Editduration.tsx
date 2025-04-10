// src/components/adsandpromotion/EditDurationPanel.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

// Import or define DurationOption structure
import { DurationOption } from './Duration';

// Export EditMode (can be defined once and imported, or exported from each panel)
export type EditMode = 'add' | 'edit';

interface EditDurationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: EditMode;
  initialData: DurationOption | null; // The DurationOption being edited, or null for add mode
  onSaveSuccess: () => void;         // Callback to trigger refresh in parent
}

// --- Placeholder API Function for Duration (Replace with actual API call) ---
const saveDurationApi = async (mode: EditMode, data: { label: string; valueDays: number }, id?: string | number): Promise<any> => {
    console.log(`API: ${mode === 'add' ? 'Adding' : `Updating ID ${id}`}`, data);
    await new Promise(resolve => setTimeout(resolve, 750)); // Simulate network delay
    if (data.label.toLowerCase() === 'error') throw new Error("Simulated save error for Duration!");

    const newItemData = { ...data, id: id ?? Date.now() };
    // --- Simulate saving to localStorage for demo ---
    try {
        const currentDataString = localStorage.getItem('mockDurations');
        const currentData = currentDataString ? JSON.parse(currentDataString) : [];
        let updatedData;
        if (mode === 'add') { updatedData = [...currentData, newItemData]; }
        else { updatedData = currentData.map((item: any) => item.id === id ? newItemData : item); }
        localStorage.setItem('mockDurations', JSON.stringify(updatedData));
    } catch (e) { console.error("Error updating localStorage for Durations", e); }
    // --- End localStorage simulation ---

    return { success: true, data: newItemData };
}
// ---

const EditDurationPanel: React.FC<EditDurationPanelProps> = ({ isOpen, onClose, mode, initialData, onSaveSuccess }) => {
  // Form state specific to Duration
  const [label, setLabel] = useState('');
  const [valueDays, setValueDays] = useState(''); // Store as string for input compatibility

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const panelTitle = mode === 'add' ? 'Add New Duration' : 'Edit Duration';

  // Effect to load initial data into form when panel opens for editing
  useEffect(() => {
    if (isOpen) {
        if (mode === 'edit' && initialData) {
            setLabel(initialData.label);
            setValueDays(String(initialData.valueDays)); // Convert number to string for input
        } else {
            // Reset form for 'add' mode
            setLabel('');
            setValueDays('');
        }
        setError(null); // Clear previous errors
        setIsSaving(false); // Reset saving state
    }
  }, [isOpen, mode, initialData]); // Rerun when these change

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const daysNumber = Number(valueDays);
    if (!label.trim()) {
        setError("Label cannot be empty.");
        return;
    }
    if (isNaN(daysNumber) || daysNumber <= 0) {
        setError("Please enter a valid number of days (greater than 0).");
        return;
    }

    setIsSaving(true);
    const saveData = { label, valueDays: daysNumber };
    const itemId = mode === 'edit' ? initialData?.id : undefined;

    try {
      await saveDurationApi(mode, saveData, itemId);
      onSaveSuccess(); // Notify parent component to refresh data
      onClose();       // Close the panel
    } catch (err: any) {
      console.error("Failed to save Duration:", err);
      setError(err.message || "Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose} aria-hidden="true"
      />

      {/* Panel Content */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-4/5 max-w-md transform overflow-y-auto bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog" aria-modal="true" aria-labelledby="panel-title-duration"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
             <h2 id="panel-title-duration" className="text-xl font-semibold text-gray-800">{panelTitle}</h2>
             <button onClick={onClose} disabled={isSaving} className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50" aria-label="Close panel"> <FiX size={22} /> </button>
           </div>
           {/* Form */}
           <form onSubmit={handleSubmit} id="duration-form" className="flex-grow space-y-4">
             {/* Label Input */}
             <div>
               <label htmlFor="duration-label" className="block text-sm font-medium text-gray-700 mb-1">Label</label>
               <input
                  type="text" id="duration-label" name="label" value={label} disabled={isSaving}
                  onChange={(e) => setLabel(e.target.value)} required
                  className="block w-full p-4 rounded-[5px] bg-[#e1e1e1] border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                  placeholder="e.g., 1 Month"
                />
             </div>
             {/* Value (Days) Input */}
             <div>
               <label htmlFor="duration-days" className="block text-sm font-medium text-gray-700 mb-1">Duration (in Days)</label>
               <input
                 type="number" id="duration-days" name="valueDays" value={valueDays} disabled={isSaving}
                 onChange={(e) => setValueDays(e.target.value)} required min="1"
                 className="block w-full p-4 rounded-[5px] bg-[#e1e1e1] border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                 placeholder="e.g., 30"
                />
             </div>
             {/* Error Display */}
             {error && <p className="text-sm text-red-600">{error}</p>}
           </form>
           {/* Footer Button */}
           <div className="mt-8 border-t border-gray-200 pt-6">
             <button type="submit" form="duration-form" disabled={isSaving} className="w-full rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed">
               {isSaving ? 'Saving...' : (mode === 'add' ? 'Add New Duration' : 'Save Changes')}
             </button>
           </div>
         </div>
       </div>
     </>
   );
 };

 export default EditDurationPanel;