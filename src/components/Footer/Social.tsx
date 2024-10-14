import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';

const Social = () => {
  return (
    <div className='w-full flex flex-col gap-16 justify-between'>
      <div className='flex flex-col items-start lg:items-end'>
        <h3 className='mb-4 text-2xl lg:text-3xl font-bold'>Follow Us</h3>
        <p className='text-md lg:text-lg text-primary-200 mb-4 text-semibold'>Get in touch with us on social media.</p>

        <div className='flex gap-4 text-3xl lg:text-4xl'>
          <Link href="https://www.instagram.com/" target='_blank'><FaInstagram /></Link>
          <Link href="https://www.facebook.com/" target='_blank'><FaFacebook /></Link>
          <Link href="https://www.x.com/" target='_blank'><FaXTwitter /></Link>
          <Link href="https://www.whatsapp.com/" target='_blank'><FaWhatsapp /></Link>
        </div>
      </div>

      <div className='flex flex-col items-start lg:items-end'>
        <h3 className='text-4xl font-bold'>Pixel Tech</h3>
        <p className='text-md lg:text-lg text-primary-200 mt-4'>Copyright © 2023 Pixel Tech. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Social;