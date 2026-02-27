import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Кнопка назад */}
        <Link
          href="/"
          className="inline-flex items-center mb-6 md:mb-10 text-purple-400 hover:text-purple-300 transition-colors text-sm md:text-base font-medium"
        >
          <span className="mr-2">←</span> Вернуться на главную
        </Link>

        <article className="prose prose-invert lg:prose-xl">
          <h1 className="text-2xl md:text-4xl font-extrabold mb-6 md:mb-10 text-white tracking-tight leading-tight">
            Политика конфиденциальности
          </h1>

          <div className="space-y-6 md:space-y-8 text-base md:text-lg leading-relaxed text-slate-300">
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4 border-b border-slate-700 pb-2">
                1. Сбор информации
              </h2>
              <p>
                Для предоставления персонального астрологического отчета мы
                собираем следующие данные:
              </p>
              <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>Имя (используется для обращения в тексте отчета);</li>
                <li>
                  Дата, время и место рождения (необходимы для расчета положения
                  небесных тел);
                </li>
                <li>
                  Адрес электронной почты (для отправки готового результата и
                  чека об оплате).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4 border-b border-slate-700 pb-2">
                2. Цель и правовое основание обработки
              </h2>
              <p>
                Обработка персональных данных осуществляется в соответствии с
                Федеральным законом № 152-ФЗ «О персональных данных». Ваши
                данные используются исключительно для исполнения условий
                Публичной оферты — автоматической генерации астрологического
                отчета.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4 border-b border-slate-700 pb-2">
                3. Безопасность платежей
              </h2>
              <p className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500 text-slate-200">
                🛡️ <strong>Безопасность:</strong> Все платежные операции
                проходят на стороне защищенного платежного шлюза ЮKassa (ООО НКО
                «ЮМани»). Мы не имеем доступа к данным ваших банковских карт и
                не храним их.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4 border-b border-slate-700 pb-2">
                4. Согласие
              </h2>
              <p>
                Нажимая кнопку «Оплатить» или «Рассчитать», вы даете согласие на
                обработку предоставленных вами персональных данных в рамках
                целей, указанных в настоящей политике.
              </p>
            </section>
          </div>
        </article>

        <footer className="mt-16 pt-8 border-t border-slate-800 text-sm text-slate-500 italic">
          Ваша конфиденциальность — наш приоритет. <br />
          Редакция от: {new Date().toLocaleDateString("ru-RU")}
        </footer>
      </div>
    </div>
  );
}
