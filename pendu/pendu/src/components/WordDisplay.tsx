import React from 'react';
import { LetterState } from '../types/LetterState';
import Letter from './Letter';

interface WordDisplayProps {
    letters: LetterState[];
}

const WordDisplay: React.FC<WordDisplayProps> = ({ letters }) => {
    return (
        <div>
            <p>WordDisplay</p>
        </div> 
  );
};

export default WordDisplay;