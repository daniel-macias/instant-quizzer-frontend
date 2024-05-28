
import React, { ReactNode } from 'react';

interface BackgroundWrapperProps {
    children: ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
    return (
        <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-maci-main-normal/[0.1] flex items-center justify-center p-4 relative">
            {/* Gradient background layer */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="w-full h-full bg-gradient-to-br from-transparent to-diving-dove dark:to-white opacity-50"></div>
            </div>
            {/* Content layer */}
            <div className="flex flex-col items-center justify-center p-4 mx-auto z-10 relative">
                {children}
            </div>
        </div>
    );
};

export default BackgroundWrapper;