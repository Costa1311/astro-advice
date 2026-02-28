export const runtime = 'edge';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // ЮKassa присылает событие payment.succeeded, когда оплата прошла
    if (data.event === "payment.succeeded") {
      const paymentId = data.object.id;
      const amount = data.object.amount.value;
      const description = data.object.description;

      console.log(`✅ ОПЛАТА ПОЛУЧЕНА: ID ${paymentId}, сумма ${amount}`);
      console.log(`Инфо: ${description}`);

      // ТУТ БУДЕТ ЛОГИКА:
      // Например, отправить email пользователю с его разбором
      // или сохранить ID платежа в базу данных.
    }

    // ЮKassa ждет ответ 200 OK, чтобы перестать присылать уведомление
    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json({ error: "Webhook Error" }, { status: 500 });
  }
}
