
import { useState } from "react";
import Keyboard from "./Keyboard";
import WordDisplay from "./WordDisplay";
import HangmanDisplay from "./HangmanDisplay";
import { LetterState } from "../types/LetterState";
import frenchWords from "an-array-of-french-words";


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


    const handleSelectLetter = (letter: string) => { // Gestion de la sélection d'une lettre
        setPlayedLetters([...playedLetters, letter]);

        const isLetterInWord = wordLetters.some(
            (letterState) => letterState.display === letter
        );

        if (isLetterInWord) {
            const newWordLetters = wordLetters.map((letterState) => {
                if (letterState.display === letter) {
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
        console.log("Nouvelle partie lancée !");

    }
    return (
        <div>
            <HangmanDisplay errors={errors} maxErrors={maxErrors} />

            <WordDisplay letters={wordLetters} />

            <Keyboard
                onSelectLetter={handleSelectLetter}
                playedLetters={playedLetters}
            />

            <button onClick={resetGame}>Nouvelle partie</button>
        </div>
    );
}
