
import { useState } from "react";
import Keyboard from "./Keyboard";
import WordDisplay from "./WordDisplay";
import HangmanDisplay from "./HangmanDisplay";
import { LetterState } from "../types/LetterState";
import frenchWords from "an-array-of-french-words";


const getRandomWord = (): string => {
    // 1. On filtre pour avoir que des mots entre 5 et 10 lettres (pour la difficulté)
    const filteredWords = frenchWords.filter(word => word.length >= 5 && word.length <= 10);

    const randomIndex = Math.floor(Math.random() * filteredWords.length);

    return filteredWords[randomIndex].toUpperCase();
};

export default function Game() {

    const resetGame = () => {
        console.log("Nouvelle partie lancée !");

    }
    return (
        <div>
            <WordDisplay letters={[]} />
            <Keyboard onSelectLetter={(letter) => { console.log(letter) }} playedLetters={[]} />
            <button onClick={resetGame}>Nouvelle partie</button>

        </div>
    );
}
