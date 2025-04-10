// src/app/admin/categories/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import CategoryList, { Category } from '../../../component/categories/CategoryList';
import EditCategoryModal from '../../../component/categories/EditCategoryModal';

// --- Placeholder API Functions ---
const MOCK_CATEGORIES_KEY = 'mockCategories';

const fetchCategories = async (): Promise<Category[]> => {
  console.log("Fetching categories...");
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network delay
  try {
    const storedData = localStorage.getItem(MOCK_CATEGORIES_KEY);
    if (storedData) {
      console.log("Found categories in localStorage");
      return JSON.parse(storedData);
    }
  } catch (e) { console.error("Error reading categories from localStorage", e); }

  console.log("Using default categories data");
  // Default data matching the image structure
  return [
    { id: 'cat1', name: 'Health', parentName: 'Parent' },
    { id: 'cat2', name: 'Journalism', parentName: 'Parent' },
    { id: 'cat3', name: 'Wellness', parentName: 'Parent' },
    { id: 'cat4', name: 'Inspiration', parentName: 'Parent' },
    { id: 'cat5', name: 'Food & Nutrition', parentName: 'Parent' },
    { id: 'cat6', name: 'Science & Technology', parentName: 'Parent' },
    { id: 'cat7', name: 'Entertainment', parentName: 'Parent' },
  ];
};

const saveCategoriesToStorage = (data: Category[]) => {
    try {
        localStorage.setItem(MOCK_CATEGORIES_KEY, JSON.stringify(data));
    } catch (e) { console.error("Error saving categories to localStorage", e); }
};

// Simulates saving an individual category update
const saveCategoryApi = async (id: string | number, data: Omit<Category, 'id'>): Promise<Category> => {
    console.log(`API: Updating category ID ${id}`, data);
    await new Promise(resolve => setTimeout(resolve, 700)); // Simulate save delay

    // Simulate potential save error
    if (data.name.toLowerCase() === 'error') {
        throw new Error("Simulated save error!");
    }

    // --- Simulate updating localStorage ---
    try {
        const currentDataString = localStorage.getItem(MOCK_CATEGORIES_KEY);
        const currentData: Category[] = currentDataString ? JSON.parse(currentDataString) : [];
        let categoryExists = false;
        const updatedData = currentData.map((item: Category) => {
            if (item.id === id) {
                categoryExists = true;
                return { ...item, ...data }; // Merge updates
            }
            return item;
        });

        if (!categoryExists) {
             // Handle case where ID might not be found (e.g., if it was deleted concurrently)
             console.warn(`Category with ID ${id} not found for update.`);
             // Depending on requirements, you might throw an error or handle differently
             // For now, let's just return the input data as if it was saved (though it wasn't)
             // In a real app, the backend would handle this consistency.
             // We still need to return *something* matching the expected Promise<Category> type
             return { ...data, id: id };
        }


        saveCategoriesToStorage(updatedData);
        const savedItem = updatedData.find(item => item.id === id);
        if (!savedItem) throw new Error("Updated item not found after save simulation."); // Should not happen
        return savedItem;

    } catch (e) {
        console.error("Error updating localStorage for category", e);
        throw new Error("Failed to update data storage.");
    }
    // --- End localStorage simulation ---
};


// Simulates deleting a category
const deleteCategoryApi = async (id: string | number): Promise<{ success: boolean }> => {
    console.log(`API: Deleting category ID ${id}`);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delete delay

    // Simulate potential delete error (e.g., trying to delete a specific ID)
    if (id === 'cat1') { // Example: Prevent deleting 'Health'
        // throw new Error("Simulated delete error: Cannot delete core category.");
        console.warn("Simulated delete prevention for ID:", id)
        return { success: false }; // Indicate failure without throwing an error
    }

    // --- Simulate updating localStorage ---
    try {
        const currentDataString = localStorage.getItem(MOCK_CATEGORIES_KEY);
        const currentData: Category[] = currentDataString ? JSON.parse(currentDataString) : [];
        const updatedData = currentData.filter((item: Category) => item.id !== id);

        // Check if anything was actually deleted
        if (currentData.length === updatedData.length) {
             console.warn(`Category with ID ${id} not found for deletion.`);
             // Decide how to handle: return success: false or true?
             // Let's return true as the item is not present anyway.
             return { success: true };
        }


        saveCategoriesToStorage(updatedData);
        return { success: true };
    } catch (e) {
        console.error("Error updating localStorage for category deletion", e);
        throw new Error("Failed to update data storage during deletion.");
    }
    // --- End localStorage simulation ---
};

// --- End Placeholder API Functions ---


const CategoryManagementPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Fetch initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCategories();
        setCategories(data);
        // Save fetched/default data to storage if it wasn't already there
        if (!localStorage.getItem(MOCK_CATEGORIES_KEY)) {
            saveCategoriesToStorage(data);
        }
      } catch (err: any) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []); // Empty dependency array means run once on mount

  const handleEdit = useCallback((category: Category) => {
    console.log("Editing category:", category);
    setEditingCategory(category);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback(async (categoryId: string | number) => {
    // Optional: Add a confirmation dialog here
    if (!window.confirm(`Are you sure you want to delete this category?`)) {
      return;
    }

    console.log("Deleting category ID:", categoryId);
    // Basic loading/disabled state could be added here if deletion takes time
    try {
        const result = await deleteCategoryApi(categoryId);
        if (result.success) {
            // Update state by filtering out the deleted category
            setCategories(prevCategories => prevCategories.filter(cat => cat.id !== categoryId));
            console.log("Category deleted successfully from state.");
        } else {
             // Handle API returning success: false (e.g., show a message)
             alert("Could not delete the category (simulated prevention).");
        }
    } catch (err: any) {
        console.error("Failed to delete category:", err);
        alert(`Error deleting category: ${err.message}`); // Show error to user
    }
  }, []); // Empty dependency array, relies on categories state closure correctly


  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingCategory(null); // Clear editing state when closing
  }, []);

  const handleSave = useCallback(async (updatedData: Omit<Category, 'id'>) => {
    if (!editingCategory) return; // Should not happen if modal is open correctly

    console.log("Saving category ID:", editingCategory.id, "with data:", updatedData);
    // No need to set isSaving here, modal handles its internal state

    // Call the simulated API
    const savedCategory = await saveCategoryApi(editingCategory.id, updatedData);

    // Update the state
    setCategories(prevCategories =>
      prevCategories.map(cat =>
        cat.id === editingCategory.id ? { ...cat, ...savedCategory } : cat // Use saved data which includes ID
      )
    );
    console.log("Category updated successfully in state.");
    // Modal will close itself via its onSave promise resolution -> onClose()
  }, [editingCategory]); // Dependency on editingCategory


  return (
    <div className="p-4 md:p-6 lg:p-8 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Product Categories</h1>

        {/* Button to add new category (optional, not shown in image) */}
        {/*
        <div className="mb-4">
            <button
                // onClick={handleAddNew} // Need an add handler similar to edit
                className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700"
            >
                Add New Category
            </button>
        </div>
        */}


      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        error={error}
      />

      {/* Render the modal */}
      <EditCategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave} // Pass the save handler
        initialData={editingCategory}
        // Pass available categories if using a dropdown for parent selection
        // availableParents={categories}
      />
    </div>
  );
};

export default CategoryManagementPage;