import React, { useState } from 'react';

type Option = {
    id: number;
    text: string;
};

type Question = {
    question: string;
    options: Option[];
};

interface Props {
    addQuestion: (question: Question) => void;
}

const QuestionCreateCard: React.FC<Props> = ({ addQuestion }) => {
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState<Option[]>([{ id: 0, text: '' }, { id: 1, text: '' }]);

    const handleOptionChange = (id: number, text: string) => {
        setOptions(options.map(option => option.id === id ? { ...option, text } : option));
    };

    const handleAddOption = () => {
        const newId = options.length;
        if (newId < 5) {
            setOptions([...options, { id: newId, text: '' }]);
        }
    };

    const handleRemoveOption = (id: number) => {
        if (options.length > 2) {
            setOptions(options.filter(option => option.id !== id));
        }
    };

    const handleSubmit = () => {
        if (questionText && options.length >= 2) {
            addQuestion({ question: questionText, options });
            setQuestionText('');
            setOptions([{ id: 0, text: '' }, { id: 1, text: '' }]);
        }
    };

    return (
        <div className="p-4 shadow rounded bg-white">
            <input
                type="text"
                value={questionText}
                onChange={e => setQuestionText(e.target.value)}
                placeholder="Enter the question"
                className="w-full mb-4 p-2 border rounded"
            />
            {options.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                    <input
                        type="text"
                        value={option.text}
                        onChange={e => handleOptionChange(option.id, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="flex-grow p-2 border rounded"
                    />
                    <button onClick={() => handleRemoveOption(option.id)} className="ml-2 bg-red-500 text-white p-2 rounded">
                        Remove
                    </button>
                </div>
            ))}
            <button onClick={handleAddOption} className="bg-blue-500 text-white p-2 rounded">Add Option</button>
            <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded mt-4">Submit Question</button>
        </div>
    );
};

export default QuestionCreateCard;
