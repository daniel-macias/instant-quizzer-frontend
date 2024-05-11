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

const handleQuizSubmission = (questions: Quiz['questions']) => {
    // Calculate results
    const results = questions.map(question => {
        const userAnswers = question.userAnswers;
        const correctAnswers = question.correctAnswers;
        const isCorrect = correctAnswers.every((answerIndex) => userAnswers[answerIndex]) && 
                          userAnswers.every((answered, index) => answered === correctAnswers.includes(index));
        return { question: question.question, isCorrect };
    });

    // Here you can now set state to display results, or handle them as needed
    console.log(results);
};

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
                            correctAnswers: q.correctAnswers,
                            userAnswers: new Array(q.possibleAnswers.length).fill(false)
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
        <div className="flex flex-col items-center justify-center w-full py-4 bg-gray-100 min-h-screen">
            <h1 className="text-xl font-bold text-center my-4 text-black">{quiz?.title}</h1>
            {quiz && <QuestionCard questions={quiz.questions} onSubmit={handleQuizSubmission} />}
        </div>
    );
};

export default QuizPage;
