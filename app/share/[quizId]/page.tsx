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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-xl font-bold text-center mb-4 text-black">Congrats! Your quiz has been created successfully.</h1>
            <p className="text-center mb-4 text-black">Copy the following link and share it with someone else so they can take the quiz:</p>
            <div className="flex flex-col items-center w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
                <input
                    type="text"
                    value={quizLink}
                    readOnly
                    onClick={(event) => event.currentTarget.select()}
                    className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
                />
                <button onClick={handleCopyToClipboard} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200">Copy to clipboard</button>
            </div>
        </div>
    );
};

export default ShareQuizPage;
