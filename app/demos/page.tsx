"use client"
import React from 'react';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import { HoverEffect } from '@/components/ui/card-hover-effect';

const projects = [
    {
      title: "Capitals of the World",
      description:
        "Explore the capitals of countries around the globe in this geographic challenge.",
      link: "http://localhost:3000/quiz/663f5a548735dbbfd885dc31",
    },
    {
      title: "The Periodic Table",
      description:
        "Dive into the elements of the periodic table and test your knowledge of chemistry.",
      link: "http://localhost:3000/quiz/6653a8d6f01ee9f3f1b8b85d",
    },
    {
      title: "Authors of Classic Books",
      description:
        "Identify authors behind the masterpieces of classic literature in this literary quiz.",
      link: "http://localhost:3000/quiz/6653a9b9f01ee9f3f1b8b85e",
    },
    {
      title: "Tarantino Movie Trivia",
      description:
        "Test your knowledge on Quentin Tarantino's iconic films and their unforgettable scenes.",
      link: "http://localhost:3000/quiz/6653aa57f01ee9f3f1b8b85f",
    },
    {
      title: "The French Revolution",
      description:
        "Explore the pivotal events and figures of the French Revolution.",
      link: "http://localhost:3000/quiz/6653aaf4f01ee9f3f1b8b860",
    },
    {
      title: "Ancient Greek Philosophy",
      description:
        "Jump into the profound world of Ancient Greek philosophers and their enduring ideas.",
      link: "http://localhost:3000/quiz/6653ab77f01ee9f3f1b8b861",
    },
  ];

const DemosPage: React.FC = () => {

    return (
        <BackgroundWrapper>
            <h1 className="text-2xl font-normal text-center text-gray-800 mb-10">Quiz Examples</h1>
            <HoverEffect items={projects} />
        </BackgroundWrapper>
    );
};

export default DemosPage;