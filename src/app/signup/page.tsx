'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import Lottie from 'lottie-react';
import signup from "@/assets/signup.json";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';

const SignUpPage = () => {
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
  })
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter()

  const onSignUp = async () => {
    try {
      setLoading(true)
      const res = await axios.post('/api/users/signup', user)
      console.log("SignUp successful", res.data)
      toast.success("Signup successful")
      router.push('/login')
      setLoading(false)
    }
    catch (error: any) {
      const errorMessage = error.response.data?.error || "Signup failed"
      toast.error(errorMessage)
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (user.userName.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setBtnDisabled(false)
    }
    else {
      setBtnDisabled(true)
    }
  }, [user])

  return (
    <div className='min-h-screen flex items-center justify-center px-[1%] lg:px-[2.5%] '>
      <div className={`shadow-xl flex flex-col md:flex-row items-center justify-between p-2 md:p-4 w-full md:w-3/4 xl:w-3/5 mx-auto rounded-md md:gap-12`}>
        <div>
          <Lottie animationData={signup} className="h-[18rem] md:h-[20rem]" />
        </div>
        <div className='w-4/5 md:w-3/5 flex flex-col items-center gap-4'>
          <h2 className='text-blue-500 text-2xl lg:text-3xl font-bold'>Sign Up</h2>

          <div className='flex flex-col gap-4 w-full xl:w-3/4'>
            <Input
              type='text'
              required={true}
              label="User Name"
              className='w-full'
              onChange={(e) => setUser({ ...user, userName: e.target.value })} />
            <Input
              type='email'
              required={true}
              size="md"
              label="Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })} />

            <div className='relative flex items-center'>
              <Input
                type={showPassword ? 'text' : 'password'}
                required={true}
                size="md"
                label="Password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />

              {
                showPassword ?
                  <FaEyeSlash className='text-xl absolute right-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                  :
                  <FaEye className='text-xl absolute right-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
              }
            </div>

          </div>

          <Button
            isDisabled={btnDisabled}
            isLoading={loading}
            onClick={onSignUp}
            size="lg"
            color={btnDisabled ? 'default' : 'primary'}
            className="w-full shadow-lg text-base lg:text-md xl:w-3/4"
          >
            Sign Up
          </Button>

          <h2>Already have an account? <Link href="/login" className='text-blue-500 cursor-pointer font-bold'>Login</Link></h2>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;