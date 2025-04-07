'use client'; // Add this directive for useState and useEffect

import React, { useState, useEffect, useRef } from 'react';

// Define the type for a user object
interface User {
  id: string;
  fullName: string;
  emailUser: string;
  emailDomain: string;
  joinDate: string;
  lastLogin: string;
  permission: 'Admin' | 'User' | 'Editor';
}

// Sample data based on the image
const usersData: User[] = [
  {
    id: '001',
    fullName: 'Christine Brooks',
    emailUser: 'Christine',
    emailDomain: 'Brooks@gmail.com',
    joinDate: 'Jul 03, 2023 12:00 AM',
    lastLogin: 'Oct 09, 2024 12:00 AM',
    permission: 'Admin',
  },
  {
    id: '002',
    fullName: 'Christine Brooks',
    emailUser: 'Christine',
    emailDomain: 'Brooks@gmail.com',
    joinDate: 'Jan 29, 2020 12:00 AM',
    lastLogin: 'Sep 26, 2024 12:00 AM',
    permission: 'Admin',
  },
  {
    id: '003',
    fullName: 'Christine Brooks',
    emailUser: 'Christine',
    emailDomain: 'Brooks@gmail.com',
    joinDate: 'Jul 03, 2023 12:00 AM',
    lastLogin: 'Oct 09, 2024 12:00 AM',
    permission: 'Admin',
  },
  {
    id: '004',
    fullName: 'Christine Brooks',
    emailUser: 'Christine',
    emailDomain: 'Brooks@gmail.com',
    joinDate: 'Jan 29, 2020 12:00 AM',
    lastLogin: 'Sep 26, 2024 12:00 AM',
    permission: 'Admin',
  },
  // Add more users as needed
];

const UsersTable: React.FC = () => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  // Use separate refs for each menu button and dropdown if needed for complex positioning,
  // but for simple hide/show, one ref for the active dropdown is often sufficient for click-outside.
  const menuRef = useRef<HTMLDivElement>(null);

  // --- Action Handlers ---
  const handleToggleMenu = (userId: string, event: React.MouseEvent) => {
     event.stopPropagation();
     setOpenMenuId(prevId => (prevId === userId ? null : userId));
  };

  const handleEdit = (userId: string) => {
    console.log(`Edit user: ${userId}`);
    setOpenMenuId(null);
  };

  const handleDelete = (userId: string) => {
    console.log(`Delete user: ${userId}`);
    setOpenMenuId(null);
  };

  // --- Effect to close menu on outside click ---
   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        // Check if a menu is open AND the click is outside the menu's boundary
        if (openMenuId && menuRef.current && !menuRef.current.contains(event.target as Node)) {
             // We also need to make sure the click wasn't on the currently active toggle button
             // A common way is to check if the target element is *not* the button that opened the menu.
             // Since we don't store a ref to the button, we rely on stopPropagation in handleToggleMenu
             // and the check that the click is outside the *menu* itself.
             setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]); // Re-run effect when openMenuId changes


  // --- Render Helper ---
  const renderPermissionBadge = (permission: User['permission']) => {
    let bgColor = 'bg-gray-100';
    let textColor = 'text-gray-800';

    switch (permission) {
      case 'Admin':
        bgColor = 'bg-teal-100';
        textColor = 'text-teal-800';
        break;
      case 'Editor':
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-800';
        break;
      case 'User':
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-800';
        break;
    }

    return (
      <span
        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${bgColor} ${textColor}`}
      >
        {permission}
      </span>
    );
  };

  return (
    // Added min-h-screen back if you want the component to take full viewport height
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen w-full">
      {/* Header Section - Made responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Users</h1>
        <button className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-5 rounded-full shadow-md transition duration-150 ease-in-out">
          Add New User
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow-md rounded-lg">
         {/* Removed overflow-y-hidden here - this was likely causing the cutoff */}
        <div className="overflow-x-auto"> {/* Keep horizontal scroll for wide content */}
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                {/* ID - Always visible */}
                <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">ID</th>
                {/* Full Name - Always visible */}
                <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                {/* Email - Always visible (adjust padding for small screens) */}
                <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
                {/* Join Date - Hidden on small screens (below md) */}
                <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Join Date</th>
                 {/* Last Login - Hidden on small screens (below md) */}
                <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Last Login</th>
                {/* Permission - Always visible (adjust padding) */}
                <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission</th>
                 {/* Actions - Always visible */}
                <th scope="col" className="relative px-4 md:px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usersData.map((user, index) => ( // Added index for potential dynamic positioning if needed
                <tr key={user.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                  {/* ID */}
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                   {/* Full Name */}
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.fullName}</td>
                  {/* Email */}
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-600">
                    <div>{user.emailUser}</div>
                    <div className="text-xs text-gray-500">{user.emailDomain}</div>
                  </td>
                  {/* Join Date - Hidden on small screens */}
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.joinDate}</td>
                  {/* Last Login - Hidden on small screens */}
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.lastLogin}</td>
                  {/* Permission */}
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {renderPermissionBadge(user.permission)}
                  </td>
                  {/* Actions */}
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    <button
                      onClick={(e) => handleToggleMenu(user.id, e)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-gray-100" // Added padding/rounding for easier clicking
                      aria-haspopup="true"
                      aria-expanded={openMenuId === user.id}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>

                    {/* Dropdown Menu - Adjusted positioning slightly */}
                    {openMenuId === user.id && (
                      <div
                        ref={menuRef} // Assign ref to the currently open menu
                        // Added 'top-full' to position below the button, adjusted right positioning
                        className="origin-top-right absolute right-4 top-full mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-[#ddd] ring-opacity-5 focus:outline-none z-50"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby={`menu-button-${user.id}`} // Better accessibility
                      >
                        <div className="py-1" role="none">
                          <button
                            onClick={() => handleEdit(user.id)}
                            className="text-gray-700 block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            role="menuitem"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            role="menuitem"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;