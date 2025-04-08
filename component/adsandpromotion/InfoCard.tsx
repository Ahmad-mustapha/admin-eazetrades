// src/components/ui/InfoCard.tsx
'use client'; // Add this because we're using useState

import React, { useState } from 'react'; // Import useState
import { FiChevronUp, FiChevronDown, FiPlus } from 'react-icons/fi'; // Import FiChevronDown

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  onAddNew?: () => void;
  isLoading?: boolean;
  defaultOpen?: boolean; // Optional prop to set initial state
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  children,
  onAddNew,
  isLoading,
  defaultOpen = true // Default to open
}) => {
  // 1. Add state to track open/closed status
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // 2. Handler to toggle the state
  const toggleOpen = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  return (
    <div className="mb-8 overflow-hidden rounded-lg bg-white shadow"> {/* Added overflow-hidden */}
      {/* Header Section */}
      <div className="flex items-center justify-between p-6"> {/* Moved padding here */}
        <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
        {/* Button to toggle visibility */}
        <button
          onClick={toggleOpen} // Attach the handler
          className="rounded-md p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" // Added focus styles
          aria-expanded={isOpen} // Accessibility: indicate expanded state
          aria-controls={`infocard-content-${title.replace(/\s+/g, '-')}`} // Accessibility: link button to content
          aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${title}`}
        >
          {/* 4. Conditionally render Up or Down chevron */}
          {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </button>
      </div>

      {/* Content Section - Conditionally Rendered */}
      {/* Use a wrapper div for easier transition later if needed */}
      <div
        id={`infocard-content-${title.replace(/\s+/g, '-')}`} // Match aria-controls
        className={`px-6 pb-6 pt-0 transition-all duration-300 ease-in-out ${ // Adjusted padding
            isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 invisible' // Basic toggle animation
        }`}
        // Alternatively, simpler conditional rendering without animation:
        // hidden={!isOpen}
      >
        {/* Show loading indicator OR children */}
        {isLoading ? (
          <div className="flex justify-center items-center h-20">
            <p className="text-gray-500">Loading...</p> {/* Or a spinner */}
          </div>
        ) : (
          // 3. Conditionally render children div based on isOpen
          <div className="space-y-4">
            {children}
          </div>
        )}

        {/* Add New Button Section - Conditionally Rendered */}
        {/* Also depends on isOpen */}
        {isOpen && onAddNew && (
          <div className="mt-6 flex justify-center border-t border-gray-100 pt-5">
            <button
              onClick={onAddNew}
              disabled={isLoading}
              className="flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
            >
              <FiPlus size={18} className="-ml-1"/>
              Add New
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;