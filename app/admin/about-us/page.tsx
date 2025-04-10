// components/AboutUsTable.tsx
'use client';

import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi'; // Using Feather icons from react-icons

// Define the structure of each data item using a TypeScript interface
interface AboutUsItem {
  id: string;
  titled: string;
  featuredName: string;
  featuredEmail: string;
}

// Sample data matching the structure (replace with your actual data source/fetch)
const aboutUsData: AboutUsItem[] = [
  { id: '001', titled: 'Christine Brooks', featuredName: 'Christine', featuredEmail: 'Brooks@gmail.com' },
  { id: '002', titled: 'Christine Brooks', featuredName: 'Christine', featuredEmail: 'Brooks@gmail.com' },
  { id: '003', titled: 'Christine Brooks', featuredName: 'Christine', featuredEmail: 'Brooks@gmail.com' },
  { id: '004', titled: 'Christine Brooks', featuredName: 'Christine', featuredEmail: 'Brooks@gmail.com' },
  { id: '005', titled: 'Christine Brooks', featuredName: 'Christine', featuredEmail: 'Brooks@gmail.com' },
  { id: '005', titled: 'Christine Brooks', featuredName: 'Christine', featuredEmail: 'Brooks@gmail.com' },
  { id: '005', titled: 'Christine Brooks', featuredName: 'Christine', featuredEmail: 'Brooks@gmail.com' },
  { id: '005', titled: 'Christine Brooks', featuredName: 'Christine', featuredEmail: 'Brooks@gmail.com' },
  { id: '005', titled: 'Christine Brooks', featuredName: 'Christine', featuredEmail: 'Brooks@gmail.com' },
  { id: '005', titled: 'Christine Brooks', featuredName: 'Christine', featuredEmail: 'Brooks@gmail.com' },
];

const AboutUsTable: React.FC = () => {
  // Placeholder functions for actions - implement your logic here
  const handleEdit = (id: string) => {
    console.log('Edit item with ID:', id);
    // Add your navigation or modal logic here
  };

  const handleDelete = (id: string) => {
    console.log('Delete item with ID:', id);
    // Add your confirmation and deletion logic here
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 p-6">About Us</h1>
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titled
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {aboutUsData.map((item) => (
                <tr key={item.id + Math.random()} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.titled}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div>{item.featuredName}</div>
                    <div className="text-xs text-gray-500">{item.featuredEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(item.id)}
                        aria-label={`Edit ${item.titled}`}
                        className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                         onClick={() => handleDelete(item.id)}
                         aria-label={`Delete ${item.titled}`}
                         className="p-1.5 border border-gray-300 rounded text-red-500 hover:bg-red-50 hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Optional: Add Pagination Controls Here */}
        {/* <div className="p-4 border-t border-gray-200">
          Pagination...
        </div> */}
      </div>
    </div>
  );
};

export default AboutUsTable;