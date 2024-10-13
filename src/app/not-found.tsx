"use client";
import Lottie from "lottie-react";
import error from "../assets/error-animation.json";
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation'; // Use useRouter instead of redirect for button action
import React from 'react';

export default function NotFound() {
  const router = useRouter(); // Initialize useRouter hook

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie animationData={error} className="h-[32rem]" />
      <h2 className="text-2xl lg:text-5xl font-bold text-blue-600 mb-2">404 - Page Not Found</h2>
      <p className="text-md lg:text-lg text-gray-600 mb-8">
        Sorry, the page you are looking for doesn't exist.
      </p>
      <Button
        size="lg"
        color="primary"
        onClick={() => router.push('/')}
        className="shadow-lg text-md lg:text-lg"
      >
        Go Home
      </Button>
    </div>
  );
}

