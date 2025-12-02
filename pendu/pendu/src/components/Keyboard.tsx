import React from 'react';

interface KeyboardProps {
    onSelectLetter: (letter: string) => void;
    playedLetters: string[];
}

const Keyboard: React.FC<KeyboardProps> = ({ onSelectLetter, playedLetters }) => { //recoit les deux props de Game.tsx 
    return (
        <div>
            <p>Keyboard</p>
        </div>
    );
};

export default Keyboard;
