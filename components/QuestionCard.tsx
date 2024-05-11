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
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1 < questions.length ? currentQuestionIndex + 1 : 0;
    setCurrentQuestionIndex(nextIndex);
  };

  const handleSelectQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
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
            <li key={index} className="p-2 text-black"> 
              {option}
            </li>
          ))}
        </ul>
        <button onClick={handleNext} className="mt-4 p-2 bg-blue-500 text-white rounded">Next</button>
      </motion.div>
      <div className="flex justify-center space-x-2 mt-4">
        {questions.map((_, index) => (
          <button key={index} onClick={() => handleSelectQuestion(index)} className={`p-2 rounded ${index === currentQuestionIndex ? 'bg-blue-600' : 'bg-gray-200'}`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
