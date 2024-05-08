import React from 'react';

export default function ShareQuizPage ({params} : {params: {quizId: string}}) {

    return (
        <div>
            <h1>Share Quiz Page ID: {params.quizId}</h1>
            <p>This page is a placeholder for the quiz with Page ID: {params.quizId}</p>
        </div>
    );
};
