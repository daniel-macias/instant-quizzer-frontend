"use client"
import React, { useState } from 'react';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

interface ShareQuizPageProps {
    params: {
        quizId: string;
    };
}

const ShareQuizPage: React.FC<ShareQuizPageProps> = ({ params }) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [popoverMessage, setPopoverMessage] = useState('');
    const quizLink = `http://localhost:3000/quiz/${params.quizId}`;

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(quizLink).then(() => {
            setPopoverMessage('Link copied to clipboard!');
            setPopoverOpen(true);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            setPopoverMessage('Failed to copy text to clipboard!');
            setPopoverOpen(true);
        });
    };

    return (
        <BackgroundWrapper>
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
                <button onClick={handleCopyToClipboard} className="px-4 py-2 bg-maci-main-normal text-white rounded hover:bg-maci-main-dark transition-colors duration-200">Copy to clipboard</button>
            </div>
            {popoverOpen && (
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                        <button className="hidden">Open</button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <p className="text-black">{popoverMessage}</p>
                    </PopoverContent>
                </Popover>
            )}
        </BackgroundWrapper>
    );
};

export default ShareQuizPage;
