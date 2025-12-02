import React, { useEffect, useState } from 'react';
import frenchWords from 'an-array-of-french-words';
import { LetterState } from '../types/LetterState';
import WordDisplay from './WordDisplay';
import Keyboard from './Keyboard';
import HangmanDisplay from './HangmanDisplay';

const MAX_ERRORS = 6;

type GameStatus = 'playing' | 'won' | 'lost';

const Game: React.FC = () => {
  const [word, setWord] = useState<string>('');
  const [letters, setLetters] = useState<LetterState[]>([]);
  const [errors, setErrors] = useState<number>(0);
  const [playedLetters, setPlayedLetters] = useState<string[]>([]);
  const [status, setStatus] = useState<GameStatus>('playing');

  // Choisir un mot aléatoire dans le dictionnaire
  const initGame = () => {
    // On filtre un peu les mots pour éviter les trucs trop chelous
    const words = frenchWords.filter(
      (w) =>
        w.length >= 5 &&
        w.length <= 10 &&
        /^[a-zàâçéèêëîïôûùüÿçœ]+$/i.test(w) &&
        !w.includes('-') &&
        !w.includes(' ')
    );

    const random =
      words[Math.floor(Math.random() * words.length)].toLowerCase();

    setWord(random);
    setLetters(
      random.split('').map((l) => ({
        display: l,
        state: 'Hidden',
      }))
    );
    setErrors(0);
    setPlayedLetters([]);
    setStatus('playing');
  };

  // Initialisation au montage
  useEffect(() => {
    initGame();
  }, []);

  const handleSelectLetter = (letter: string) => {
    if (status !== 'playing') return;

    const l = letter.toLowerCase();

    // déjà jouée → on ignore
    if (playedLetters.includes(l)) return;

    setPlayedLetters((prev) => [...prev, l]);

    if (word.includes(l)) {
      // Révéler toutes les occurrences de la lettre
      setLetters((prev) =>
        prev.map((letterState) =>
          letterState.display === l
            ? { ...letterState, state: 'Display' }
            : letterState
        )
      );
    } else {
      // Mauvaise lettre → +1 erreur
      setErrors((prev) => prev + 1);
    }
  };

  // Vérifier victoire / défaite à chaque changement
  useEffect(() => {
    if (!word) return;

    const allDisplayed =
      letters.length > 0 && letters.every((l) => l.state === 'Display');

    if (allDisplayed) {
      setStatus('won');
      return;
    }

    if (errors >= MAX_ERRORS) {
      setStatus('lost');
    }
  }, [letters, errors, word]);

  const resetGame = () => {
    initGame();
  };

  const renderStatusMessage = () => {
    if (status === 'won') {
      return <p style={{ color: 'green' }}>Bravo, tu as gagné ! 🎉</p>;
    }
    if (status === 'lost') {
      return (
        <p style={{ color: 'red' }}>
          Perdu 😢 Le mot était : <strong>{word}</strong>
        </p>
      );
    }
    return null;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h1>Jeu du Pendu</h1>

      <HangmanDisplay errors={errors} maxErrors={MAX_ERRORS} />

      <WordDisplay letters={letters} />

      {renderStatusMessage()}

      <Keyboard
        onSelectLetter={handleSelectLetter}
        playedLetters={playedLetters}
      />

      <div style={{ marginTop: '20px' }}>
        <button onClick={resetGame}>Nouvelle partie</button>
      </div>
    </div>
  );
};

export default Game;
