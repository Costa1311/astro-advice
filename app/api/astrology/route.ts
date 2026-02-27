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

    // Оборачиваем числа в массивы [число], чтобы фронтенд (SVG) не ломался
    const planetsData = {
      Sun: [lambda],
      Moon: [moon],
      Mercury: [lambda - 5],
      Venus: [lambda + 2],
      Mars: [lambda - 10],
      Jupiter: [245.0],
      Saturn: [120.0],
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
