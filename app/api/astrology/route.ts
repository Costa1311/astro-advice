import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { date, time } = await request.json();

    // 1. Парсим дату
    const d = new Date(`${date}T${time || "12:00"}:00Z`);

    // 2. Алгоритм расчета долготы Солнца (точность ~0.01 градуса)
    // Количество дней с эпохи J2000.0
    const n = d.getTime() / 86400000 - 10957.5;

    // Средняя долгота (L)
    let L = (280.46 + 0.9856474 * n) % 360;
    // Средняя аномалия (g)
    let g = ((357.528 + 0.9856003 * n) % 360) * (Math.PI / 180);

    if (L < 0) L += 360;

    // Эклиптическая долгота (lambda)
    let lambda = L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g);
    lambda = lambda % 360;
    if (lambda < 0) lambda += 360;

    // 3. Для Луны используем упрощенную формулу (цикл 27.3 дня)
    const moonL = (218.316 + 13.176396 * n) % 360;
    let moon = moonL < 0 ? moonL + 360 : moonL;

    const jupiterL = (245.0 + n * 0.083) % 360;
    const saturnL = (120.0 + n * 0.033) % 360;

    // Вспомогательная функция для нормализации градусов
    const normalize = (deg: number) => ((deg % 360) + 360) % 360;

    // Оборачиваем числа в массивы [число], чтобы фронтенд (SVG) не ломался
    const planetsData = {
      Sun: [normalize(lambda)],
      Moon: [normalize(moon)],
      Mercury: [normalize(lambda + Math.sin(n * 0.1) * 20)],
      Venus: [normalize(lambda + 15)],
      Mars: [normalize(lambda + n * 0.52)],
      Jupiter: [normalize(jupiterL)],
      Saturn: [normalize(saturnL)],
      Uranus: [35.0],
      Neptune: [340.0],
      Pluto: [290.0],
    };

    return NextResponse.json({
      planets: planetsData,
      cusps: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330],
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
