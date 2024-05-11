"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface Question {
  question: string;
  options: string[];
  correctAnswers: number[]; 
  userAnswers: boolean[]; 
}

interface QuestionCardProps {
  questions: Question[];
  onSubmit: (questions: Question []) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questions: initialQuestions, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const currentQuestion = questions[currentQuestionIndex];

  const toggleOption = (optionIndex: number) => {
    // Create a new array with updated userAnswers
    const updatedQuestions = questions.map((question, index) => {
      if (index === currentQuestionIndex) {
        const newAnswers = [...question.userAnswers];
        newAnswers[optionIndex] = !newAnswers[optionIndex]; // Toggle the selected answer
        return { ...question, userAnswers: newAnswers };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1 < questions.length ? currentQuestionIndex + 1 : 0;
    setCurrentQuestionIndex(nextIndex);
  };

  const handleSelectQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const allQuestionsAnswered = questions.every(question => question.userAnswers.some(answer => answer));

  const handleSubmit = () => {
    if (!allQuestionsAnswered && !confirm("Are you sure you want to submit? You haven't answered all the questions.")) {
      return;
    }
    onSubmit(questions);
  };

  return (
    <div className="relative">
      <motion.div
        key={currentQuestionIndex} 
        className="absolute bg-white w-full md:max-w-md p-4 shadow-lg rounded-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-black">{currentQuestion.question}</h2>
        <ul>
        {currentQuestion.options.map((option, index) => (
            <li key={index} className="flex items-center space-x-2">
              <button onClick={() => toggleOption(index)} className={`p-2 rounded ${currentQuestion.userAnswers[index] ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {option}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleNext} className="mt-4 p-2 bg-blue-500 text-white rounded">Next</button>
        <button onClick={handleSubmit} className="p-2 bg-green-500 text-white rounded">Submit Answers</button>
      </motion.div>
      <div className="flex justify-center space-x-2 mt-4">
        {questions.map((_, index) => (
          <button key={index} onClick={() => handleSelectQuestion(index)} className={`p-2 rounded ${questions[index].userAnswers.some(answer => answer) ? 'bg-blue-600' : 'bg-gray-200'}`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
