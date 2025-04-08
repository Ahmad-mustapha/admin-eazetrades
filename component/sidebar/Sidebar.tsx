'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { RxDashboard } from "react-icons/rx";
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
// Removed import for sidebar.css if you are fully using Tailwind now
// If you still use sidebar.css for some base styles, keep the import

interface NavLink {
  id: number;
  text: string;
  icon: React.ReactNode;
  link: string;
}

// Define navLinks - Make sure icon sizes are consistent if desired
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

const Sidebar = () => {
  const pathname = usePathname();

  // Removed the outer unnecessary div from previous correction
  // Apply flex column layout, full height, and background directly here
  return (
    <div className="hdden md:flex h-full flex-col bg-white"> {/* Main container: full height, flex column */}

      {/* Logo Section - Stays at the top */}
      {/* Added border-b for visual separation */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4">
        <Link href="/admin/dashboard">
            <Image
              src={Logo}
              alt="Sellereaze Trade Logo"
              width={180} // Adjusted width
              height={50} // Adjusted height for typical logo aspect ratio
              priority
              style={{ width: 'auto', height: 'auto', maxWidth: '180px' }} // Max width for responsiveness
            />
        </Link>
      </div>

      {/* Navigation List - This part will scroll */}
      {/* flex-grow makes it take available space */}
      {/* overflow-y-auto enables scrolling ONLY for this section */}
      <nav className="flex-grow hover:overflow-y px-4 py-4">
        <ul className="space-y-1"> {/* Using space-y for consistent spacing */}
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.link}
                // Applying Tailwind classes for styling and active state
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

      {/* Logout Button - Stays at the bottom */}
      {/* Added border-t for visual separation */}
      <div className="mt-auto border-t border-gray-200 p-4"> {/* mt-auto is redundant due to flex-grow on nav, but doesn't hurt */}
         <Link
            href='/admin/logout'
            className="group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
         >
            <BiLogOut size={20} className="text-red-500 group-hover:text-red-600" />
            Log out
         </Link>
      </div>
    </div>
  );
};

export default Sidebar;