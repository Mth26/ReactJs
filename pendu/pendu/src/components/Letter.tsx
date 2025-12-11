import React from 'react';
import { LetterState } from '../types/LetterState';

interface LetterProps {
    letter: LetterState;
}

const Letter: React.FC<LetterProps> = ({ letter }) => {
    // Ajoute la classe "revealed" si la lettre est affichée
    const className = letter.state === 'Display' ? 'letter revealed' : 'letter';

    return (
        <span className={className}>
            {/* Si l'état est "Display", on affiche la lettre, sinon on affiche _ */}
            {letter.state === 'Display' ? letter.display : '_'}
        </span>
    );
};

export default Letter;