export const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border-2 border-teal-400 px-3 py-1 text-xl text-white transition-all duration-200 hover:scale-102 hover:border-teal-200 hover:bg-zinc-700 hover:text-teal-200 hover:shadow-[0_0_15px_rgba(45,212,191,0.6)] active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
};
