import React from 'react';

interface HangmanProps {
    errors: number; //le nombre d'erreurs actuelles
    maxErrors: number; // les erreurs maximum autorisées
}

const HangmanDisplay: React.FC<HangmanProps> = ({ errors, maxErrors }) => { //recoit les deux props de Game.tsx
    // Chaque partie du corps apparaît après une erreur
    const parts = ['🙃', '👕', '🦵', '🦵', '🤛', '🤜'];

    // On prend seulement les X premières parties (selon le nombre d'erreurs)
    const shownParts = parts.slice(0, errors);

    return (
        <div className="hangman-container">
            <p className="errors">Erreurs : {errors} / {maxErrors}</p>
            <div className="parts">
                {/* On affiche les parties du corps selon le nombre d'erreurs */}
                {shownParts.map((part, index) => (
                    <span key={index}>{part}</span>
                ))}
            </div>
        </div>
    );
};

export default HangmanDisplay;