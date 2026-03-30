import { formatAstrologyText } from "@/utils/formatAstrologyText";
import { ReadingSkeleton } from "./ui/ReadingSkeleton";
import { useState, useEffect } from "react";

interface ReadingProps {
  interpretation: string;
  isGenerating: boolean;
  isPaid: boolean;
  onGenerateFree: () => void;
  onPay: () => void;
  onDownload: () => void;
}

export const Reading = ({
  interpretation,
  isGenerating,
  isPaid,
  onGenerateFree,
  onPay,
  onDownload,
}: ReadingProps) => {
  const [loadingText, setLoadingText] = useState(
    "Считываем положение планет...",
  );

  useEffect(() => {
    if (isGenerating && isPaid) {
      const phrases = [
        "Считываем положение планет...",
        "Анализируем влияние Лилит на вашу судьбу...",
        "Раскрываем финансовые узлы Юпитера...",
        "Синтезируем предназначение по Числу Судьбы...",
        "Звезды почти выстроились в ряд...",
      ];
      let i = 0;
      const interval = setInterval(() => {
        i = (i + 1) % phrases.length;
        setLoadingText(phrases[i]);
      }, 3500); // Меняем фразу каждые 3.5 секунды
      return () => clearInterval(interval);
    }
  }, [isGenerating, isPaid]);

  //   if (isGenerating) {
  //     return (
  //       <div className="w-full py-12 flex flex-col items-center space-y-4">
  //         <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
  //         <ReadingSkeleton />
  //         <p className="text-purple-400 animate-pulse font-medium">
  //           Считываем положение планет...
  //         </p>
  //       </div>
  //     );
  //   }
  if (isGenerating) {
    return (
      <div className="w-full py-12 flex flex-col items-center space-y-6 text-center">
        {/* Более красивый спиннер */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500/20 rounded-full" />
          <div className="absolute top-0 w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            ✨
          </div>
        </div>

        <div className="w-full max-w-md">
          <ReadingSkeleton />
        </div>

        <div className="space-y-2">
          <p className="text-xl font-medium bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
            {isPaid ? loadingText : "Минутку, звезды говорят..."}
          </p>
          {isPaid && (
            <p className="text-xs text-gray-500 italic">
              VIP-разбор генерируется дольше обычного, так как содержит более
              800 слов
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {interpretation ? (
        <div className="p-6 bg-gray-900/50 border border-purple-500/30 rounded-2xl shadow-2xl backdrop-blur-sm">
          <h4 className="text-purple-400 font-bold mb-4 flex items-center gap-2">
            {isPaid ? "🔮 Ваш VIP-разбор" : "✨ Ознакомительный фрагмент"}
          </h4>
          <div className="text-gray-200 leading-relaxed prose prose-invert max-w-none">
            {formatAstrologyText(interpretation)}
          </div>

          {isPaid ? (
            <button
              onClick={onDownload}
              className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 border border-purple-500/50 rounded-xl text-purple-300 transition-all flex items-center justify-center gap-2"
            >
              📥 Скачать полный PDF отчет
            </button>
          ) : (
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 rounded-xl text-center">
              <p className="text-sm text-purple-200 mb-4">
                Это лишь 10% вашей карты. Узнайте всё о деньгах, любви и
                предназначении.
              </p>
              <button
                onClick={onPay}
                className="relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 group"
              >
                <div className="absolute transitiona-all duration-1000 opacity-70 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:duration-200"></div>
                <span className="relative">Получить VIP-разбор</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={onGenerateFree}
          className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all"
        >
          ✨ Получить бесплатный анализ личности
        </button>
      )}
    </div>
  );
};
