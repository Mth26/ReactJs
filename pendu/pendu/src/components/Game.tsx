
import { useState, useCallback } from "react";
import Keyboard from "./Keyboard";
import WordDisplay from "./WordDisplay";
import HangmanDisplay from "./HangmanDisplay";
import Timer, { calculateScore } from "./Timer";
import { LetterState } from "../types/LetterState";
import frenchWords from "an-array-of-french-words";
import { removeAccents } from "../utils/accentUtils";


const getRandomWord = (): string => { // Fonction pour obtenir un mot aléatoire depuis la liste
    // 1. filtre pour avoir que des mots entre 5 et 10 lettres (pour la difficulté)
    const filteredWords = frenchWords.filter(word => word.length >= 5 && word.length <= 10);

    const randomIndex = Math.floor(Math.random() * filteredWords.length);

    return filteredWords[randomIndex].toUpperCase();
};

const createLetterStates = (word: string): LetterState[] => { // Crée un tableau d'objets LetterState à partir du mot
    const characters = word.split('');

    const letterStates = characters.map((char) => {
        return {
            display: char,
            state: 'Hidden' as const
        };
    });

    return letterStates;
};

export default function Game() {

    const [wordLetters, setWordLetters] = useState<LetterState[]>(
        createLetterStates(getRandomWord())
    );

    const [playedLetters, setPlayedLetters] = useState<string[]>([]);

    const [errors, setErrors] = useState<number>(0);
    const maxErrors = 6;

    const [elapsedTime, setElapsedTime] = useState<number>(0);

    const handleTimeUpdate = useCallback((time: number) => {
        setElapsedTime(time);
    }, []);


    const isWinner = wordLetters.every(
        (letterState) => letterState.state === 'Display'
    );

    const isLoser = errors >= maxErrors;

    const isGameOver = isWinner || isLoser;


    const handleSelectLetter = (letter: string) => {
        setPlayedLetters([...playedLetters, letter]);

        const isLetterInWord = wordLetters.some(
            (letterState) => removeAccents(letterState.display) === letter
        );

        if (isLetterInWord) {
            const newWordLetters = wordLetters.map((letterState) => {
                if (removeAccents(letterState.display) === letter) {
                    return { ...letterState, state: 'Display' as const };
                }
                return letterState;
            });
            setWordLetters(newWordLetters);
        } else {
            setErrors(errors + 1);
        }
    };

    const resetGame = () => {
        setWordLetters(createLetterStates(getRandomWord()));
        setPlayedLetters([]);
        setErrors(0);
        setElapsedTime(0);
    }

    const finalScore = isWinner ? calculateScore(elapsedTime, errors, wordLetters.length) : 0;

    return (
        <div className="game-container">
            <div className="game-header">
                <Timer isRunning={!isGameOver} onTimeUpdate={handleTimeUpdate} />
                <HangmanDisplay errors={errors} maxErrors={maxErrors} />
            </div>

            <WordDisplay letters={wordLetters} />

            {isWinner && (
                <div className="end-game-container">
                    <p className="message winner">🎉 Bravo ! !</p>
                    <div className="score-display">
                        <span className="score-label">Score</span>
                        <span className="score-value">{finalScore}</span>
                        <span className="score-details">
                            ⏱️ {elapsedTime}s | ❌ {errors} erreur{errors > 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
            )}
            {isLoser && (
                <div className="end-game-container">
                    <p className="message loser">💀 Perdu ! Le mot était : {wordLetters.map(l => l.display).join('')}</p>
                    <div className="score-display loser">
                        <span className="score-label">Score</span>
                        <span className="score-value">0</span>
                    </div>
                </div>
            )}

            {!isGameOver && (
                <Keyboard
                    onSelectLetter={handleSelectLetter}
                    playedLetters={playedLetters}
                />
            )}

            <button className="reset-button" onClick={resetGame}>Nouvelle partie</button>
        </div>
    );
}
