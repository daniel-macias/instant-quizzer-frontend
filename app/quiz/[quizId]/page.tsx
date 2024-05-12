"use client"
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import QuestionCard from '@/components/QuestionCard';
import { IconX, IconCheck } from '@tabler/icons-react';

interface Quiz {
    id: string;
    title: string;
    questions: {
        question: string;
        options: string[];
        correctAnswers: number[];
        userAnswers: boolean[]; 
    }[];
}

enum QuizState {
    InputName,
    TakingQuiz,
    ViewingResults
}



const QuizPage: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const quizId = pathname.split('/')[2]; // Split and access the third segment
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [quizState, setQuizState] = useState<QuizState>(QuizState.InputName);
    const [takerName, setTakerName] = useState('');
    const [results, setResults] = useState<any[]>([]);

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

    const handleQuizSubmission = (questions: Quiz['questions']) => {
        // Calculate results
        const results = questions.map(question => {
            const userAnswers = question.userAnswers;
            const correctAnswers = question.correctAnswers;
            const isCorrect = correctAnswers.every((answerIndex) => userAnswers[answerIndex]) && 
                              userAnswers.every((answered, index) => answered === correctAnswers.includes(index));
            return { question: question.question, isCorrect };
        });
    
        setQuizState(QuizState.ViewingResults);
        setResults(results);
        console.log(results);
    };

    const handleStartQuiz = () => {
        if (!takerName) {
            alert('Please enter your name before starting the quiz.');
            return;
        }
        setQuizState(QuizState.TakingQuiz);
    };

    const handleViewResults = () => {
        router.push(`/quiz/${quizId}/results`);
    };

    if (loading) return <p>Loading...</p>;
    if (!quiz) return <p>No quiz found for ID: {quizId}</p>;

    switch (quizState) {
        case QuizState.InputName:
            return (
                <div className="flex flex-col items-center justify-center w-full py-4 bg-gray-100 min-h-screen">
                    <h1 className="text-xl font-bold text-center my-4 text-black">{quiz.title}</h1>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={takerName}
                        onChange={(e) => setTakerName(e.target.value)}
                        className="mb-4 p-2 border border-gray-300 rounded text-black"
                    />
                    <button onClick={handleStartQuiz} className="mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Start Quiz</button>
                    <button onClick={handleViewResults} className="p-2 bg-green-500 text-white rounded hover:bg-green-600">View Results</button>
                </div>
            );
        case QuizState.TakingQuiz:
            return (
                <div className="flex flex-col items-center justify-center w-full py-4 bg-gray-100 min-h-screen">
                    <h1 className="text-xl font-bold text-center my-4 text-black">{quiz.title}</h1>
                    <QuestionCard questions={quiz.questions} onSubmit={handleQuizSubmission} />
                </div>
            );
            case QuizState.ViewingResults:
                return (
                    <div className="flex flex-col items-center justify-center w-full py-4 bg-gray-100 min-h-screen">
                        <h1 className="text-xl font-bold text-center my-4 text-black">Immediate Results</h1>
                        <ul>
                        {results.map((result, index) => (
                            <li key={index} className="text-black flex items-center">
                                <span>{result.question}:</span>
                                <span className={`${result.isCorrect ? 'text-green-500' : 'text-red-500'} flex items-center ml-2`}>
                                    {result.isCorrect ? <IconCheck /> : <IconX />}
                                </span>
                            </li>
                        ))}
                        </ul>
                        <button onClick={handleViewResults} className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">View Full Results</button>
                    </div>
                );
    }
};

export default QuizPage;
