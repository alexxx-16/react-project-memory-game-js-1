import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import { ScoredBoard } from "./components/ScoreBoard";
import { Button } from "./components/Button";

const emojis = ["🐶", "🐱", "🦁", "🐯", "🐼", "🐨", "🐙", "🦊"];

const generateDeck = () => {
  const shuffledDeck = [...emojis, ...emojis]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
  return shuffledDeck;
};

const App = () => {
  const [cards, setCards] = useState(generateDeck());
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);

  const [clickDisabled, setClickDisabled] = useState(false);

  const initialiseGame = () => {
    setCards(generateDeck());
    setChoiceOne(null);
    setChoiceTwo(null);
    setScore(0);
    setMoves(0);
    setClickDisabled(false);
  };

  const nextRound = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setMoves((prev) => prev + 1);
    setClickDisabled(false);
  };

  // when user clicks on a card
  const handleChoice = (card) => {
    // choice not valid
    if (clickDisabled || card.isFlipped || card.isMatched) return;
    // choice is valid, set ifFlipped to true
    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c)),
    );
    // choice one or choice two
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare two cards
  useEffect(() => {
    // user picked 2 cards, cant click on other cards while calculating
    if (choiceOne && choiceTwo) {
      setClickDisabled(true);

      //match
      if (choiceOne.emoji === choiceTwo.emoji) {
        setCards((prev) =>
          prev.map((card) =>
            card.emoji === choiceOne.emoji
              ? { ...card, isMatched: true }
              : card,
          ),
        );
        setScore((prev) => prev + 1);
        nextRound();
      }
      //no match, change flipped to false
      else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === choiceOne.id || card.id === choiceTwo.id
                ? { ...card, isFlipped: false }
                : card,
            ),
          );
          nextRound();
        }, 800);
      }
    }
  }, [choiceOne, choiceTwo]);

  const isGameWon = score === emojis.length;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-zinc-800 py-4">
      <ScoredBoard score={score} moves={moves} restartGame={initialiseGame} />
      <div className="grid w-full max-w-lg grid-cols-4 grid-rows-4 gap-4 p-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            flipped={card.isFlipped || card.isMatched}
            handleChoice={handleChoice}
          />
        ))}
      </div>
      {isGameWon && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 bg-zinc-950/60 backdrop-blur-sm">
          <h1 className="text-6xl font-semibold text-teal-400">You Won!</h1>
          <p className="text-3xl text-pink-400">It took you {moves} moves.</p>

          <Button onClick={initialiseGame}>Play Again</Button>
        </div>
      )}
    </div>
  );
};

export default App;
