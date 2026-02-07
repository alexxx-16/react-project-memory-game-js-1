export const ScoredBoard = ({ score, moves, restartGame }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 p-4">
      <h1 className="rounded-xl border-2 border-pink-500 px-6 py-1.5 text-4xl text-teal-400 shadow-[0_0_15px_rgba(236,72,153,0.7)]">
        Memory Game
      </h1>
      <div className="flex w-full justify-center gap-8 text-2xl text-white">
        <p>
          Score:
          <span className="font-mono font-semibold text-pink-400">
            {" "}
            {score}
          </span>
        </p>
        <p>
          Moves:
          <span className="font-mono font-semibold text-pink-400">
            {" "}
            {moves}
          </span>
        </p>
      </div>
      <button
        onClick={restartGame}
        className="rounded-xl border-2 border-teal-400 px-2 py-1 text-xl text-white transition-all duration-200 hover:border-teal-200 hover:text-teal-200 hover:shadow-[0_0_15px_rgba(45,212,191,0.6)] active:scale-95"
      >
        New Game
      </button>
    </div>
  );
};
