export const Card = ({ card, handleChoice, flipped }) => {
  return (
    <div
      className="flex aspect-square items-center justify-center rounded-xl bg-zinc-700 p-4 text-4xl transition-all duration-200 hover:bg-zinc-600 active:scale-95"
      onClick={handleChoice}
    >
      {flipped ? card.emoji : "?"}
    </div>
  );
};
