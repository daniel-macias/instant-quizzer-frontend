import React from 'react';

export default function QuizPage ({params} : {params: {quizId: string}}) {

    return (
        <div>
            <h1>Quiz Page ID: {params.quizId}</h1>
            <p>This page is a placeholder for the quiz with Page ID: {params.quizId}</p>
        </div>
    );
};
