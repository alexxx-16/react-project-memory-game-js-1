import { useEffect, useState } from "react";
import { Card } from "./components/Card";

const emojis = ["🍌", "🥝", "🍋", "🍓", "🥥", "🍇", "🫐", "🍉"];

const createDeck = () => {
  const deck = [...emojis, ...emojis] // double the emojis
    .sort(
      () => Math.random() - 0.5, // shuffle Fisher & Yates
    )
    .map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false, //define each objects
    }));

  return deck;
};

const App = () => {
  const [cards, setCards] = useState(createDeck());

  const [choiceA, setChoiceA] = useState(null);
  const [choiceB, setChoiceB] = useState(null);
  const [disabled, setDisabled] = useState(false); // user can click on cards

  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

  // user clicks on a card
  const handleChoice = (card) => {
    if (disabled || card.isFlipped || card.isMatched) return;

    // flip the chosen card
    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c)),
    );

    choiceA ? setChoiceB(card) : setChoiceA(card);
  };

  const restartGame = () => {
    setCards(createDeck());
    setChoiceA(null);
    setChoiceB(null);
    setDisabled(false);
    setScore(0);
    setMoves(0);
  };

  const resetTurn = () => {
    setChoiceA(null);
    setChoiceB(null);
    setDisabled(false);
  };

  // compare 2 cards
  useEffect(() => {
    if (choiceA && choiceB) {
      setDisabled(true); // cant click any more after picking 2 cards
      setMoves((prev) => prev + 1);

      //cards match
      if (choiceA.emoji === choiceB.emoji) {
        setCards((prev) =>
          prev.map((card) =>
            card.emoji === choiceA.emoji ? { ...card, isMatched: true } : card,
          ),
        );
        setScore((prev) => prev + 1);
        resetTurn();
      }
      //cards dont match
      else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === choiceA.id || card.id === choiceB.id
                ? { ...card, isFlipped: false }
                : card,
            ),
          );
          resetTurn();
        }, 500);
      }
    }
  }, [choiceA, choiceB]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-900 text-white">
      <h1 className="px-4 text-4xl font-bold text-purple-400">Memory Game</h1>
      <p>Score: {score}</p>
      <p>Moves: {moves}</p>
      <button onClick={restartGame}>New Game</button>
      <div className="grid grid-cols-4 grid-rows-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={() => handleChoice(card)}
            flipped={card.isFlipped || card.isMatched}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
