"use client";
import { Button, Input, Textarea } from '@nextui-org/react';
import React, { useState } from 'react';

const Report = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //call the API

    console.log(formData);
  };



  return (
    <div className='w-full'>
      <h3 className='text-2xl lg:text-3xl font-bold mb-4'>Contact Us</h3>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-full'>
        <div>
          <h3 className='text-md lg:text-lg'>Name</h3>
          <Input
            type='text'
            variant={"underlined"}
            name='name'
            id='name'
            className='text-default-200'
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <h3 className='text-md lg:text-lg'>Email</h3>
          <Input
            type='email'
            variant={"underlined"}
            name='email'
            id='email'
            value={formData.email}
            className='text-default-200'
            errorMessage="Please enter a valid email address"
            onChange={handleChange}
          />
        </div>
        <div>
          <h3 className='text-md lg:text-lg'>Message</h3>
          <Textarea
            type=''
            variant={"underlined"}
            name='message'
            id='message'
            value={formData.message}
            className='text-default-200 col-span-12 md:col-span-6 mb-6 md:mb-0'
            onChange={handleChange}
          />
        </div>

        <Button size="md" className='bg-slate-100 hover:bg-slate-50 duration-300 text-blue-500 text-lg font-bold cursor-pointer' radius='full' disabled={!formData.name || !formData.email || !formData.message} type="submit">Send</Button>
      </form>

    </div>
  );
};

export default Report;