import React from 'react';

interface HangmanProps {
    errors: number; //le nombre d'erreurs actuelles
    maxErrors: number; // les erreurs maximum autorisées
}

const HangmanDisplay: React.FC<HangmanProps> = ({ errors, maxErrors }) => { //recoit les deux props de Game.tsx
    const parts = ['🙃', '👕', '🦵', '🦵', '🤛', '🤜'];
    const shownParts = parts.slice(0, errors);
    return (
        <div>
            <p>HangmanDisplay</p>
        </div>
    );
};

export default HangmanDisplay;