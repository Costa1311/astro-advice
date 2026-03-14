import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (data.event === "payment.succeeded") {
      const payment = data.object;

      // Достаем только те данные, которые реально есть в форме
      const { name, date } = payment.metadata || {};
      const paymentId = payment.id;
      const amount = payment.amount.value;

      console.log(`💰 ПЛАТЕЖ ПОДТВЕРЖДЕН:`);
      console.log(`- Сумма: ${amount} руб.`);
      console.log(`- Пользователь: ${name}`);
      console.log(`- Дата рождения: ${date}`);
      console.log(`- ID транзакции: ${paymentId}`);
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json({ status: "ok" });
  }
}
