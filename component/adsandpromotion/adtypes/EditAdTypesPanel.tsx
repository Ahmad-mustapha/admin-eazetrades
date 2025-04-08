// src/components/adsandpromotion/EditAdTypePanel.tsx (or your actual path)
'use client';

import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

// Import or define AdType structure
import { AdType } from './Adtype'; // Assuming AdType is exported from AdTypeCard.tsx in the same dir

// === EXPORT the type ===
export type EditMode = 'add' | 'edit';
// === End Export ===

interface EditAdTypePanelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: EditMode; // Use the exported type
  initialData: AdType | null;
  onSaveSuccess: () => void;
}

// --- Placeholder API Function (Keep as before) ---
const saveAdTypeApi = async (mode: EditMode, data: { name: string; price: number; currency: string }, id?: string | number): Promise<any> => { /* ... */ };
// ---

const EditAdTypePanel: React.FC<EditAdTypePanelProps> = ({ isOpen, onClose, mode, initialData, onSaveSuccess }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const panelTitle = mode === 'add' ? 'Add New Ad Type' : 'Edit Ad Type';

  useEffect(() => {
    if (isOpen) {
        if (mode === 'edit' && initialData) {
            setName(initialData.name);
            setPrice(String(initialData.price));
        } else {
            setName('');
            setPrice('');
        }
        setError(null);
        setIsSaving(false);
    }
  }, [isOpen, mode, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    const priceNumber = Number(price);
    if (isNaN(priceNumber) || priceNumber < 0) {
        setError("Please enter a valid positive price.");
        setIsSaving(false);
        return;
    }

    const saveData = { name, price: priceNumber, currency: 'NGN' };
    const itemId = mode === 'edit' ? initialData?.id : undefined;

    try {
      await saveAdTypeApi(mode, saveData, itemId);
      onSaveSuccess();
      onClose();
    } catch (err: any) {
      console.error("Failed to save Ad Type:", err);
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
        role="dialog" aria-modal="true" aria-labelledby="panel-title"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
             <h2 id="panel-title" className="text-xl font-semibold text-gray-800">{panelTitle}</h2>
             <button onClick={onClose} disabled={isSaving} className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50" aria-label="Close panel"> <FiX size={22} /> </button>
           </div>
           {/* Form */}
           <form onSubmit={handleSubmit} id="ad-type-form" className="flex-grow space-y-4"> {/* Added ID */}
             {/* Form Fields... */}
             <div>
               <label htmlFor="ad-name" className="block text-sm font-medium text-gray-700 mb-1">Ad Name</label>
               <input type="text" id="ad-name" name="name" value={name} disabled={isSaving} onChange={(e) => setName(e.target.value)} required className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100" placeholder="e.g., Sponsored Post" />
             </div>
             <div>
               <label htmlFor="ad-price" className="block text-sm font-medium text-gray-700 mb-1">Price (NGN)</label>
               <input type="number" id="ad-price" name="price" value={price} disabled={isSaving} onChange={(e) => setPrice(e.target.value)} required min="0" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100" placeholder="e.g., 10000" />
             </div>
             {error && <p className="text-sm text-red-600">{error}</p>}
           </form>
           {/* Footer Button */}
           <div className="mt-8 border-t border-gray-200 pt-6">
             <button type="submit" form="ad-type-form" disabled={isSaving} className="w-full rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed">
               {isSaving ? 'Saving...' : (mode === 'add' ? 'Add New Ad Type' : 'Save Changes')}
             </button>
           </div>
         </div>
       </div>
     </>
   );
 };

 export default EditAdTypePanel;