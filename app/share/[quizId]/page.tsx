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
        <div>
            <h1>Congrats! Your quiz has been created successfully.</h1>
            <p>Copy the following link and share it with someone else so they can take the quiz:</p>
            <div>
                <input
                    type="text"
                    value={quizLink}
                    readOnly
                    onClick={(event) => event.currentTarget.select()}
                    className="w-full mb-4 p-2 border rounded text-black"
                />
                <button onClick={handleCopyToClipboard}>Copy to clipboard</button>
            </div>
        </div>
    );
};

export default ShareQuizPage;
