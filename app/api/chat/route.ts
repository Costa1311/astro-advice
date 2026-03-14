export const runtime = "edge";
import { NextResponse } from "next/server";
import { getDestinyNumber } from "@/utils/getDestinyNumber";

const getZodiacSign = (deg: number) => {
  const signs = [
    "Овен",
    "Телец",
    "Близнецы",
    "Рак",
    "Лев",
    "Дева",
    "Весы",
    "Скорпион",
    "Стрелец",
    "Козерог",
    "Водолей",
    "Рыбы",
  ];
  const normalizedDeg = ((deg % 360) + 360) % 360;
  const index = Math.floor(normalizedDeg / 30);
  return signs[index];
};

export async function POST(request: Request) {
  try {
    const { name, planets, isPaid, date } = await request.json();
    const destinyNumber = getDestinyNumber(date);

    // Подготовка данных с градусами для ИИ
    const detailedPlanets = Object.entries(planets)
      .map(
        ([p, d]) =>
          `${p}: ${getZodiacSign(d as number)} (${Math.round((d as number) % 30)}°)`,
      )
      .join(", ");

    const sunSign = getZodiacSign(planets.Sun);
    const moonSign = getZodiacSign(planets.Moon);

    let systemMessage = "";
    let userPrompt = "";

    if (isPaid) {
      systemMessage = `Ты — элитный практикующий астропсихолог и нумеролог. Твоя задача — составить VIP-разбор натальной карты для ${name}. Ответ должен быть максимально глубоким, экспертным и объемным. ВНИМАНИЕ: Категорически запрещено использовать Markdown (звездочки, решетки). Используй только обычный текст, переносы строк и заглавные буквы для выделения`;
      userPrompt = `
        ДАННЫЕ ДЛЯ АНАЛИЗА:
        - Имя: ${name}
        - Дата рождения: ${date} 
        - Положения планет: ${detailedPlanets}
        - Число Судьбы: ${destinyNumber}

        ВАЖНОЕ ЗАДАНИЕ: 
        В списке планет может отсутствовать Лилит (Черная Луна). 
        Пожалуйста, самостоятельно определи положение Лилит на дату рождения ${date} и включи её подробный разбор в раздел №3 "Теневая сторона". 
        Не пиши фразу "Лилит не указана", просто сразу давай её интерпретацию на основе своих знаний эфемерид.

        СТРУКТУРА ОТВЕТА (Пиши строго без символов **, используй двоеточия для заголовков):
        
        🌟 1. АРХЕТИП И ПРЕДНАЗНАЧЕНИЕ:
        Синтезируй влияние Солнца и Числа Судьбы (${destinyNumber}). В чем заключается высшая миссия этого человека? Какую главную ошибку прошлого воплощения он должен исправить?

        💰 2. ФИНАНСОВАЯ СТРАТЕГИЯ:
        На основе Марса и Юпитера определи "денежный код": через какие действия приходят ресурсы? Стоит ли идти в бизнес или развиваться в найме? Назови 3 конкретные ниши для успеха.

        🌚 3. ТЕНЕВАЯ СТОРОНА И ПСИХОЛОГИЯ (ЛИЛИТ):
        Разбери Венеру и Лилит (Черную Луну). Какой тип партнера притянет этого человека, а какой — разрушит? Опиши его "Тень" — скрытые качества, страхи и подавленные желания, которые являются ключом к его истинной силе. Что нужно проработать, чтобы избежать кармических ошибок в любви? "Используй среднюю Лилит (Mean Lilith) для анализа".

        💎 4. РЕСУРСЫ И ТАЛИСМАНЫ:
        Дай конкретный список: какой металл, камень (минерал) и цвет усиливают энергетику ${name}. В какие дни недели ему лучше назначать важные встречи?

        🚀 5. ПРОГНОСТИЧЕСКИЙ ВЕКТОР НА 2026 ГОД:
        Исходя из текущих положений, выдели 3 главных фокуса внимания на ближайшие 12 месяцев. Чего категорически нельзя делать, чтобы не слить энергию?

        СТИЛЬ ПИСЬМА:
        - Экспертный анализ, никакой воды. Обращайся на "Вы".
        - Используй термины: "аспект", "энергия", "транзит", "кармический узел".
        - Минимальный объем — 700-900 слов.

        ПИШИ ПОДРОБНО, ПОКА НЕ РАЗБЕРЕШЬ ВСЕ 5 ПУНКТОВ.
      `;
    } else {
      systemMessage = "Ты — краткий и интригующий астролог.";
      userPrompt = `
        Сделай краткий демо-разбор для ${name}.
        ФАКТЫ: Солнце в ${sunSign}, Луна в ${moonSign}.
        ЗАДАЧА: Напиши ОДИН абзац о главной психологической черте пользователя. 
        В конце добавь ОДНО предложение о том, что его Венера и Лилит скрывают важные ключи к богатству и тени, которые доступны в полном VIP-разборе.
        Не используй символы **. Стиль: Провокационный и интригующий.
      `;
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://astro-advice.ru",
          "X-Title": "Astro Advice VIP",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-001",
          messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.85,
          max_tokens: isPaid ? 6000 : 800,
        }),
      },
    );

    const data = await response.json();

    if (data.choices && data.choices[0]?.message?.content) {
      return NextResponse.json({ text: data.choices[0].message.content });
    }

    if (!response.ok) {
      console.error("ОШИБКА OPENROUTER:", data);
      return NextResponse.json(
        { error: data.error?.message || "Ошибка API" },
        { status: response.status },
      );
    }

    return NextResponse.json(
      { error: "Ошибка API OpenRouter" },
      { status: 500 },
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
