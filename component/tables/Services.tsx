// components/serviceTable.tsx
'use client' // Needed for useState and event handlers
import React, { useState } from 'react'; // Import useState
import { HiEllipsisVertical } from 'react-icons/hi2';

// --- (Keep types, data, helper functions StatusBadge, formatCurrency the same) ---
type ServiceStatus = 'Approved' | 'Denial' | 'Reorder';

interface Service {
  id: string;
  serviceName: string;
  amount: number;
  status: ServiceStatus;
}

const servicesData: Service[] = [
  { id: '001', serviceName: 'Apparel', amount: 3000, status: 'Approved' },
  { id: '002', serviceName: 'Apparel', amount: 1000, status: 'Denial' },
  { id: '003', serviceName: 'Electronics', amount: 5000, status: 'Approved' },
  { id: '004', serviceName: 'Electronics', amount: 5000, status: 'Approved' },
  { id: '005', serviceName: 'Electronics', amount: 2000, status: 'Reorder' },
];

const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
};

const StatusBadge: React.FC<{ status: ServiceStatus }> = ({ status }) => {
    let bgColor = '';
    let textColor = '';
    let dotColor = '';

    switch (status) {
      case 'Approved':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        dotColor = 'bg-green-500';
        break;
      case 'Denial':
      case 'Reorder':
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
        dotColor = 'bg-red-500';
        break;
      default:
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
        dotColor = 'bg-gray-500';
    }

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor}`}
      >
        <span className={`w-2 h-2 mr-2 rounded-full ${dotColor}`}></span>
        {status}
      </span>
    );
};
// --- (End of unchanged parts) ---


const ServiceTable: React.FC = () => {
  // State to track the ID of the product whose menu is hovered/open
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Function to toggle the menu for a specific product ID
  const toggleMenu = (productId: string) => {
    setOpenMenuId(prevId => (prevId === productId ? null : productId));
  };

  // Specific action handlers (replace console.log with actual logic)
  const handleEdit = (productId: string) => {
    console.log(`Editing product ID: ${productId}`);
    setOpenMenuId(null); // Close menu after action
  };

  const handleDelete = (productId: string) => {
    console.log(`Deleting product ID: ${productId}`);
    // Add confirmation logic here if needed
    setOpenMenuId(null); // Close menu after action
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg border border-[#EAECF0] shadow-sm h-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Services</h2>
      <div className="overflow-x-hidden hover:overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border-t border-dotted border-gray-300">
          <thead className="bg-gray-50/50">
            <tr>
              {/* Keep table headers the same */}
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Item ID</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Product name</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Amount</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {servicesData.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50 transition-colors duration-150">
                {/* Keep other table cells the same */}
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.id}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{service.serviceName}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{formatCurrency(service.amount)}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500"><StatusBadge status={service.status} /></td>

                {/* Action Cell - Modified for Click Menu */}
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center relative">
                  {/* Container - onMouseLeave still useful to close if mouse moves away after opening */}
                  <div
                    className="inline-block"
                    onMouseLeave={() => setOpenMenuId(null)} // Optional: Close menu when mouse leaves the area
                   >
                    {/* Action Button - Changed to onClick */}
                    <button
                      onClick={() => toggleMenu(service.id)} // Use onClick to toggle menu
                      className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                      aria-haspopup="true"
                      aria-expanded={openMenuId === service.id}
                      aria-label={`Actions for ${service.serviceName}`}
                    >
                      <HiEllipsisVertical className="h-5 w-5" aria-hidden="true" />
                    </button>

                    {/* Conditional Action Menu (remains the same) */}
                    {openMenuId === service.id && (
                      <div
                        className="origin-top-right absolute right-0 mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20 py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby={`actions-menu-button-${service.id}`}
                      >
                        <button
                          onClick={() => handleEdit(service.id)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-800"
                          role="menuitem"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceTable;