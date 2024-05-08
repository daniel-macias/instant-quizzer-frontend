export type Option = {
    id: number;
    text: string;
    correct: boolean;
};

export type Question = {
    question: string;
    options: Option[];
};