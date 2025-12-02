import React from 'react';

interface HangmanProps {
  errors: number;
  maxErrors: number;
}

const HangmanDisplay: React.FC<HangmanProps> = ({ errors, maxErrors }) => {
  const parts = ['🪢', '🧍', '🦵', '🦵', '✋', '✋'];
  const shownParts = parts.slice(0, Math.min(errors, parts.length));

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <div style={{ fontSize: '2rem', minHeight: '2.5rem' }}>
        {shownParts.join(' ')}
      </div>
      <p>
        Erreurs : {errors} / {maxErrors}
      </p>
    </div>
  );
};

export default HangmanDisplay;
