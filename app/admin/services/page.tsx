// components/ServiceList.tsx
'use client'; // If using onClick handlers in App Router

import React from 'react';
import Image from 'next/image'; // Use Next.js Image component for optimization
import { FiEdit } from 'react-icons/fi'; // Edit Icon
import { BsTrash } from 'react-icons/bs'; // Trash Icon

// types/product-list.ts (or define within the component file)
export interface ServiceListItem {
  id: string;
  imageUrl: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  colors: string[]; // Array of hex color codes or Tailwind color classes
}


export const servicesListData: ServiceListItem[] = [
  {
    id: 'prod-001',
    imageUrl: '/phone.png', // Replace with your actual image paths
    name: 'Apple Watch Series 4',
    category: 'Digital Product',
    price: 63000,
    quantity: 63,
    colors: ['#000000', '#D3D3D3', '#FFA07A'], // Black, LightGray, LightSalmon
  },
  {
    id: 'prod-002',
    imageUrl: '/phone.png',
    name: 'Microsoft Headsquare',
    category: 'Digital Product',
    price: 34000,
    quantity: 13,
    colors: ['#000000', '#FFA07A', '#87CEEB', '#FFD700'], // Black, LightSalmon, SkyBlue, Gold
  },
  {
    id: 'prod-003',
    imageUrl: '/phone.png',
    name: "Women's Dress",
    category: 'Fashion',
    price: 6400,
    quantity: 635,
    colors: ['#800080', '#87CEEB', '#000080', '#0000FF'], // Purple, SkyBlue, Navy, Blue
  },
  {
    id: 'prod-004',
    imageUrl: '/phone.png',
    name: 'Samsung A50',
    category: 'Mobile',
    price: 44000,
    quantity: 67,
    colors: ['#000080', '#000000', '#DC143C'], // Navy, Black, Crimson
  },
   {
    id: 'prod-005',
    imageUrl: '/phone.png',
    name: 'Camera',
    category: 'Electronic',
    price: 42000,
    quantity: 52,
    colors: ['#000080', '#000000', '#DC143C'], // Navy, Black, Crimson
  },
   {
    id: 'prod-006',
    imageUrl: '/phone.png', // Assuming different image or same
    name: 'Microsoft Headsquare',
    category: 'Digital Product',
    price: 43000,
    quantity: 13,
    colors: ['#000000', '#FFA07A', '#87CEEB', '#FFD700'], // Black, LightSalmon, SkyBlue, Gold
  },
  {
    id: 'prod-007',
    imageUrl: '/phone.png', // Assuming different image or same
    name: "Women's Dress",
    category: 'Fashion',
    price: 43000, // Corrected price from thought process
    quantity: 635,
    colors: ['#800080', '#87CEEB', '#000080', '#0000FF'], // Purple, SkyBlue, Navy, Blue
  },
  // Add more products as needed
];

// Helper function to format currency (Nigerian Naira - NGN)
export const formatProductPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Component to render color swatches
const ColorSwatches: React.FC<{ colors: string[] }> = ({ colors }) => {
  return (
    <div className="flex items-center space-x-1">
      {colors.map((color, index) => (
        <span
          key={index}
          className="block h-4 w-4 rounded-full border border-gray-200"
          style={{ backgroundColor: color }} // Use inline style for dynamic hex colors
          title={color} // Show hex code on hover (optional)
        ></span>
      ))}
    </div>
  );
};

const ServiceList: React.FC = () => {
  // Action Handlers (replace with actual logic)
  const handleAddNewService = () => {
    console.log('Add New Product clicked');
  };

  const handleEditProduct = (productId: string) => {
    console.log(`Edit product: ${productId}`);
  };

  const handleDeleteProduct = (productId: string) => {
    console.log(`Delete product: ${productId}`);
    // Add confirmation logic here
  };

  return (
    <div className='pt-10'>
      <div className="flex md:justify-end mb-4">
        <button
          onClick={handleAddNewService}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-3 rounded-[100px] transition duration-150 ease-in-out text-sm"
        >
          Add New Services
        </button>
      </div>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="py-3 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Service Name</th>
                <th className="py-3 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="py-3 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="py-3 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="py-3 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Available Color</th>
                <th className="py-3 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {servicesListData.map((product) => (
                <tr key={product.id}>
                  <td className="py-3 px-3 align-middle">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={48} // Corresponds to h-12 w-12
                      height={48}
                      className="h-12 w-12 object-cover rounded-md"
                      unoptimized={process.env.NODE_ENV === 'development'} // Helpful if using placeholder images locally
                    />
                  </td>
                  <td className="py-3 px-3 text-sm font-medium text-gray-800 align-middle whitespace-nowrap">{product.name}</td>
                  <td className="py-3 px-3 text-sm text-gray-600 align-middle whitespace-nowrap">{product.category}</td>
                  <td className="py-3 px-3 text-sm text-gray-600 align-middle whitespace-nowrap">{formatProductPrice(product.price)}</td>
                  <td className="py-3 px-3 text-sm text-gray-600 align-middle">{product.quantity}</td>
                  <td className="py-3 px-3 align-middle">
                    <ColorSwatches colors={product.colors} />
                  </td>
                  <td className="py-3 px-3 align-middle">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEditProduct(product.id)}
                        className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
                        aria-label="Edit Product"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
                        aria-label="Delete Product"
                      >
                        <BsTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       {/* Optional: Add pagination controls here if needed */}
      </div>
    </div>
  );
};

export default ServiceList;