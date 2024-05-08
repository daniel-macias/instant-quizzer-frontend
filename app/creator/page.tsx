"use client"
import React, { useState } from 'react';
import QuestionCreateCard from '@/components/QuestionCreateCard';

// Define or import these types
type Option = {
    id: number;
    text: string;
};

type Question = {
    question: string;
    options: Option[];
};

const QuizPage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);  // Use the Question type for state

    const addQuestion = (newQuestion: Question) => {  // Specify the type for newQuestion
        setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
    };

    return (
        <div>
            <h1>Create Your Quiz</h1>
            <QuestionCreateCard addQuestion={addQuestion} />
            {questions.map((question, index) => (
                <div key={index} className="mt-2 p-2 border">
                    <p>Question: {question.question}</p>
                    <ul>
                        {question.options.map((option, i) => <li key={i}>{option.text}</li>)}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default QuizPage;
