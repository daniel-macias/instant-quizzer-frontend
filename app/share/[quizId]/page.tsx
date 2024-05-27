"use client"
import React from 'react';

interface ShareQuizPageProps {
    params: {
        quizId: string;
    };
}

const ShareQuizPage: React.FC<ShareQuizPageProps> = ({ params }) => {
    const quizLink = `http://localhost:3000/quiz/${params.quizId}`;

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(quizLink).then(() => {
            alert('Link copied to clipboard!'); 
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-maci-main-normal/[0.1] flex items-center justify-center p-4">
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-transparent to-diving-dove dark:to-white opacity-50"></div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
            <h1 className="text-xl font-bold text-center mb-4 text-black">Congrats! Your quiz has been created successfully.</h1>
            <p className="text-center mb-4 text-black">Copy the following link and share it with someone else so they can take the quiz:</p>
            <div className="flex flex-col items-center w-full max-w-md p-4 bg-maci-main-normal shadow-lg rounded-lg">
                <input
                    type="text"
                    value={quizLink}
                    readOnly
                    onClick={(event) => event.currentTarget.select()}
                    className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
                />
                <button onClick={handleCopyToClipboard} className="px-4 py-2 bg-maci-main-normal text-white rounded hover:bg-maci-main-dark transition-colors duration-200">Copy to clipboard</button>
            </div>
        </div>
        </div>
    );
};

export default ShareQuizPage;
