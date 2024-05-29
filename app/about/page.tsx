"use client"
import React from 'react';

import { useRouter } from 'next/navigation';
import BackgroundWrapper from '@/components/ui/background-wrapper';

const QuizPage: React.FC = () => {
    const router = useRouter();

    return (
      <BackgroundWrapper>
            <h1 className="text-3xl font-light text-center mb-4 text-gray-800">About</h1>
            <p className="text-xl text-center mb-8 text-gray-600 font-light">
                Quick Quiz Maker
            </p>
            <p className="text-xl text-center mb-8 text-gray-600 font-light">
            This app was created by me, Daniel Macías! It is intended primarily as a portfolio piece. However, if it proves useful to users, I plan to further develop and enhance its features in the future.

If you find any bugs or wish to contact me for any reason, visit my web page. Thanks! 
            </p>
            <button onClick={() => router.push('https://www.maciasreynaud.com/')} className="shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,40%)] px-8 py-2 bg-maci-submit-dark text-[#fff] rounded-md font-light transition duration-200 ease-linear mb-4 text-xl">
                My Portfolio
            </button>
            
      </BackgroundWrapper>
      
    );
};

export default QuizPage;
