"use client";
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoSunnySharp } from "react-icons/io5";
import { BsMoonStarsFill } from "react-icons/bs";

const Navbar = () => {
  //useStates
  const [theme, setTheme] = useState<string>('light');


  const navLinks: string[] = ["Home", "Products", "Contact"];


  const html = document.documentElement;

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

  return (
    <div className='py-4 flex justify-between items-center'>
      <div>
        <h4 className='text-2xl font-bold text-blue-600'>Pixel Tech</h4>
      </div>

      <div>
        <ul className='flex gap-4'>
          {
            navLinks.map((link, index) => (
              <li key={index} className="hover:text-blue-600 cursor-pointer">
                <Link href={`/${link}`}>{link}</Link>
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

        <Button size="md" radius='full' color='primary' className='text-md font-bold'>Login</Button>
      </div>
    </div>
  );
};

export default Navbar;