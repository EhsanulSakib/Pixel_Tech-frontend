import React from 'react';
import Report from './Report';
import Social from './Social';

const Footer = () => {
  return (
    <div className='bg-blue-500 py-12 text-white w-full flex justify-between gap-12 flex-col lg:flex-row px-[1%] lg:px-[2.5%]'>
      <Report />
      <Social />
    </div>


  );
};

export default Footer;