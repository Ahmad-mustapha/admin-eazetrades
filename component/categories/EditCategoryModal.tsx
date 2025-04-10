// src/components/categories/EditCategoryModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { Category } from './CategoryList'; // Import the Category interface

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (categoryData: Omit<Category, 'id'>) => Promise<void>; // Expects a promise for async handling
  initialData: Category | null;
  // Optional: Pass existing categories for parent selection dropdown
  // availableParents?: Category[];
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  // availableParents = [],
}) => {
  const [categoryName, setCategoryName] = useState('');
  const [parentNameInput, setParentNameInput] = useState(''); // Simple text input based on image
  // const [selectedParentId, setSelectedParentId] = useState<string | number | null>(null); // For dropdown approach
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && initialData) {
      setCategoryName(initialData.name);
      setParentNameInput(initialData.parentName ?? ''); // Set parent name from initial data
      // For dropdown:
      // setSelectedParentId(initialData.parentId ?? null);
      setError(null); // Reset error on open
      setIsSaving(false); // Reset saving state
    } else if (!isOpen) {
      // Optionally reset fields when closing if not saving
      setCategoryName('');
      setParentNameInput('');
      // setSelectedParentId(null);
    }
  }, [isOpen, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) {
        setError('Category name cannot be empty.');
        return;
    }

    setError(null);
    setIsSaving(true);

    // NOTE: Using parentNameInput directly. A real app should resolve this
    // input to a parentId if possible, or handle it server-side.
    const saveData: Omit<Category, 'id'> = {
        name: categoryName.trim(),
        parentName: parentNameInput.trim() || null, // Store null if empty
        // parentId: selectedParentId, // From dropdown approach
    };

    try {
        await onSave(saveData);
        onClose(); // Close modal on successful save
    } catch (err: any) {
        console.error("Failed to save category:", err);
        setError(err.message || "An error occurred while saving.");
    } finally {
        setIsSaving(false);
    }
  };

  // Basic modal structure (no transitions for simplicity, add if needed)
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-category-title"
    >
      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
        {/* Optional Header */}
        <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-200">
           <h2 id="edit-category-title" className="text-lg font-semibold text-gray-800">
              Edit Category
            </h2>
            <button
                onClick={onClose}
                disabled={isSaving}
                className="p-1 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
                aria-label="Close modal"
            >
                <FiX size={20} />
            </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
            <div className="p-4 sm:p-6 space-y-5">
                {/* Parent Input - Using text input based on image */}
                <div>
                    <label htmlFor="category-parent" className="block text-sm font-medium text-gray-700 mb-1">
                        Parent
                    </label>
                    <input
                        type="text"
                        id="category-parent"
                        name="parent"
                        value={parentNameInput}
                        onChange={(e) => setParentNameInput(e.target.value)}
                        disabled={isSaving}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100 py-2.5 px-3.5"
                        placeholder="Enter parent category name (or leave blank)"
                    />
                    {/* Alternative: Dropdown for parent selection
                    <select
                        id="category-parent-select"
                        name="parentId"
                        value={selectedParentId ?? ''}
                        onChange={(e) => setSelectedParentId(e.target.value || null)}
                        disabled={isSaving}
                        className="..."
                    >
                        <option value="">-- No Parent --</option>
                        {availableParents
                            .filter(p => p.id !== initialData?.id) // Prevent self-parenting
                            .map(parent => (
                                <option key={parent.id} value={parent.id}>{parent.name}</option>
                            ))
                        }
                    </select>
                    */}
                </div>

                {/* Category Name Input */}
                <div>
                    <label htmlFor="category-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <input
                        type="text"
                        id="category-name"
                        name="category"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                        disabled={isSaving}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100 py-2.5 px-3.5"
                        placeholder="Enter category name"
                    />
                </div>

                 {error && <p className="text-sm text-red-600">{error}</p>}
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end items-center gap-x-4 px-4 py-4 sm:px-6 border-t border-gray-200 bg-gray-50">
                <button
                    type="button" // Important: type="button" to prevent form submission
                    onClick={onClose}
                    disabled={isSaving}
                    className="rounded-full px-6 py-2.5 text-sm font-semibold border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSaving}
                    className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;