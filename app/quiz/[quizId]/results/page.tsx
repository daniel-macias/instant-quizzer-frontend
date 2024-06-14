"use client";
import React, { useState, useEffect } from 'react';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import { useRouter } from 'next/navigation';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { IconX, IconCheck } from '@tabler/icons-react';
import Loader from '@/components/ui/loader';

interface ResultsPageProps {
    params: {
        quizId: string;
    };
}

export default function ResultsPage({ params }: ResultsPageProps) {
    const router = useRouter();
    const { quizId } = params;
    const [quiz, setQuiz] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`https://instant-quizzer-backend.onrender.com/api/quizzes/${quizId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setQuiz(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch quiz:', err);
                setError('Failed to load results');
                setLoading(false);
            });
    }, [quizId]);

    if (loading) {
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Loader />
          </div>
        );
      }
    if (error) return <p>Error: {error}</p>;

    if (!quiz || quiz.results.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h2 className="text-xl font-normal text-center mb-4 text-gray-800">There are no results... yet!</h2>
                <button onClick={() => router.push(`/quiz/${quizId}`)} className="p-2 bg-maci-main-normal text-white rounded hover:bg-maci-main-dark transition-colors duration-200">Click here to take the quiz</button>
            </div>
        );
    }

    return (
        <BackgroundWrapper>
                <h1 className="text-xl font-normal text-center mb-4 text-black">Quiz Results for: {quiz.quizTitle}</h1>
                <div className="w-full max-w-4xl mx-auto">
                    <Accordion type="single" collapsible>
                        {quiz.results.map((result: any, index: number) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-lg font-medium bg-white shadow p-4 text-black">{result.personName}</AccordionTrigger>
                                <AccordionContent className="bg-white p-4 shadow rounded text-black">
                                    {quiz.questions.map((question: any, qIndex: number) => (
                                        <div key={qIndex} className=" flex items-center py-2 border-b">
                                            {question.questionTitle}: <span className={result.responses[qIndex] ? 'text-maci-submit-dark' : 'text-maci-cancel-normal'}>
                                                {result.responses[qIndex] ? <IconCheck /> : <IconX />}
                                            </span>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                    <div className="text-center">
                    <button onClick={() => router.push(`/quiz/${quizId}`)} className="mt-4 shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,40%)] px-8 py-2 bg-maci-main-normal text-[#fff] rounded-md font-light transition duration-200 ease-linear">Take the quiz!</button>
                    </div>
                </div>
        </BackgroundWrapper>
    );
}
