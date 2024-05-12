"use client"
import React from 'react';

interface ResultsPageProps {
    params: {
        quizId: string;
    };
}

export default function ResultsPage({ params }: ResultsPageProps) {
    const { quizId } = params;
    console.log('Quiz ID:', quizId);

    return (
        <div>
        <h1>Quiz Results for Quiz ID: {quizId}</h1>
        </div>
    );
}