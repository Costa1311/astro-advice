import Link from "next/link";

export default function LegalPage() {
  return (
    // Добавили более гибкие отступы py-8 на мобильных и py-12 на десктопе
    <div className="min-h-screen bg-[#0f172a] text-slate-200 py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Кнопка назад — увеличили область нажатия для пальца */}
        <Link
          href="/"
          className="inline-flex items-center mb-6 md:mb-10 text-purple-400 hover:text-purple-300 transition-colors text-sm md:text-base font-medium"
        >
          <span className="mr-2">←</span> Вернуться на главную
        </Link>

        <article>
          {/* Адаптивный заголовок: text-2xl на мобилках, text-4xl на десктопе */}
          <h1 className="text-2xl md:text-4xl font-extrabold mb-6 md:mb-10 text-white tracking-tight leading-tight">
            Пользовательское соглашение
          </h1>

          <div className="space-y-6 md:space-y-8 text-base md:text-lg leading-relaxed text-slate-300">
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4 border-b border-slate-700 pb-2">
                1. Общие положения
              </h2>
              <p>
                Данный сервис предоставляет автоматизированные отчеты,
                основанные на астрологических алгоритмах. Настоящий документ
                является публичной офертой.
              </p>
            </section>

            <section>
              {/* Плашка — сделали её менее громоздкой на мобильных */}
              <div className="bg-slate-800/50 p-4 md:p-5 rounded-lg border-l-4 border-purple-500 text-slate-200 shadow-inner">
                <h3 className="text-white font-bold mb-2 flex items-center">
                  <span className="mr-2 text-lg">⚠️</span> Важное примечание
                </h3>
                <p className="text-sm md:text-base italic">
                  Все материалы носят исключительно информационный и
                  развлекательный характер. Они не являются медицинскими,
                  финансовыми или юридическими рекомендациями.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4 border-b border-slate-700 pb-2">
                2. Персональные данные
              </h2>
              <p>
                Мы используем предоставленные вами данные: имя, дату, место и
                время рождения исключительно для работы алгоритма. Мы не
                передаем эти данные третьим лицам.
              </p>
            </section>
          </div>
        </article>

        <footer className="mt-12 md:mt-16 pt-6 border-t border-slate-800 text-xs md:text-sm text-slate-500">
          Последнее обновление: {new Date().toLocaleDateString("ru-RU")}
        </footer>
      </div>
    </div>
  );
}
