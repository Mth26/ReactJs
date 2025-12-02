import Keyboard from "./Keyboard";
import WordDisplay from "./WordDisplay";


export default function Game() {
    return (
        <div>
            <WordDisplay letters={[]} />
            <Keyboard onSelectLetter={(letter) => { console.log(letter) }} playedLetters={[]} />
        </div>
    );
}
