import React, { useState, useEffect } from 'react';
import { Question, Option } from '@/types/quizTypes';
import { IconTrash } from '@tabler/icons-react';
import { IconPlus } from '@tabler/icons-react';

interface Props {
    addOrUpdateQuestion: (question: Question, index?: number) => void;  // Updated to handle adding or updating
    deleteQuestion: (index: number) => void;
    initialQuestion?: Question;
    index?: number;  // Index of the question if it's being edited
}

const QuestionCreateCard: React.FC<Props> = ({ addOrUpdateQuestion, deleteQuestion, initialQuestion, index }) => {
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState<Option[]>([{
      id: 0, text: '',
      correct: false
    }, {
      id: 1, text: '',
      correct: false
    }]);

    useEffect(() => {
        if (initialQuestion) {
            setQuestionText(initialQuestion.question);
            setOptions(initialQuestion.options);
        }
    }, [initialQuestion]);

    useEffect(() => {
      // Reset form when transitioning from edit mode to create mode
      if (initialQuestion && index !== undefined) {
          // We're in edit mode, set the form to the existing question's data
          setQuestionText(initialQuestion.question);
          setOptions(initialQuestion.options);
      } else {
          // No question is selected, clear the form
          clearForm();
      }
    }, [initialQuestion, index]);

    const clearForm = () => {
        setQuestionText('');
        setOptions([{ id: 0, text: '', correct: false }, { id: 1, text: '', correct: false }]);
    };

    const handleOptionChange = (id: number, text: string) => {
        setOptions(options.map(option => option.id === id ? { ...option, text } : option));
    };

    const handleAddOption = () => {
        const newId = options.length;
        if (newId < 5) {
            setOptions([...options, { id: newId, text: '', correct: false }]);
        }
    };

    const handleRemoveOption = (id: number) => {
        if (options.length > 2) {
            setOptions(options.filter(option => option.id !== id));
        }
    };

    const handleSubmit = () => {
        if (questionText && options.length >= 2) {
            addOrUpdateQuestion({ question: questionText, options }, index);
            setQuestionText('');
            setOptions([{ id: 0, text: '', correct: false }, { id: 1, text: '', correct: false }]);
        }
    };

    const toggleCorrect = (id: number) => {
      setOptions(options.map(option =>
          option.id === id ? { ...option, correct: !option.correct } : option
      ));
    };
    return (
        <div className="p-4 shadow rounded bg-white flex flex-col items-start">
            <input
                type="text"
                value={questionText}
                onChange={e => setQuestionText(e.target.value)}
                placeholder="Enter the question"
                className="w-full mb-4 p-2 border rounded text-black"
            />
            {options.map((option, idx) => (
                <div key={idx} className="flex items-center mb-2 w-full">
                    <input
                        type="text"
                        value={option.text}
                        onChange={e => handleOptionChange(option.id, e.target.value)}
                        placeholder={`Option ${idx + 1}`}
                        className={`flex-grow p-2 border rounded text-black ${option.correct ? 'text-green-500' : 'text-black'}`}
                    />
                    <button onClick={() => toggleCorrect(option.id)} className={`ml-2 p-2 rounded ${option.correct ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'}`}>
                        {option.correct ? 'Correct' : 'Mark as Correct'}
                    </button>
                    <button onClick={() => handleRemoveOption(option.id)} className="ml-2 bg-red-500 text-white p-2 rounded">
                        <IconTrash />
                    </button>
                </div>
            ))}
            <button onClick={handleAddOption} className="bg-blue-500 text-white p-2 rounded mt-2 flex items-center">
                <IconPlus className="mr-2" /> Option
            </button>
            <div className="w-full flex justify-between mt-4">
                <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded">
                    {index !== undefined ? 'Submit Changes' : 'Submit Question'}
                </button>
                {index !== undefined && (
                    <button onClick={() => deleteQuestion(index)} className="bg-red-500 text-white p-2 rounded">
                        Delete Question
                    </button>
                )}
            </div>
        </div>
  );
};

export default QuestionCreateCard;
