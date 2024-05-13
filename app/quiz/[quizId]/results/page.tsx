"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { IconX, IconCheck } from '@tabler/icons-react';

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
        fetch(`http://localhost:5177/api/quizzes/${quizId}`)
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!quiz || quiz.results.length === 0) {
        return (
            <div className="text-center">
                <p>There are no results... yet!</p>
                <button onClick={() => router.push(`/quiz/${quizId}`)} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Click here to take the quiz</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 w-full">
            <h1 className="text-xl font-bold text-center mb-4 text-black">Quiz Results for: {quiz.quizTitle}</h1>
            <div className="w-full max-w-4xl mx-auto">
                <Accordion type="single" collapsible>
                    {quiz.results.map((result: any, index: number) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-lg font-medium bg-white shadow p-4 text-black">{result.personName}</AccordionTrigger>
                            <AccordionContent className="bg-white p-4 shadow rounded text-black">
                                {quiz.questions.map((question: any, qIndex: number) => (
                                    <div key={qIndex} className=" flex items-center py-2 border-b">
                                        {question.questionTitle}: <span className={result.responses[qIndex] ? 'text-green-500' : 'text-red-500'}>
                                            {result.responses[qIndex] ? <IconCheck /> : <IconX />}
                                        </span>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
        </Accordion>
        <div className="text-center">
            <button onClick={() => router.push(`/quiz/${quizId}`)} className="p-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600">Take the quiz!</button>
        </div>
    </div>
</div>
    );
}
