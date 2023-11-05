// SuggestedPrompts.tsx

import React from 'react';

// Define the structure of a prompt
interface Prompt {
    id: number;
    text: string;
    description: string;
}

interface SuggestedPromptsProps {
    onPromptSelect: (promptText: string, id: number) => void;
}

// Example prompts data
const prompts: Prompt[] = [
    {
        id: 1,
        text: 'Lead Contractors in Homelessness',
        description: 'Who are the lead contractors in homelessness, and how much do we spend?',
    },
    {
        id: 2,
        text: 'Homeless Service Contractors',
        description: 'What are the different contracts for homeless services',
    },
    {
        id: 3,
        text: 'Mental Health Spending',
        description: 'What do we spend money on for mental health?',
    },

];

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onPromptSelect }) => {
    return (
        <div className="suggested-prompts grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-x-10 gap-y-4 p-4">
            {prompts.map((prompt) => (
                <button key={prompt.id} className="prompt bg-white rounded-lg shadow-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" onClick={() => onPromptSelect(prompt.description, prompt.id)}
                >
                    <p className="prompt-text font-semibold text-xs">{prompt.text}</p>
                    <p className="prompt-description mt-2 text-xs text-gray-600">{prompt.description}</p>
                </button>
            ))}
            <button  className="prompt bg-white rounded-lg shadow-md p-2 disabled cursor-default " 
                >
                    <p className="prompt-text font-semibold text-xs">Or Choose Your Own!</p>
                    <p className="prompt-description mt-2 text-xs text-gray-600">Enter a custom prompt below...</p>
                </button>
        </div>

    );
};

export default SuggestedPrompts;
