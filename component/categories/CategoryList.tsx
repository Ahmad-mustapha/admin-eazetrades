// src/components/categories/CategoryList.tsx
import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export interface Category {
  id: string | number;
  name: string;
  parentName: string | null; // Name of the parent category, null if top-level
  // parentId?: string | number | null; // Optional: Useful for actual data structures
}

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string | number) => void;
  isLoading?: boolean;
  error?: string | null;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onEdit,
  onDelete,
  isLoading = false,
  error = null,
}) => {
  if (isLoading) {
    return <p className="text-center text-gray-500 py-4">Loading categories...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 py-4">{error}</p>;
  }

  if (!categories || categories.length === 0) {
    return <p className="text-center text-gray-500 py-4">No categories found.</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider w-2/5">Category</h3>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider w-2/5">Parent</h3>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider text-right w-1/5">Actions</h3>
        </div>

        {/* Body */}
        <div className="divide-y divide-gray-100">
            {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                {/* Category Name */}
                <div className="w-2/5">
                    <p className="text-sm font-medium text-indigo-600">{category.name}</p>
                </div>

                {/* Parent Name */}
                <div className="w-2/5">
                    <p className="text-sm text-gray-700">{category.parentName ?? <span className="text-gray-400 italic">None</span>}</p>
                    {/* In a real app, you might fetch the parent name based on parentId */}
                </div>

                {/* Action Buttons */}
                <div className="w-1/5 flex justify-end space-x-2">
                    <button
                        onClick={() => onEdit(category)}
                        className="p-1.5 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        aria-label={`Edit ${category.name}`}
                    >
                        <FiEdit2 size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(category.id)}
                        className="p-1.5 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        aria-label={`Delete ${category.name}`}
                    >
                        <FiTrash2 size={18} />
                    </button>
                </div>
            </div>
            ))}
      </div>
    </div>
  );
};

export default CategoryList;