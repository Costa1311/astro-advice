import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { name, date } = await req.json();

    const shopId = process.env.YOOKASSA_SHOP_ID;
    const secretKey = process.env.YOOKASSA_SECRET_KEY;
    const idempotenceKey = crypto.randomUUID(); // Уникальный ключ для защиты от повторов

    // Кодируем данные для Basic Auth
    const auth = Buffer.from(`${shopId}:${secretKey}`).toString("base64");

    const response = await fetch("https://api.yookassa.ru/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Idempotence-Key": idempotenceKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: {
          value: "490.00",
          currency: "RUB",
        },
        payment_method_data: {
          type: "bank_card",
        },
        confirmation: {
          type: "redirect",
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?payment=success`,
        },
        description: `VIP разбор натальной карты для ${name} (${date})`,
        capture: true,
      }),
    });

    const data = await response.json();

    if (response.ok && data.confirmation?.confirmation_url) {
      return NextResponse.json({ url: data.confirmation.confirmation_url });
    }

    console.error("Yookassa API Error:", data);
    throw new Error(data.description || "Ошибка ЮKassa");
  } catch (err: any) {
    console.error("Payment Error:", err);
    return NextResponse.json(
      { error: "Не удалось создать платеж" },
      { status: 500 },
    );
  }
}
