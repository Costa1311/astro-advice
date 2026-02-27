export const Hero = () => {
  return (
    <div className="relative pt-20 pb-16 px-4 flex flex-col items-center text-center">
      {/* Декоративное свечение на фоне */}
      <div className="absolute top-0 -z-10 h-[400px] w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent blur-3xl" />

      {/* Метка над заголовком */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-6 animate-fade-in">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
        </span>
        Астрология следующего поколения
      </div>

      {/* Главный заголовок */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 tracking-tight mb-6">
        Твоя судьба, <br />
        <span className="text-purple-500">записанная в звёздах</span>
      </h1>

      {/* Описание */}
      <p className="max-w-2xl text-gray-400 text-lg md:text-xl leading-relaxed mb-10">
        Получи глубокий психологический разбор личности и финансовой стратегии
        на основе твоей натальной карты. Начни свой путь к самопознанию прямо
        сейчас.
      </p>

      {/* Индикатор доверия (опционально) */}
      <div className="flex items-center gap-6 text-gray-500 text-sm border-t border-white/5 pt-8">
        <div className="flex flex-col items-center">
          <span className="font-bold text-white">4000+</span>
          <span>токенов в отчете</span>
        </div>
        <div className="h-8 w-[1px] bg-white/10" />
        <div className="flex flex-col items-center">
          <span className="font-bold text-white">100%</span>
          <span>анонимно</span>
        </div>
      </div>
    </div>
  );
};
