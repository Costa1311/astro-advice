"use client";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Hero } from "@/components/Hero";
import { AstroForm } from "@/components/AstroForm";
import { Reading } from "@/components/Reading";
import NatalMap from "@/components/NatalMap";
import { PdfTemplate } from "@/components/PdfTemplate";
import { EmptyState } from "@/components/EmptyState";
import { Disclaimer } from "@/components/Footer";

// 1. Создаем внутренний компонент, где лежит вся твоя логика
function AstrologyContent() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);

  const searchParams = useSearchParams();

  // --- ЛОГИКА ОПЛАТЫ ---
  const handlePayment = async () => {
    if (!chartData) {
      alert("Сначала постройте карту!");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, date }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Не удалось создать счет");
      }
    } catch (err: any) {
      console.error("Yookassa Error:", err);
      alert("Ошибка платежной системы. Попробуйте позже.");
      setIsGenerating(false);
    }
  };

  // --- СЛЕЖКА ЗА СТАТУСОМ ОПЛАТЫ ---
  useEffect(() => {
    const paymentStatus = searchParams.get("payment");
    if (paymentStatus === "success" && chartData && !isPaidSuccess) {
      router.replace("/", { scroll: false });
      generateReading(true);
    }
  }, [searchParams, chartData]);

  // PDF логика
  const downloadPDF = async () => {
    const element = document.getElementById("pdf-template");
    if (!element) return;
    element.style.display = "block";
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const opt: any = {
        margin: 10,
        filename: `Astro_Report_${name}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };
      await html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error("Ошибка PDF:", error);
    } finally {
      element.style.display = "none";
    }
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/astrology", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, city, date, time }),
      });
      const data = await res.json();
      setChartData(data);
    } catch (err) {
      console.error("Ошибка:", err);
    } finally {
      setLoading(false);
    }
  };

  const generateReading = async (isPaid: boolean = false) => {
    if (!chartData) return;
    setIsGenerating(true);
    setInterpretation("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          city,
          date,
          planets: chartData.planets,
          houses: chartData.cusps,
          isPaid,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      if (data.text) {
        setInterpretation(data.text);
        if (isPaid) setIsPaidSuccess(true);
      }
    } catch (err: any) {
      alert(`Ошибка магии звезд: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white pb-20">
      <Hero />
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-12 items-start justify-center">
        <div className="w-full lg:w-[400px] lg:sticky lg:top-8 top-8">
          <AstroForm
            name={name}
            setName={setName}
            city={city}
            setCity={setCity}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            onSubmit={handleCalculate}
            loading={loading}
          />
        </div>

        <div className="w-full flex-1">
          {chartData ? (
            <div className="flex flex-col items-center">
              <div
                className={`w-full max-w-[550px] mb-8 transition-all duration-1000 ${
                  loading
                    ? "opacity-50 blur-sm scale-95"
                    : "opacity-100 blur-0 scale-100"
                }`}
              >
                <NatalMap data={chartData} />
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              <Reading
                interpretation={interpretation}
                isGenerating={isGenerating}
                isPaid={isPaidSuccess}
                onGenerateFree={() => generateReading(false)}
                onPay={handlePayment}
                onDownload={downloadPDF}
              />
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
      <PdfTemplate
        name={name}
        date={date}
        time={time}
        city={city}
        planets={chartData?.planets}
        interpretation={interpretation}
      />
      <Disclaimer />
    </main>
  );
}

export default function AstrologyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center text-white">
          Загрузка звезд...
        </div>
      }
    >
      <AstrologyContent />
    </Suspense>
  );
}
