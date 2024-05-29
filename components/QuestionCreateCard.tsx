import React, { useState, useEffect } from 'react';
import { Question, Option } from '@/types/quizTypes';
import { IconTrash } from '@tabler/icons-react';
import { IconPlus } from '@tabler/icons-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

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
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [popoverMessage, setPopoverMessage] = useState('');

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
        if (options.length >= 5) {
            setPopoverMessage('You cannot add more than 5 options.');
            setPopoverOpen(true);
            return;
        }
        setOptions([...options, { id: options.length, text: '', correct: false }]);
    };

    const handleRemoveOption = (id: number) => {
        if (options.length <= 2) {
            setPopoverMessage('You must have at least 2 options.');
            setPopoverOpen(true);
            return;
        }
        setOptions(options.filter(option => option.id !== id));
    };

    const handleSubmit = () => {
        if (options.some(opt => opt.correct)) {
            addOrUpdateQuestion({ question: questionText, options }, index);
            clearForm();
        } else {
            setPopoverMessage('You must select at least one correct option.');
            setPopoverOpen(true);
        }
    };

    const toggleCorrect = (id: number) => {
      setOptions(options.map(option =>
          option.id === id ? { ...option, correct: !option.correct } : option
      ));
    };
    return (
        <div className="p-4 shadow rounded bg-white flex flex-col items-center w-full max-w-lg mx-auto">
            <input
                type="text"
                value={questionText}
                onChange={e => setQuestionText(e.target.value)}
                placeholder="Enter the question"
                className="w-full mb-4 p-2 border rounded text-black"
            />
            {options.map((option, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-center w-full mb-2">
                    <input
                        type="text"
                        value={option.text}
                        onChange={e => handleOptionChange(option.id, e.target.value)}
                        placeholder={`Option ${idx + 1}`}
                        className="flex-grow p-2 border rounded text-black mb-2 md:mb-0 md:mr-2"
                    />
                    <div className="flex flex-row items-center">
                        <button
                            onClick={() => toggleCorrect(option.id)}
                            className={`p-2 rounded rounded-r-none ${option.correct ? 'shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,40%)] px-8 py-2 bg-maci-submit-dark text-[#fff] rounded-md font-light transition duration-200 ease-linear' : 'shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,40%)] px-8 py-2 bg-gray-400 text-[#fff] rounded-md font-light transition duration-200 ease-linear'}`}
                        >
                            {option.correct ? 'Correct' : 'Mark as Correct'}
                        </button>
                        <button onClick={() => handleRemoveOption(option.id)} className="rounded-l-none shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,40%)] px-2 py-2 bg-maci-cancel-dark text-[#fff] rounded-md font-light transition duration-200 ease-linear">
                            <IconTrash />
                        </button>
                    </div>
                </div>
            ))}
            <button onClick={handleAddOption} className="shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,40%)] px-4 py-2 bg-maci-main-normal flex text-[#fff] rounded-md font-light transition duration-200 ease-linear">
                <IconPlus className="mr-2" />Option
            </button>
            <div className={`flex w-full mt-4 ${index === undefined ? 'justify-center' : 'justify-between'}`}>
                <button onClick={handleSubmit} className="shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,40%)] px-8 py-2 bg-maci-submit-dark text-[#fff] rounded-md font-light transition duration-200 ease-linear">
                    {index !== undefined ? 'Submit Changes' : 'Add Question to Quiz'}
                </button>
                {index !== undefined && (
                    <button onClick={() => deleteQuestion(index)} className="bg-red-500 text-white p-2 rounded">
                        Delete Question
                    </button>
                )}
            </div>
            {popoverOpen && (
                <Popover open = {true}>
                    <PopoverTrigger>
                        <button onClick={() => setPopoverOpen(false)} className="fixed inset-0 w-full h-full cursor-default focus:outline-none"></button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <p className='text-black'>{popoverMessage}</p>
                    </PopoverContent>
                </Popover>
            )}
        </div>
  );
};

export default QuestionCreateCard;
