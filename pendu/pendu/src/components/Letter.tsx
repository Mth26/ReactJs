import React from 'react';
import { LetterState } from '../types/LetterState';

interface LetterProps {
  letter: LetterState;
}

const Letter: React.FC<LetterProps> = ({ letter }) => {
  return (
    <span style={{ fontSize: '2rem', margin: '0 4px' }}>
      {letter.state === 'Display' ? letter.display : '_'}
    </span>
  );
};

export default Letter;
