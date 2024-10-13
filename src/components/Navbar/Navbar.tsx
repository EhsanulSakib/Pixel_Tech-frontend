"use client";
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoSunnySharp, IoReorderThreeOutline } from "react-icons/io5";
import { BsMoonStarsFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { usePathname } from 'next/navigation';
const Navbar = () => {
  //useStates
  const [theme, setTheme] = useState<string>('light');
  const [open, setOpen] = useState<boolean>(false);

  //router
  const pathname = usePathname();

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
    <div className={`fixed w-full shadow-md top-0 ${theme == 'light' ? 'bg-slate-50' : 'bg-slate-800'}`}>
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

        <div className='flex gap-2'>
          <button
            id="theme-toggle"
            className="text-xl"
            onClick={toggleTheme}
          >
            {theme === 'light' ? <BsMoonStarsFill /> : <IoSunnySharp />}
          </button>

          <Link href={'/login'}><Button size="md" radius='full' color='primary' className='text-md font-bold'>Login</Button></Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;