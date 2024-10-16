'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import Lottie from 'lottie-react';
import login from "@/assets/login.json";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from '@/redux/slices/userSlice';

const LoginPage = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const dispatch = useDispatch();
  const userRedux = useSelector((state: any) => state.user.loggedInUser);

  const onLogIn = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/users/login', user);

      if (res.data && res.data.user) {
        console.log("API response user:", res.data.user);
        dispatch(setLoggedInUser(res.data.user)); // Dispatch user to Redux

        toast.success("Login successful");
        // Push to home page after successful login
        router.push('/');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);

  useEffect(() => {
    if (userRedux) {
      console.log("Logged in Redux state:", userRedux);
    }
  }, [userRedux]);

  return (
    <div className='min-h-screen flex items-center justify-center px-[1%] lg:px-[2.5%] '>
      <div className={`shadow-xl flex flex-col md:flex-row items-center justify-between p-2 md:p-4 w-full md:w-3/4 xl:w-3/5 mx-auto rounded-md md:gap-12`}>
        <div>
          <Lottie animationData={login} className="h-[18rem] md:h-[20rem]" />
        </div>
        <div className='w-4/5 md:w-3/5 flex flex-col items-center gap-4'>
          <h2 className='text-blue-500 text-2xl lg:text-3xl font-bold'>Log In</h2>

          <div className='flex flex-col gap-4 w-full xl:w-3/4'>
            <Input
              type='email'
              required={true}
              size="md"
              label="Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

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
            onClick={onLogIn}
            size="lg"
            color={btnDisabled ? 'default' : 'primary'}
            className="w-full shadow-lg text-base lg:text-md xl:w-3/4"
          >
            Login
          </Button>

          <h2>Don't have an account? <Link href="/signup" className='text-blue-500 cursor-pointer font-bold'>Sign Up</Link></h2>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
