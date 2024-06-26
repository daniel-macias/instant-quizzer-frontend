"use client"
import React, { useState } from 'react';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import QuestionCreateCard from '@/components/QuestionCreateCard';
import { Question } from '@/types/quizTypes';
import { useRouter } from 'next/navigation';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";


const CreatorPage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [editIndex, setEditIndex] = useState<number | undefined>(undefined);
    const [quizTitle, setQuizTitle] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const router = useRouter();

    const validateQuiz = () => {
        const errors = [];
        if (!quizTitle.trim()) errors.push("a title");
        if (questions.length === 0) errors.push("at least one question");
        return errors;
    };

    const addOrUpdateQuestion = (newQuestion: Question, index?: number) => {
        if (typeof index === 'number') {
            const updatedQuestions = [...questions];
            updatedQuestions[index] = newQuestion;
            setQuestions(updatedQuestions);
        } else {
            setQuestions([...questions, newQuestion]);
        }
        // Reset index after update or add
        setEditIndex(undefined);
    };

    const handleEditQuestion = (index: number) => {
        setEditIndex(index);
    };

    const deleteQuestion = (index: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
        setEditIndex(undefined);  // Reset to add new question mode
    };

    const transformData = () => {
        return {
            quizTitle: quizTitle,
            questions: questions.map((q) => ({
                questionTitle: q.question,
                possibleAnswers: q.options.map(opt => opt.text),
                correctAnswers: q.options.reduce((acc: number[], opt, idx) => {
                    if (opt.correct) acc.push(idx);
                    return acc;
                }, [] as number[])
            })),
            results: [] // Initial empty results, to be filled out by backend processing or user submissions
        };
    };

    const publishQuiz = async () => {
        const errors = validateQuiz();
        if (errors.length > 0) {
            setErrorMessages(errors);
            setIsDialogOpen(true);
            return;
        }

        const quizData = transformData();
        console.log(quizData);
        try {
            const response = await fetch('https://instant-quizzer-backend.onrender.com/api/quizzes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(quizData)
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Quiz published successfully:', data);
                // Maybe clear quiz data or redirect user
                router.push(`/share/${data.id}`);
            } else {
                console.error('Failed to publish quiz:', data);
            }
        } catch (error) {
            console.error('Error publishing quiz:', error);
        }
    };

    return (
        <BackgroundWrapper>
            <h1 className="text-xl font-normal text-center mb-4 text-gray-800">Create Your Quiz</h1>
            <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="Enter Quiz Title"
                className="w-full max-w-md mb-4 p-2 border border-gray-300 rounded text-gray-800"
            />
            <div className="flex overflow-x-auto w-full max-w-md mb-4 space-x-2">
                {questions.map((_, index) => (
                    <button key={index}
                        onClick={() => handleEditQuestion(index)}
                        className={`min-w-max p-2 bg-white border ${index === editIndex ? 'border-maci-main-normal' : 'border-gray-300'} rounded hover:bg-blue-100 text-gray-800`}>
                        {index + 1}
                    </button>
                ))}
            </div>
            <QuestionCreateCard
                addOrUpdateQuestion={addOrUpdateQuestion}
                deleteQuestion={deleteQuestion}
                initialQuestion={editIndex !== undefined ? questions[editIndex] : undefined}
                index={editIndex}
            />
            <button onClick={publishQuiz} className="mt-4 shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,40%)] px-8 py-2 bg-maci-main-normal text-[#fff] rounded-md font-light transition duration-200 ease-linear hover:bg-pure-apple  hover:border-teal-500">
                Publish Quiz and Share
            </button>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                    <button className="hidden">Open</button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogTitle>Missing elements from your quiz!</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are missing: {errorMessages.join(', ')}
                    </AlertDialogDescription>
                    <AlertDialogAction onClick={() => setIsDialogOpen(false)}>Ok</AlertDialogAction>
                </AlertDialogContent>
            </AlertDialog>
        </BackgroundWrapper>
    );
};

export default CreatorPage;