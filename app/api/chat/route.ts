import { NextResponse } from "next/server";
import { getDestinyNumber } from "@/utils/getDestinyNumber";

export const dynamic = "force-dynamic";

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
  const rawKey = process.env.SILICON_API_KEY || "";
  const key = rawKey.replace(/[\n\r\s\t]/g, "").trim();
  console.log("--- [SERVER-SIDE] AUTH CHECK ---");
  console.log("API Key Present:", !!key);
  if (key) console.log("Символов в ключе:", key.length);

  if (!key) {
    return NextResponse.json(
      { error: "API Key is missing in server environment variables." },
      { status: 401 },
    );
  }

  try {
    const { name, planets, isPaid, date } = await request.json();

    if (!planets) {
      return NextResponse.json(
        { error: "Данные планет не получены" },
        { status: 400 },
      );
    }
    const destinyNumber = String(getDestinyNumber(date || "01.01.1990"));

    // Подготовка данных с градусами
    const detailedPlanets = Object.entries(planets)
      .map(([p, d]: [string, any]) => {
        const degree = Array.isArray(d) ? d[0] : d;
        const sign = getZodiacSign(degree as number);
        const degInSign = Math.floor((degree as number) % 30);
        return `${p}: ${sign} (${degInSign}°)`;
      })
      .join(", ");

    const sunDegree = Array.isArray(planets.Sun) ? planets.Sun[0] : planets.Sun;
    const moonDegree = Array.isArray(planets.Moon)
      ? planets.Moon[0]
      : planets.Moon;

    const sunSign = getZodiacSign(Number(sunDegree));
    const moonSign = getZodiacSign(Number(moonDegree));

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
      "https://api.siliconflow.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "deepseek-ai/DeepSeek-V3",
          messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.8,
          max_tokens: isPaid ? 3000 : 600,
          stream: false,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("SILICONFLOW ERROR:", data);
      console.error("!!! НОВЫЙ КОД ЗАПУЩЕН !!!");
      return NextResponse.json(
        { error: "API Error", details: data },
        { status: response.status },
      );
    }

    return NextResponse.json({ text: data.choices[0].message.content });
  } catch (err: any) {
    console.error("CRITICAL ERROR:", err.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
