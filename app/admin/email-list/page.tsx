// src/app/admin/email-list/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react'; // Added useEffect, useRef for dropdown
import { FiChevronLeft, FiChevronRight, FiTrash2, FiEye } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';

// --- Data definitions (UserEmail, NewsletterEmail, registeredUsersData, newsletterEmailsData) ---
interface UserEmail {
  id: string;
  name: string;
  email: string;
}

interface NewsletterEmail {
  id: string;
  email: string;
}

const registeredUsersData: UserEmail[] = [
    { id: '001', name: 'Christine Brooks', email: 'Brooks@gmail.com' },
    { id: '002', name: 'Christine Brooks', email: 'Brooks@gmail.com' },
    { id: '003', name: 'Christine Brooks', email: 'Brooks@gmail.com' },
    { id: '004', name: 'Christine Brooks', email: 'Brooks@gmail.com' },
    { id: '005', name: 'Long Name Example', email: 'areallylongemailaddresstotestwrapping@example.com' },
];

const newsletterEmailsData: NewsletterEmail[] = [
    { id: '001', email: 'Christine@example.com' },
    { id: '002', email: 'Brooks@gmail.com' },
    { id: '003', email: 'Another@domain.net' },
    { id: '004', email: 'Test@email.co' },
];
// --- End Placeholder Data ---

// --- Reusable Table Component ---
interface TableProps<T> {
  title: string;
  // Corrected type for headers key: Must be 'actions' or a key of T
  headers: { key: 'actions' | keyof T; label: string; className?: string }[];
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

function EmailTable<T extends { id: string }>({ // Ensure T always has an id
  title,
  headers,
  data,
  renderRow,
  currentPage,
  itemsPerPage,
  totalItems,
}: TableProps<T>) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

  return (
    <div className="mb-8">
      <div className="overflow-hidden rounded-lg bg-white shadow">
         <h2 className="px-4 pt-4 pb-2 text-lg font-semibold text-gray-800">{title}</h2>
        <div className="overflow-x-auto sm:overflow-x-hidden">
          <table className="min-w-full w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header) => (
                  <th
                    // Use String() conversion for key as it might be a symbol if keyof T is used more broadly
                    key={String(header.key)}
                    scope="col"
                    className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 ${header.className || ''}`}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.length > 0 ? (
                data.map((item, index) => renderRow(item, index))
              ) : (
                <tr>
                  <td colSpan={headers.length} className="px-4 py-4 text-center text-gray-500">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
       <div className="flex items-center justify-between px-1 py-3">
            <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startItem}</span>-
                <span className="font-medium">{endItem > 0 ? endItem : 0}</span> of{' '}
                <span className="font-medium">{totalItems}</span>
            </p>
            <div className="inline-flex items-center space-x-1 rounded-md bg-white shadow-sm">
                <button disabled={currentPage === 1} className="rounded-l-md border border-gray-300 p-1.5 text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50" aria-label="Previous" > <FiChevronLeft className="h-5 w-5" /> </button>
                <button disabled={endItem >= totalItems} className="rounded-r-md border border-gray-300 p-1.5 text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50" aria-label="Next" > <FiChevronRight className="h-5 w-5" /> </button>
            </div>
       </div>
    </div>
  );
}

// --- Dropdown Menu Component ---
interface DropdownAction {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
}

interface DropdownMenuProps {
  actions: DropdownAction[];
  onClose: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ actions, onClose }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          onClose();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [onClose]);

    return (
      <div
        ref={menuRef}
        className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu" aria-orientation="vertical"
      >
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => { action.onClick(); onClose(); }}
            className={`flex w-full items-center px-4 py-2 text-left text-sm ${action.className || 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
            role="menuitem"
          >
            {action.icon && <span className="mr-2">{action.icon}</span>}
            {action.label}
          </button>
        ))}
      </div>
    );
};
// --- End Dropdown Menu Component ---


