"use client"
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import QuestionCard from '@/components/QuestionCard';

interface Quiz {
    id: string;
    title: string;
    questions: {
        question: string;
        options: string[];
        correctAnswers: number[];  // Assuming you might want to track multiple correct answers
        userAnswers: boolean[]; 
    }[];
}

const QuizPage: React.FC = () => {
    const pathname = usePathname();
    const quizId = pathname.split('/')[2]; // Split and access the third segment
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (quizId) { // Check if quizId is defined
            fetch(`http://localhost:5177/api/quizzes/${quizId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const formattedQuiz: Quiz = {
                        id: data.id,
                        title: data.quizTitle,
                        questions: data.questions.map((q: any) => ({
                            question: q.questionTitle,
                            options: q.possibleAnswers,
                            correctAnswers: q.correctAnswers
                        }))
                    };
                    setQuiz(formattedQuiz);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching quiz:', error);
                    setLoading(false);
                });
        }
    }, [quizId]); // Depend on quizId to refetch when it changes

    if (loading) return <p>Loading...</p>;
    if (!quiz) return <p>No quiz found for ID: {quizId}</p>;

    return (
        <div>
            <h1>Quiz Page ID: {quiz?.id} - {quiz?.title}</h1>
            {quiz && <QuestionCard questions={quiz.questions} />}
        </div>
    );
};

export default QuizPage;
