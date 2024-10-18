"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("")
  const user = useSelector((state: any) => state.user.loggedInUser)

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/profile')
      console.log(res.data)
      setData(res.data)

    } catch (error: any) {
      toast.error(error.message)
      console.log(error.message)
    }
  }

  const logout = async () => {
    try {
      const res = await axios.get('/api/users/logout')
      toast.success("User Logged Out")
      console.log(res.data)
      router.push('/')
    } catch (error: any) {
      toast.error(error.message)
      console.log(error.message)
    }
  }

  console.log(user)

  return (
    <div>
      <div className='min-h-screen flex items-center justify-between px-[1%] lg:px-[2.5%]'>

      </div>

    </div>
  );
};