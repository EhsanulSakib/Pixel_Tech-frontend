'use client';
import axios from 'axios';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import verify from "@/assets/verify.json";
import { Button } from '@nextui-org/react';

function VerifyEmailPage() {
  const [token, setToken] = useState<string>('');
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post('/api/users/verifyEmail', { token });
      console.log(res);
      setVerified(true);
      setError(false);
    }
    catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');

    // const { query }: any = router
    // const urlToken = query.token;
    // setToken(urlToken || '');
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token])

  return (
    <div className='min-h-screen flex items-center justify-center px-[1%] lg:px-[2.5%]'>
      <div className={`shadow-xl flex flex-col items-center justify-between px-2 py-8 md:px-4 md:py-12 w-full md:w-3/4 mx-auto rounded-md gap-4 md:gap-6`}>
        <div>
          <Lottie loop={false} animationData={verify} className="h-[18rem] md:h-[20rem]" />
        </div>
        <h2 className='text-xl lg:text-2xl font-bold'>
          {token ? "User verified successfully" : "Invalid token"}
        </h2>

        <h2>
          {verified === true ? "User verified successfully" : "Invalid token"}
        </h2>

        <Button
          size="lg"
          disabled={verified}
          color={verified ? "primary" : "default"}
          onClick={() => router.push('/')}
          className="shadow-lg text-md lg:text-lg cursor-pointer"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}

export default VerifyEmailPage