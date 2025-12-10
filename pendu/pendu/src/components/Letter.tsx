import React from 'react';
import { useState } from 'react';
import { LetterState } from '../types/LetterState';

interface LetterProps {
    letter: LetterState;
} 

const Letter: React.FC<LetterProps> = ({ letter }) => {
    const [word, setWord] = useState<LetterState[]>([]);

    const updateWord = (newLetter: LetterState) => {
        setWord([...word, newLetter]);
    };
    return (
        <span style={{
            fontSize: '2rem',
            margin: '0 5px',
            fontFamily: 'monospace',
            fontWeight: 'bold'
        }}>
            {letter.state === 'Display' ? letter.display : '_'} {/* si l'état est "Display", on affiche la lettre, sinon on affiche un underscore */}
        </span>
    );
};

export default Letter;