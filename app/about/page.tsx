"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const QuizPage: React.FC = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-maci-main-normal/[0.1] flex items-center justify-center p-4">
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-transparent to-diving-dove dark:to-white opacity-50"></div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Quick Quiz Maker</h1>
                <p className="text-xl text-center mb-8 text-gray-600">
                    Full-stack fast quiz creator for educational and casual users.
                </p>
                <button onClick={() => router.push('/creator')} className="w-full p-3 mb-4 bg-maci-main-normal text-white rounded hover:bg-maci-main-dark transition-colors duration-200 text-lg font-medium">
                    Create Quiz
                </button>
                <button onClick={() => router.push('/demos')} className="w-full p-3 mb-4 bg-maci-submit-dark text-white rounded hover:bg-maci-submit-darker transition-colors duration-200 text-lg font-medium">
                    View Examples
                </button>
                <button onClick={() => router.push('/about')} className="w-full p-3 mb-4 bg-soaring-eagle text-white rounded hover:bg-wizard-grey transition-colors duration-200 text-lg font-medium">
                    About
                </button>
            </div>
        </div>
    );
};

export default QuizPage;
