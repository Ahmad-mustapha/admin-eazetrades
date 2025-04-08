'use client';

import { useState } from "react";
import MobileSidebar from "../sidebar/MobileSidebar";
import { CiSearch } from "react-icons/ci";
import { GoBellFill } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import Logo from '../../public/sellereazetradelogo.png';


const Header = () => {
  const [ openNav, setOpenNav ] = useState(false)
  
  const toggleMobileMenu = () => {
    setOpenNav(!openNav);
  };

  const closeMobileMenu = () => {
    setOpenNav(false);
  }

  return (
    <div className="z-50 h-[5rem] bg-white shadow-md fixed w-full top-0 py-6 px-6 sm:px-8 flex items-center justify-between text-[#444444]">
      <div>
        <div className="hidden sm:flex flex-col">
          <p className="text-[24px] font-[500]">Administrator</p>
          <p>Last login: Jan 01, 1970 12:00 AM</p>
        </div>
        <div className="block sm:hidden border-b border-gray-200 bg-white p-4">
          <Link href="/admin/dashboard">
            <Image
              src={Logo}
              alt="Sellereaze Trade Logo"
              width={180} // Adjusted width
              height={50} // Adjusted height for typical logo aspect ratio
              priority
              // style={{ width: 'auto', height: 'auto', maxWidth: '180px' }} // Max width for responsiveness
            />
          </Link>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2 mr-[310px] md:mr-[300px] ">
        <div className="flex items-center gap-2">
          <CiSearch className="text-[20px]"/>
          <div className="relative flex items-center"><GoBellFill className="text-[20px]"/><span className="absolute">2</span></div>
        </div>
        <div className="flex items-center gap-2">
          <Image 
          width={44}
          height={44}
          className="rounded-full"
          src='/adminprofile.png' alt="" />
          <span className="text-left text-[14px] font-[700]">Shammah <br /> Ray</span>
          <span className="p-1 rounded-full border-[1px] border-black"><IoIosArrowDown className="text-[.8rem]"/></span>
        </div>
      </div>
      <div className={`z-50 fixed top-8 right-[2rem] flex lg:hidden flex-col gap-2 cursor-pointer`} onClick={toggleMobileMenu}>
        <p className={`block w-8 h-[3px] rounded-md bg-[#000] transition-transform duration-500 ${openNav? 'rotate-45 translate-y-[12px]': ''}`}></p>
        <p className={`block w-8 h-[3px] rounded-md bg-[#000] transition-transform duration-500 ${openNav? 'opacity-0': 'opacity-100'}`}></p>
        <p className={`block w-8 h-[3px] rounded-md bg-[#000] transition-transform duration-500 ${openNav? '-rotate-45 -translate-y-[8px]': ''}`}></p>
      </div>
      <MobileSidebar isOpen={openNav} onClose={closeMobileMenu}/>
      <div 
        className={`${openNav ? 'bg-transparent backdrop-blur-[10px] h-screen w-full fixed left-0 top-0 z-40': 'hidden'}`}
        onClick={() => setOpenNav(false)}
      ></div>
    </div>
    // <div>Header</div>
  )
}

export default Header