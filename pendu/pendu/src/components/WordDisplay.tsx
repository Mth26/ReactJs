import React from 'react';
import { LetterState } from '../types/LetterState';
import Letter from './Letter';

interface WordDisplayProps {
  letters: LetterState[];
}

const WordDisplay: React.FC<WordDisplayProps> = ({ letters }) => {
  return (
    <div style={{ margin: '20px 0' }}>
      {letters.map((l, i) => (
        <Letter key={i} letter={l} />
      ))}
    </div>
  );
};

export default WordDisplay;
