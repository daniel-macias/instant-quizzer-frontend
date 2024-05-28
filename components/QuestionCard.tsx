"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);


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

  const handlePrev = () => {
    const prevIndex = currentQuestionIndex - 1 < 0 ? questions.length - 1 : currentQuestionIndex - 1;
    setCurrentQuestionIndex(prevIndex);
  };

  const handleSelectQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const allQuestionsAnswered = questions.every(question => question.userAnswers.some(answer => answer));

  const handleSubmit = () => {
    if (!allQuestionsAnswered) {
      setIsConfirmOpen(true);
      return;
  }
  onSubmit(questions);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
        <motion.div
                key={currentQuestionIndex} 
                className="bg-white w-full md:max-w-md p-4 shadow-lg rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}>
            <h2 className="text-center text-lg font-semibold mb-4 text-gray-800">{currentQuestion.question}</h2>
            <ul>
                {currentQuestion.options.map((option, index) => (
                    <li key={index} className="flex justify-between items-center my-2">
                        <button
                            onClick={() => toggleOption(index)}
                            className={`p-2 rounded transition-colors duration-150 ${currentQuestion.userAnswers[index] ? 'bg-maci-main-normal hover:bg-maci-main-dark text-white' : 'bg-soaring-eagle hover:bg-diving-dove text-white'}`}>
                            {option}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-6 flex justify-end space-x-2 ">
                <button onClick={handlePrev} className="p-2 bg-maci-main-normal hover:bg-maci-main-dark text-white rounded transition-colors duration-150">
                    <IconArrowLeft />
                </button>
                <button onClick={handleNext} className="p-2 bg-maci-main-normal hover:bg-maci-main-dark text-white rounded transition-colors duration-150">
                    <IconArrowRight />
                </button>
            </div>
        </motion.div>
        <button onClick={handleSubmit} className="p-2 mt-4 bg-maci-submit-dark hover:bg-maci-submit-darker text-white rounded transition-colors duration-150">Submit Answers</button>
        <div className="flex space-x-2 mt-4">
            {questions.map((_, index) => (
                <button
                    key={index}
                    onClick={() => handleSelectQuestion(index)}
                    className={`p-2 rounded transition-colors duration-150 ${index === currentQuestionIndex ? 'border-2 border-maci-main-normal' : 'border-2 border-gray-200'} ${questions[index].userAnswers.some(answer => answer) ? 'bg-maci-main-dark hover:bg-maci-main-dark text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}>
                    {index + 1}
                </button>
            ))}
        </div>
        <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
          <AlertDialogTrigger asChild>
              <button className="hidden">Trigger</button>
          </AlertDialogTrigger>
          <AlertDialogContent>
              <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
              <AlertDialogDescription>
                  Are you sure you want to submit? You haven't answered all the questions.
              </AlertDialogDescription>
              <AlertDialogFooter>
                  <button onClick={() => setIsConfirmOpen(false)} className="bg-soaring-eagle text-white p-2 rounded">Cancel</button>
                  <button onClick={() => {
                      setIsConfirmOpen(false);
                      onSubmit(questions);
                  }} className="bg-maci-main-normal text-white p-2 rounded">
                      Confirm
                  </button>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuestionCard;
