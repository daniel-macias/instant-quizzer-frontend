"use client";
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Quick Quiz Maker</h1>
            <p className="text-xl text-center mb-8 text-gray-600">
                Full-stack fast quiz creator for educational and casual users.
            </p>
            <button onClick={() => router.push('/creator')} className="w-64 p-3 mb-4 bg-maci-main-normal text-white rounded hover:bg-maci-main-dark transition-colors duration-200 text-lg font-medium">
                Create Quiz
            </button>
            <button onClick={() => router.push('/demos')} className="w-64 p-3 mb-2 bg-maci-submit-dark text-white rounded hover:bg-maci-submit-darker transition-colors duration-200 text-lg font-medium">
                View Examples
            </button>
            <button onClick={() => router.push('/about')} className="w-64 p-3 bg-soaring-eagle text-white rounded hover:wizard-grey transition-colors duration-200 text-lg font-medium">
                About
            </button>
        </div>
    );
}
