import React, { useState, useEffect } from 'react';
import { Question, Option } from '@/types/quizTypes';

interface Props {
    addOrUpdateQuestion: (question: Question, index?: number) => void;  // Updated to handle adding or updating
    initialQuestion?: Question;
    index?: number;  // Index of the question if it's being edited
}

const QuestionCreateCard: React.FC<Props> = ({ addOrUpdateQuestion, initialQuestion, index }) => {
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
      <div className="p-4 shadow rounded bg-white">
          <input
              type="text"
              value={questionText}
              onChange={e => setQuestionText(e.target.value)}
              placeholder="Enter the question"
              className="w-full mb-4 p-2 border rounded text-black"  // Ensure text color is black
          />
          {options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                  <input
                      type="text"
                      value={option.text}
                      onChange={e => handleOptionChange(option.id, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className={`flex-grow p-2 border rounded text-black ${option.correct ? 'text-green-500' : 'text-black'}`}  // Conditionally apply green text
                  />
                  <button
                      onClick={() => toggleCorrect(option.id)}
                      className={`ml-2 p-2 rounded ${option.correct ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'}`}
                  >
                      {option.correct ? 'Correct' : 'Mark as Correct'}
                  </button>
                  <button onClick={() => handleRemoveOption(option.id)} className="ml-2 bg-red-500 text-white p-2 rounded">
                      Remove
                  </button>
              </div>
          ))}
          <button onClick={handleAddOption} className="bg-blue-500 text-white p-2 rounded">Add Option</button>
          <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded mt-4">
              {index !== undefined ? 'Submit Changes' : 'Submit Question'}
          </button>
      </div>
  );
};

export default QuestionCreateCard;
