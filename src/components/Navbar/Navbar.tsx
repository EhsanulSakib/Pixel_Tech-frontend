"use client";
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoSunnySharp, IoReorderThreeOutline } from "react-icons/io5";
import { BsMoonStarsFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import Image from 'next/image';
const Navbar = () => {
  //useStates
  const [theme, setTheme] = useState<string>('light');
  const [open, setOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  //router
  const pathname = usePathname();

  //redux
  const loggedInUser = useSelector((state: any) => state.user.loggedInUser);


  const navLinks =
    [
      {
        name: 'Home',
        route: '/'
      },
      {
        name: 'All Products',
        route: '/all-products'
      },
      {
        name: 'Contact',
        route: '/contact'
      }
    ]

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);

      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement;

      if (theme === 'light') {
        setTheme('dark');
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        setTheme('light');
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  };

  return (
    <div className={`z-50 fixed w-full shadow-md top-0 bg-slate-50 text-slate-800 dark:bg-slate-800 dark:text-slate-50`}>
      <div className={`max-w-[2048px] mx-auto py-2 px-[1%] lg:px-[2.5%] flex justify-between items-center`}>
        <div className='flex gap-1 items-center justify-center'>
          <button className='text-3xl lg:hidden' onClick={() => setOpen(!open)}>{open ? <RxCross2 /> : <IoReorderThreeOutline />}</button>
          <h4 className='text-2xl font-bold text-blue-600'>Pixel Tech</h4>
        </div>

        <div className={`absolute top-[57px] py-4 lg:py-0 transition-all duration-500 lg:static w-3/4 h-screen lg:h-auto ${open ? 'left-0' : '-left-[100%]'} ${theme == 'light' ? 'bg-slate-50' : 'bg-slate-800  border-gray-700'} border-r-1 shadow-lg lg:shadow-none lg:border-none lg:bg-transparent lg:block`}>
          <ul className='flex flex-col lg:flex-row items-center justify-center gap-4'>
            {
              navLinks.map((link, index) => (
                <li key={index} className={`font-semibold cursor-pointer hover:duration-300 hover:border-b hover:border-blue-600 ${pathname === link.route ? 'text-blue-600' : ''}`}>
                  <Link href={link.route}>{link.name}</Link>
                </li>
              ))
            }
          </ul>
        </div>

        <div className='relative flex gap-2'>
          <button
            id="theme-toggle"
            className="text-xl"
            onClick={toggleTheme}
          >
            {theme === 'light' ? <BsMoonStarsFill /> : <IoSunnySharp />}
          </button>

          {
            loggedInUser ?
              <img
                src={loggedInUser?.profilePicture}
                alt="profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setProfileOpen(!profileOpen)}
              />
              :
              <Link href='/login'>
                <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Login</button>
              </Link>
          }

          <div className={`absolute duration-300 bg-white dark:bg-slate-800 dark:text-white shadow-md rounded-lg px-2 py-4 right-0 min-w-24 flex flex-col items-center gap-1 font-bold ${profileOpen ? 'top-11' : '-top-60'}`}>

            <Link href='/profile'>
              <p className='cursor-pointer hover:text-blue-500'>Profile</p>
            </Link>

            <button className='cursor-pointer hover:text-red-500' onClick={() => localStorage.clear()}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;