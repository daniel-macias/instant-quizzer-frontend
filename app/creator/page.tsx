"use client"
import React, { useState } from 'react';
import QuestionCreateCard from '@/components/QuestionCreateCard';
import { Question } from '@/types/quizTypes';



const CreatorPage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [editIndex, setEditIndex] = useState<number | undefined>(undefined);

    const addOrUpdateQuestion = (newQuestion: Question, index?: number) => {
        if (typeof index === 'number' && index >= 0 && index < questions.length) {
            // Update the existing question
            const updatedQuestions = [...questions];
            updatedQuestions[index] = newQuestion;
            setQuestions(updatedQuestions);
        } else {
            // Add a new question
            setQuestions(prev => [...prev, newQuestion]);
        }
    };

    const handleEditQuestion = (index: number) => {
        setEditIndex(index);
    };

    return (
        <div>
            <h1>Create Your Quiz</h1>
            <QuestionCreateCard
                addOrUpdateQuestion={addOrUpdateQuestion}
                initialQuestion={editIndex !== undefined ? questions[editIndex] : undefined}
                index={editIndex}
            />
            {questions.map((question, index) => (
                <button key={index} onClick={() => handleEditQuestion(index)} className="mt-2 p-2 border">
                    {`Question ${index + 1}`}
                </button>
            ))}
        </div>
    );
};

export default CreatorPage;
