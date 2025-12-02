import React from 'react';

interface KeyboardProps {
  onSelectLetter: (letter: string) => void;
  playedLetters: string[];
}

const alphabet = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i).toLowerCase()
);

const Keyboard: React.FC<KeyboardProps> = ({ onSelectLetter, playedLetters }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '400px',
        gap: '6px',
        justifyContent: 'center',
      }}
    >
      {alphabet.map((letter) => {
        const alreadyPlayed = playedLetters.includes(letter);
        return (
          <button
            key={letter}
            onClick={() => onSelectLetter(letter)}
            disabled={alreadyPlayed}
            style={{
              padding: '6px 10px',
              borderRadius: '4px',
              cursor: alreadyPlayed ? 'not-allowed' : 'pointer',
            }}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
