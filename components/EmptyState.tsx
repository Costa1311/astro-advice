export const EmptyState = () => {
  return (
    <div className="w-full max-w-[450px] aspect-square border-2 border-dashed border-white/10 rounded-full flex flex-col items-center justify-center text-gray-500 text-center p-8 mt-10 animate-pulse">
      <div className="relative">
        <span className="text-6xl mb-4 block grayscale opacity-30">✨</span>
        {/* Декоративное кольцо вокруг иконки */}
        <div className="absolute top-0 left-0 w-full h-full border border-purple-500/20 rounded-full animate-ping" />
      </div>
      <h3 className="text-white/60 font-medium mb-2">
        Звезды ждут ваших данных
      </h3>
      <p className="text-sm leading-relaxed opacity-50">
        Заполните форму слева, чтобы мы могли рассчитать положение планет в
        момент вашего рождения и составить прогноз.
      </p>
    </div>
  );
};
