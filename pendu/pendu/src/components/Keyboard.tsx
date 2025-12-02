import React from 'react';

interface KeyboardProps {
    onSelectLetter: (letter: string) => void;
    playedLetters: string[];
}

const Keyboard: React.FC<KeyboardProps> = ({ onSelectLetter, playedLetters }) => { //recoit les deux props de Game.tsx 
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const letters = alphabet.map((letter) => {
        return (
            <button key={letter} onClick={() => onSelectLetter(letter)} disabled={playedLetters.includes(letter)}>
                {letter}
            </button>
        );
    });
    return (
        <div>
            {letters}
        </div>
    );
};

export default Keyboard;
