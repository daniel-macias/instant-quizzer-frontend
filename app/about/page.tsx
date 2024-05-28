"use client"
import React from 'react';

import { useRouter } from 'next/navigation';
import BackgroundWrapper from '@/components/ui/background-wrapper';

const QuizPage: React.FC = () => {
    const router = useRouter();

    return (
      <BackgroundWrapper>
            <h1 className="text-3xl font-light text-center mb-4 text-gray-800">Quick Quiz Maker</h1>
            <p className="text-xl text-center mb-8 text-gray-600 font-light">
                A fast quiz creator for teachers and casual users.
            </p>
            <button onClick={() => router.push('/creator')} className="w-full shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,40%)] px-8 py-2 bg-maci-submit-dark text-[#fff] rounded-md font-light transition duration-200 ease-linear mb-4 text-xl">
                Create Quiz
            </button>
            <div className="flex w-full space-x-4">
              <button onClick={() => router.push('/demos')} className="flex-1 shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,40%)] px-8 py-2 bg-diving-dove text-[#fff] rounded-md font-light transition duration-200 ease-linear">
                  Examples
              </button>
              <button onClick={() => router.push('/about')} className="flex-1 shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,40%)] px-8 py-2 bg-soaring-eagle text-[#fff] rounded-md font-light transition duration-200 ease-linear">
                  About
              </button>
            </div>
      </BackgroundWrapper>
      
    );
};

export default QuizPage;
