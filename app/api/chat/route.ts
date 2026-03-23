// import { NextResponse } from "next/server";
// import { getDestinyNumber } from "@/utils/getDestinyNumber";

// const getZodiacSign = (deg: number) => {
//   const signs = [
//     "Овен",
//     "Телец",
//     "Близнецы",
//     "Рак",
//     "Лев",
//     "Дева",
//     "Весы",
//     "Скорпион",
//     "Стрелец",
//     "Козерог",
//     "Водолей",
//     "Рыбы",
//   ];
//   const normalizedDeg = ((deg % 360) + 360) % 360;
//   const index = Math.floor(normalizedDeg / 30);
//   return signs[index];
// };

// export async function POST(request: Request) {
//   try {
//     const { name, planets, isPaid, date } = await request.json();

//     if (!planets) {
//       return NextResponse.json(
//         { error: "Данные планет не получены" },
//         { status: 400 },
//       );
//     }
//     const destinyNumber = getDestinyNumber(date);

//     // Подготовка данных с градусами
//     const detailedPlanets = Object.entries(planets)
//       .map(([p, d]: [string, any]) => {
//         // Извлекаем число из массива (берём первый элемент)
//         const degree = Array.isArray(d) ? d[0] : d;
//         const sign = getZodiacSign(degree as number);
//         const degInSign = Math.floor((degree as number) % 30);
//         return `${p}: ${sign} (${degInSign}°)`;
//       })
//       .join(", ");

//     const sunDegree = Array.isArray(planets.Sun) ? planets.Sun[0] : planets.Sun;
//     const moonDegree = Array.isArray(planets.Moon)
//       ? planets.Moon[0]
//       : planets.Moon;

//     const sunSign = getZodiacSign(Number(sunDegree));
//     const moonSign = getZodiacSign(Number(moonDegree));

//     let systemMessage = "";
//     let userPrompt = "";

//     if (isPaid) {
//       systemMessage = `Ты — элитный практикующий астропсихолог и нумеролог. Твоя задача — составить VIP-разбор натальной карты для ${name}. Ответ должен быть максимально глубоким, экспертным и объемным. ВНИМАНИЕ: Категорически запрещено использовать Markdown (звездочки, решетки). Используй только обычный текст, переносы строк и заглавные буквы для выделения`;
//       userPrompt = `
//         ДАННЫЕ ДЛЯ АНАЛИЗА:
//         - Имя: ${name}
//         - Дата рождения: ${date}
//         - Положения планет: ${detailedPlanets}
//         - Число Судьбы: ${destinyNumber}

//         ВАЖНОЕ ЗАДАНИЕ:
//         В списке планет может отсутствовать Лилит (Черная Луна).
//         Пожалуйста, самостоятельно определи положение Лилит на дату рождения ${date} и включи её подробный разбор в раздел №3 "Теневая сторона".
//         Не пиши фразу "Лилит не указана", просто сразу давай её интерпретацию на основе своих знаний эфемерид.

//         СТРУКТУРА ОТВЕТА (Пиши строго без символов **, используй двоеточия для заголовков):

//         🌟 1. АРХЕТИП И ПРЕДНАЗНАЧЕНИЕ:
//         Синтезируй влияние Солнца и Числа Судьбы (${destinyNumber}). В чем заключается высшая миссия этого человека? Какую главную ошибку прошлого воплощения он должен исправить?

//         💰 2. ФИНАНСОВАЯ СТРАТЕГИЯ:
//         На основе Марса и Юпитера определи "денежный код": через какие действия приходят ресурсы? Стоит ли идти в бизнес или развиваться в найме? Назови 3 конкретные ниши для успеха.

//         🌚 3. ТЕНЕВАЯ СТОРОНА И ПСИХОЛОГИЯ (ЛИЛИТ):
//         Разбери Венеру и Лилит (Черную Луну). Какой тип партнера притянет этого человека, а какой — разрушит? Опиши его "Тень" — скрытые качества, страхи и подавленные желания, которые являются ключом к его истинной силе. Что нужно проработать, чтобы избежать кармических ошибок в любви? "Используй среднюю Лилит (Mean Lilith) для анализа".

//         💎 4. РЕСУРСЫ И ТАЛИСМАНЫ:
//         Дай конкретный список: какой металл, камень (минерал) и цвет усиливают энергетику ${name}. В какие дни недели ему лучше назначать важные встречи?

//         🚀 5. ПРОГНОСТИЧЕСКИЙ ВЕКТОР НА 2026 ГОД:
//         Исходя из текущих положений, выдели 3 главных фокуса внимания на ближайшие 12 месяцев. Чего категорически нельзя делать, чтобы не слить энергию?

