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
import './sidebar.css'

interface NavLink {
  id: number;
  text: string;
  icon: React.ReactNode;
  link: string;
}

const navLinks: NavLink[] = [
  { id: 1, text: 'Dashboard', icon: <RxDashboard />, link: '/admin/dashboard' },
  { id: 2, text: 'Logo', icon: <FiDatabase />, link: '/admin/logo' },
  { id: 3, text: 'Product', icon: <FiDatabase />, link: '/admin/products' },
  { id: 4, text: 'Services', icon: <AiOutlineCustomerService />, link: '/admin/services' },
  { id: 5, text: 'Advertisement', icon: <IoMdHeadset />, link: '/admin/advertisement' },
  { id: 6, text: 'Users', icon: <FaRegUser />, link: '/admin/users' },
  { id: 7, text: 'Email List', icon: <TbTransferIn />, link: '/admin/email-list' },
  { id: 8, text: 'Product Categories', icon: <IoIosList />, link: '/admin/product-categories' },
  { id: 9, text: 'About Us', icon: <GoStop />, link: '/admin/about-us' },
  { id: 10, text: 'Change Password', icon: <BiSolidEdit />, link: '/admin/change-password' },
  // { id: 11, text: 'Log out', icon: <IoSettingsOutline />, link: '/admin/logout' },

];

const Sidebar = () => {
  const pathname = usePathname();
  
  return (
    <div id='sidebar' className="sidebar-container overflow-y-hidden hover:overflow-y-auto scrollbar-hide h-full">
      <div className="profile-section sticky top-0 bg-white p-6">
        {/* <div className=""> */}
          <Image 
            src={Logo} 
            alt="Profile" 
            width={200} 
            height={200}
            priority
          />
        {/* </div> */}
      </div>
      
      <ul className="nav-list">
        {navLinks.map((link) => (
          <li 
            key={link.id}
            className={`nav-item ${pathname === link.link ? 'active-nav-item' : ''}`}
          >
            <span className="nav-icon">{link.icon}</span>
            <Link href={link.link} className="nav-link">
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
      
      <Link 
        href='/admin/logout' 
        className="logout-button"
      >
        <span className="logout-icon"><BiLogOut /></span> 
        Log out
      </Link>
    </div>
  );
};

export default Sidebar;