// src/components/layout/MobileSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { RxDashboard, RxCross1 } from "react-icons/rx";
import { FiDatabase } from "react-icons/fi";
import { TbTransferIn } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineCustomerService } from "react-icons/ai";
import { IoMdHeadset } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { IoIosList } from "react-icons/io";
import { GoStop } from "react-icons/go";
import { BiSolidEdit } from "react-icons/bi";
import Logo from '../../public/sellereazetradelogo.png';

interface NavLink {
  id: number;
  text: string;
  icon: React.ReactNode;
  link: string;
}

// Consider moving this to a shared constants file if used elsewhere
const navLinks: NavLink[] = [
    { id: 1, text: 'Dashboard', icon: <RxDashboard size={20}/>, link: '/admin/dashboard' },
    { id: 2, text: 'Logo', icon: <FiDatabase size={20}/>, link: '/admin/logo' },
    { id: 3, text: 'Product', icon: <FiDatabase size={20}/>, link: '/admin/products' },
    { id: 4, text: 'Services', icon: <AiOutlineCustomerService size={20}/>, link: '/admin/services' },
    { id: 5, text: 'Advertisement', icon: <IoMdHeadset size={20}/>, link: '/admin/advertisement' },
    { id: 6, text: 'Users', icon: <FaRegUser size={20}/>, link: '/admin/users' },
    { id: 7, text: 'Email List', icon: <TbTransferIn size={20}/>, link: '/admin/email-list' },
    { id: 8, text: 'Product Categories', icon: <IoIosList size={20}/>, link: '/admin/product-categories' },
    { id: 9, text: 'About Us', icon: <GoStop size={20}/>, link: '/admin/about-us' },
    { id: 10, text: 'Change Password', icon: <BiSolidEdit size={20}/>, link: '/admin/change-password' },
];

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void; // Use onClose callback instead of passing the setter directly
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  // Close sidebar when a link is clicked
  const handleLinkClick = () => {
    onClose();
  };

  // Prevent clicks inside the sidebar from closing it via the overlay
  const handleSidebarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-in-out lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose} // Close when clicking overlay
        aria-hidden="true"
      ></div>

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 max-w-[80%] transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={handleSidebarClick} // Prevent closing when clicking inside
      >
        <div className="flex h-full flex-col overflow-y-auto">
          {/* Header with Logo and Close Button */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <div className="w-36"> {/* Adjust width as needed */}
                <Image
                  src={Logo}
                  alt="Logo"
                  width={150}
                  height={150}
                  priority
                  style={{ width: 'auto', height: 'auto' }} // Maintain aspect ratio
                />
            </div>
            {/* <button
              onClick={onClose}
              className="rounded-md p-1 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-label="Close menu"
            >
              <RxCross1 size={24} />
            </button> */}
          </div>

          {/* Navigation List */}
          <nav className="mt-4 flex-grow px-2">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.link}
                    onClick={handleLinkClick} // Close on link click
                    className={`group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-150 ease-in-out ${
                      pathname === link.link
                        ? 'bg-indigo-50 text-indigo-700' // Active styles
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900' // Default styles
                    }`}
                  >
                    <span className={`transition-colors duration-150 ease-in-out ${pathname === link.link ? 'text-indigo-600' : 'text-gray-500 group-hover:text-gray-600'}`}>
                       {link.icon}
                    </span>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button at the bottom */}
          <div className="mt-auto border-t border-gray-200 p-2">
             <Link
                href='/admin/logout'
                onClick={handleLinkClick} // Close on link click
                className="group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
             >
                <BiLogOut size={20} className="text-red-500 group-hover:text-red-600" />
                Log out
             </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;