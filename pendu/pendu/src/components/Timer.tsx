import React, { useState, useEffect } from 'react';

interface TimerProps {
    isRunning: boolean;
    onTimeUpdate: (time: number) => void;
    reset?: boolean;
}

const Timer: React.FC<TimerProps> = ({ isRunning, onTimeUpdate }) => {
    const [seconds, setSeconds] = useState<number>(0);

    useEffect(() => {
        if (isRunning && seconds === 0) {
            onTimeUpdate(0);
        }
    }, [isRunning]);

    useEffect(() => {
        if (!isRunning) {
            setSeconds(0);
        }
    }, [isRunning]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prev) => {
                    const newTime = prev + 1;
                    onTimeUpdate(newTime);
                    return newTime;
                });
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning, onTimeUpdate]);

    const formatTime = (totalSeconds: number): string => {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="timer-container">
            <span className="timer-icon">⏱️</span>
            <span className="timer-display">{formatTime(seconds)}</span>
        </div>
    );
};

export const calculateScore = (time: number, errors: number, wordLength: number): number => {
    const baseScore = 1000;
    const timePenalty = time * 5;
    const errorPenalty = errors * 50;
    const lengthBonus = wordLength * 10;

    const finalScore = baseScore - timePenalty - errorPenalty + lengthBonus;

    // Le score ne peut pas être négatif
    return Math.max(0, finalScore);
};

export default Timer;
