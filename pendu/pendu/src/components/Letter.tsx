import React from 'react';
import { LetterState } from '../types/LetterState';

interface LetterProps {
    letter: LetterState;
}

const Letter: React.FC<LetterProps> = ({ letter }) => {
    return (
        <div>
            Letter
        </div>
    );
};

export default Letter;