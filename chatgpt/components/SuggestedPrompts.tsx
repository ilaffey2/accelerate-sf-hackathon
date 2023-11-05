// SuggestedPrompts.tsx

import React from 'react';

// Define the structure of a prompt
interface Prompt {
    id: number;
    text: string;
    description: string;
}

interface SuggestedPromptsProps {
    onPromptSelect: (promptText: string) => void;
}

// Example prompts data
const prompts: Prompt[] = [
    {
        id: 1,
        text: 'Tell me a fun fact',
        description: 'about the Roman Empire',
    },
    {
        id: 2,
        text: 'Plan an itinerary',
        description: 'to experience the wildlife in the Australian outback',
    },
    {
        id: 3,
        text: 'Suggest fun activities',
        description: 'for a family of 4 to do indoors on a rainy day',
    },
    {
        id: 4,
        text: 'Compare business strategies',
        description: 'for transitioning from budget to luxury vs. luxury to budget',
    },
];

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onPromptSelect }) => {
    return (
        <div className="suggested-prompts grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-x-10 gap-y-4 p-4">
            {prompts.map((prompt) => (
                <button key={prompt.id} className="prompt bg-white rounded-lg shadow-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" onClick={() => onPromptSelect(prompt.text + " " + prompt.description)}
                >
                    <p className="prompt-text font-semibold text-xs">{prompt.text}</p>
                    <p className="prompt-description mt-2 text-xs text-gray-600">{prompt.description}</p>
                </button>
            ))}
        </div>

    );
};

export default SuggestedPrompts;
