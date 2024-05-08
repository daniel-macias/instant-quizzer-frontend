"use client"
import React, { useState } from 'react';
import QuestionCreateCard from '@/components/QuestionCreateCard';
import { Question } from '@/types/quizTypes';
import { useRouter } from 'next/navigation';



const CreatorPage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [editIndex, setEditIndex] = useState<number | undefined>(undefined);
    const [quizTitle, setQuizTitle] = useState('');

    const router = useRouter();

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
        const quizData = transformData();
        console.log(quizData);
        try {
            const response = await fetch('http://localhost:5177/api/quizzes', {
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
        <div>
            <h1>Create Your Quiz</h1>
            <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="Enter Quiz Title"
                className="w-full mb-4 p-2 border rounded text-black"
            />
            <QuestionCreateCard
                addOrUpdateQuestion={addOrUpdateQuestion}
                deleteQuestion={deleteQuestion}
                initialQuestion={editIndex !== undefined ? questions[editIndex] : undefined}
                index={editIndex}
            />
            {questions.map((question, index) => (
                <button key={index} onClick={() => handleEditQuestion(index)} className="mt-2 p-2 border">
                    {`Question ${index + 1}`}
                </button>
            ))}
            <button onClick={publishQuiz} className="mt-4 p-2 bg-blue-500 text-white rounded">
                Publish Quiz and Share
            </button>
        </div>
    );
};

export default CreatorPage;