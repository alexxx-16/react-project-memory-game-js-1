export const Card = ({ card, flipped, handleChoice }) => {
  return (
    <div
      onClick={() => handleChoice(card)}
      className="flex aspect-square items-center justify-center rounded-xl bg-zinc-700 p-4 text-4xl font-bold text-pink-400 hover:border-2 hover:border-teal-400 active:scale-95"
    >
      {flipped ? card.emoji : "?"}
    </div>
  );
};
