import { useRouter } from 'next/navigation';
import React from 'react';
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

  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  

const QuizPage: React.FC = () => {

    return (
        <div>
            <p>About</p>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600">Delete Item</button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    Confirm Deletion
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                    Are you sure you want to delete this item? This action cannot be undone.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                    <AlertDialogAction>Confirm</AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Popover>
                <PopoverTrigger>Open</PopoverTrigger>
                <PopoverContent>Place content for the popover here.</PopoverContent>
            </Popover>

        </div>
    );
};

export default QuizPage;