//         СТИЛЬ ПИСЬМА:
//         - Экспертный анализ, никакой воды. Обращайся на "Вы".
//         - Используй термины: "аспект", "энергия", "транзит", "кармический узел".
//         - Минимальный объем — 700-900 слов.

//         ПИШИ ПОДРОБНО, ПОКА НЕ РАЗБЕРЕШЬ ВСЕ 5 ПУНКТОВ.
//       `;
//     } else {
//       systemMessage = "Ты — краткий и интригующий астролог.";
//       userPrompt = `
//         Сделай краткий демо-разбор для ${name}.
//         ФАКТЫ: Солнце в ${sunSign}, Луна в ${moonSign}.
//         ЗАДАЧА: Напиши ОДИН абзац о главной психологической черте пользователя.
//         В конце добавь ОДНО предложение о том, что его Венера и Лилит скрывают важные ключи к богатству и тени, которые доступны в полном VIP-разборе.
//         Не используй символы **. Стиль: Провокационный и интригующий.
//       `;
//     }

//     const response = await fetch(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           "HTTP-Referer": "https://astro-advice.ru",
//           "X-Title": "Astro Advice Project",
//         },
//         body: JSON.stringify({
//           model:
//             "deepseek/deepseek-chat:provider:deepinfra,deepseek/deepseek-chat:provider:novita",
//           messages: [
//             { role: "system", content: systemMessage },
//             { role: "user", content: userPrompt },
//           ],
//           temperature: 0.8,
//           max_tokens: isPaid ? 2000 : 400,
//         }),
//       },
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       console.error("===> OpenRouter Error:", data);
//       return NextResponse.json(
//         { error: data.error?.message || "API Error" },
//         { status: response.status },
//       );
//     }

//     console.log("===> [API] Success!");
//     return NextResponse.json({ text: data.choices[0].message.content });
//   } catch (err: any) {
//     console.error("===> [API] CRITICAL ERROR:", err.message);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }
import { NextResponse } from "next/server";
import { getDestinyNumber } from "@/utils/getDestinyNumber";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, planets, isPaid, date } = body;

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey)
      return NextResponse.json({ error: "API Key missing" }, { status: 500 });

    // 1. Исправляем ошибку типов (2322) раз и навсегда
    let destinyNumStr: string = "7";
    try {
      const num = getDestinyNumber(date || "01.01.1990");
      destinyNumStr = String(num);
    } catch (e) {
      console.error("Destiny Error:", e);
    }

    // 2. Чистим данные планет от массивов
    let planetsSummary = "";
    if (planets) {
      planetsSummary = Object.entries(planets)
        .map(([p, d]: [string, any]) => {
          const val = Array.isArray(d) ? d[0] : d;
          return `${p}: ${Math.floor(Number(val))}°`;
        })
        .join(", ");
    }

    const systemMsg = isPaid
      ? "Ты элитный астролог. Напиши текст от 700 слов. БЕЗ Markdown (** или #)."
      : "Ты краткий астролог. Напиши 1 интригующий абзац без Markdown.";

    // 3. Запрос с глубокой проверкой ответа
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "https://astro-advice.ru",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat", // Базовое имя модели
          messages: [
            { role: "system", content: systemMsg },
            {
              role: "user",
              content: `Имя: ${name}, Число: ${destinyNumStr}, Планеты: ${planetsSummary}. Разбор:`,
            },
          ],
          // ГАРАНТИЯ ОБХОДА GOOGLE:
          routing: {
            order: ["deepinfra", "together", "novita"], // Только эти ребята
            allow_fallbacks: false, // Запрещаем переключаться на кого-то еще (на Google)
          },
          temperature: 0.7,
          max_tokens: isPaid ? 2000 : 450,
        }),
      },
    );

    const data = await response.json();

    // ПРОВЕРКА: Если OpenRouter прислал ошибку, не падаем, а показываем её
    if (!response.ok || !data.choices || !data.choices[0]) {
      console.error("OpenRouter Response Problem:", data);
      return NextResponse.json(
        {
          error: "Нейросеть занята",
          details: data.error?.message || "Попробуйте позже",
        },
        { status: response.status || 500 },
      );
    }

    return NextResponse.json({ text: data.choices[0].message.content });
  } catch (err: any) {
    console.error("Final Catch Error:", err.message);
    return NextResponse.json(
      { error: "Ошибка сервера", message: err.message },
      { status: 500 },
    );
  }
}
