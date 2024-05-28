"use client"
import React, { useState, useEffect } from 'react';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import { usePathname, useRouter } from 'next/navigation';
import QuestionCard from '@/components/QuestionCard';
import { IconX, IconCheck } from '@tabler/icons-react';
import Loader from '@/components/ui/loader';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

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
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    
        // Prepare the payload to send to the backend
        const payload = {
            personName: takerName,
            responses: results.map(result => result.isCorrect)
        };
        
        console.log(payload);
    
        // Send results to the backend
        fetch(`http://localhost:5177/api/quizzes/${quizId}/results`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Submission successful', data);
            setQuizState(QuizState.ViewingResults);
            setResults(results);
        })
        .catch(error => {
            console.error('Error submitting quiz results:', error);
        });
    };

    const handleStartQuiz = () => {
        if (!takerName) {
            setIsDialogOpen(true);
            return;
        }
        setQuizState(QuizState.TakingQuiz);
    };

    const handleViewResults = () => {
        router.push(`/quiz/${quizId}/results`);
    };

    if (loading) {
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Loader />
          </div>
        );
      }
    if (!quiz) return <p>No quiz found for ID: {quizId}</p>;

    switch (quizState) {
        case QuizState.InputName:
            return (
                <BackgroundWrapper>
                    <h1 className="text-xl font-bold text-center my-4 text-gray-800">{quiz.title}</h1>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={takerName}
                        onChange={(e) => setTakerName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleStartQuiz()}
                        className="mb-4 p-2 border border-gray-300 rounded text-gray-800"
                    />
                    <button onClick={handleStartQuiz} className="mb-2 p-2 bg-maci-main-normal text-white rounded hover:bg-maci-main-dark">Start Quiz</button>
                    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <AlertDialogTrigger asChild>
                            <button className="hidden">Open</button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogTitle>Please Confirm</AlertDialogTitle>
                            <AlertDialogDescription>
                                Please enter your name before starting the quiz.
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <button onClick={() => setIsDialogOpen(false)} className="bg-maci-main-normal text-white p-2 rounded hover:bg-maci-main-dark">
                                    Ok
                                </button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <button onClick={handleViewResults} className="p-2 bg-maci-submit-dark text-white rounded hover:bg-maci-submit-darker">View Results</button>
                </BackgroundWrapper>
            );
        case QuizState.TakingQuiz:
            return (
                <BackgroundWrapper>
                    <h1 className="text-xl font-bold text-center my-4 text-gray-800">{quiz.title}</h1>
                    <QuestionCard questions={quiz.questions} onSubmit={handleQuizSubmission} />
                </BackgroundWrapper>
            );
            case QuizState.ViewingResults:
                return (
                    <BackgroundWrapper>
                        <h1 className="text-xl font-bold text-center my-4 text-gray-800">Immediate Results</h1>
                        <ul>
                        {results.map((result, index) => (
                            <li key={index} className="text-gray-800 flex items-center">
                                <span>{result.question}:</span>
                                <span className={`${result.isCorrect ? 'text-maci-submit-dark' : 'text-maci-cancel-normal'} flex items-center ml-2`}>
                                    {result.isCorrect ? <IconCheck /> : <IconX />}
                                </span>
                            </li>
                        ))}
                        </ul>
                        <button onClick={handleViewResults} className="mt-4 p-2 bg-maci-main-normal text-white rounded hover:bg-maci-main-dark">View Full Results</button>
                    </BackgroundWrapper>
                );
    }
};

export default QuizPage;
