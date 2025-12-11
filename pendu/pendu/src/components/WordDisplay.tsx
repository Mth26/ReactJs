import React from 'react';
import { LetterState } from '../types/LetterState';
import Letter from './Letter';

interface WordDisplayProps {
    letters: LetterState[];
}

const WordDisplay: React.FC<WordDisplayProps> = ({ letters }) => {
    return (
        <div className="word-container">
            {/* On BOUCLE sur chaque lettre et on RÉUTILISE le composant Letter */}
            {letters.map((letter, index) => (
                <Letter key={index} letter={letter} />
            ))}
        </div>
    );
};

export default WordDisplay;