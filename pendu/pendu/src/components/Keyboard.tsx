import React from 'react';

interface KeyboardProps {
    onSelectLetter: (letter: string) => void;
    playedLetters: string[];
}

const Keyboard: React.FC<KeyboardProps> = ({ onSelectLetter, playedLetters }) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    const letters = alphabet.map((letter) => {
        return (
            <button 
                key={letter} 
                onClick={() => onSelectLetter(letter)}
                disabled={playedLetters.includes(letter)} // Désactive le bouton si la lettre a déjà été jouée
            >
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