// --- Main Page Component ---
const EmailList = () => {
  // --- State ---
  const [currentUserPage] = useState(1);
  const [currentNewsletterPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const itemsPerPage = 9;
  const totalRegisteredUsers = 78;
  const totalNewsletterEmails = 78;

  // --- Data Slicing ---
  const displayedRegisteredUsers = registeredUsersData.slice(0, itemsPerPage);
  const displayedNewsletterEmails = newsletterEmailsData.slice(0, itemsPerPage);

  // --- Handlers ---
  const handleActionClick = (id: string, type: 'user' | 'newsletter') => {
    const menuId = `${type}-${id}`;
    setOpenMenuId(openMenuId === menuId ? null : menuId);
  };

  const closeMenu = () => {
    setOpenMenuId(null);
  };

  const handleViewDetails = (id: string, type: 'user' | 'newsletter') => {
      alert(`View details for ${type} ID: ${id}`);
  }
  const handleDelete = (id: string, type: 'user' | 'newsletter') => {
      if (confirm(`Are you sure you want to delete ${type} ID: ${id}?`)) {
          alert(`Deleting ${type} ID: ${id}`);
      }
  }

  // --- Removed the shared tableHeaders constant ---

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="mb-6 text-[32px] font-[600] text-gray-900">Email List</h1>

      {/* Registered Users Table */}
      <EmailTable<UserEmail> // Specify UserEmail type here
        title="Registered Users"
        // Define headers inline, specific to UserEmail keys + 'actions'
        headers={[
            { key: 'id', label: 'ID', className: 'w-1/5' },
            { key: 'email', label: 'Email Address', className: 'w-3/5' },
            // 'name' is a valid keyof UserEmail, but we are not showing it
            { key: 'actions', label: '', className: 'w-1/5 text-right' },
        ]}
        data={displayedRegisteredUsers}
        currentPage={currentUserPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalRegisteredUsers}
        renderRow={(user) => {
          const menuId = `user-${user.id}`;
          const isMenuOpen = openMenuId === menuId;
          return (
            <tr key={user.id}>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500 overflow-hidden text-ellipsis">{user.id}</td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 overflow-hidden text-ellipsis">
                <div>{user.email}</div>
              </td>
              <td className="relative whitespace-nowrap px-4 py-3 text-right text-sm font-medium">
                <button
                  onClick={() => handleActionClick(user.id, 'user')}
                  className={`rounded-full p-1 ${isMenuOpen ? 'bg-gray-200 text-gray-700' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}
                  aria-expanded={isMenuOpen} aria-haspopup="true"
                  aria-label={`Actions for user ${user.id}`}
                >
                  <BsThreeDotsVertical size={18} />
                </button>
                 {isMenuOpen && (
                   <DropdownMenu
                     onClose={closeMenu}
                     actions={[
                       { label: 'View Details', onClick: () => handleViewDetails(user.id, 'user'), icon: <FiEye size={16}/> },
                       { label: 'Delete User', onClick: () => handleDelete(user.id, 'user'), icon: <FiTrash2 size={16}/>, className: 'text-red-600 hover:bg-red-50 hover:text-red-700' },
                     ]}
                   />
                 )}
              </td>
            </tr>
          );
        }}
      />

      {/* Newsletter Emails Table */}
      <EmailTable<NewsletterEmail> // Specify NewsletterEmail type here
        title="Newsletter Emails"
         // Define headers inline, specific to NewsletterEmail keys + 'actions'
         headers={[
             { key: 'id', label: 'ID', className: 'w-1/5' },
             { key: 'email', label: 'Email Address', className: 'w-3/5' },
             { key: 'actions', label: '', className: 'w-1/5 text-right' },
         ]}
        data={displayedNewsletterEmails}
        currentPage={currentNewsletterPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalNewsletterEmails}
        renderRow={(item) => {
          const menuId = `newsletter-${item.id}`;
          const isMenuOpen = openMenuId === menuId;
          return (
            <tr key={item.id}>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500 overflow-hidden text-ellipsis">{item.id}</td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 overflow-hidden text-ellipsis">
                {item.email}
              </td>
              <td className="relative whitespace-nowrap px-4 py-3 text-right text-sm font-medium">
                <button
                  onClick={() => handleActionClick(item.id, 'newsletter')}
                  className={`rounded-full p-1 ${isMenuOpen ? 'bg-gray-200 text-gray-700' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}
                  aria-expanded={isMenuOpen} aria-haspopup="true"
                  aria-label={`Actions for newsletter email ${item.id}`}
                >
                  <BsThreeDotsVertical size={18} />
                </button>
                {isMenuOpen && (
                  <DropdownMenu
                      onClose={closeMenu}
                      actions={[
                          { label: 'Delete Email', onClick: () => handleDelete(item.id, 'newsletter'), icon: <FiTrash2 size={16}/>, className: 'text-red-600 hover:bg-red-50 hover:text-red-700' },
                      ]}
                  />
                )}
              </td>
            </tr>
          );
        }}
      />
    </div>
  );
};

export default EmailList;