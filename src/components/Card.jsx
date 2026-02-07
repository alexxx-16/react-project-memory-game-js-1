export const Card = ({ card, flipped, handleChoice }) => {
  return (
    <div
      onClick={() => handleChoice(card)}
      className="flex aspect-square items-center justify-center rounded-xl bg-zinc-700 p-4 text-5xl font-bold text-pink-400 shadow-lg transition-all duration-200 hover:scale-105 hover:border-2 hover:border-teal-300 hover:text-teal-400 active:scale-95"
    >
      <span>{flipped ? card.emoji : "?"}</span>
    </div>
  );
};
