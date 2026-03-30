// export const PdfTemplate = ({
//   name,
//   date,
//   time,
//   city,
//   interpretation,
//   planets,
// }: any) => {
//   return (
//     <div
//       id="pdf-template"
//       style={{
//         display: "none",
//         padding: "50px 80px", // Увеличили боковые отступы (второе значение)
//         backgroundColor: "white",
//         color: "#000000",
//         fontFamily: "Arial, sans-serif",
//         width: "750px", // Немного уменьшили общую ширину для запаса
//         boxSizing: "border-box",
//       }}
//     >
//       <div style={{ textAlign: "center", marginBottom: "30px" }}>
//         <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "#9810fa" }}>
//           Астрологический анализ
//         </h1>
//       </div>

//       <div
//         style={{
//           marginBottom: "25px",
//           fontSize: "13px",
//           borderBottom: "1px solid #eee",
//           paddingBottom: "15px",
//         }}
//       >
//         <p style={{ margin: "4px 0" }}>
//           <strong>Имя:</strong> {name}
//         </p>
//         <p style={{ margin: "4px 0" }}>
//           <strong>Данные:</strong> {date} {time}, {city}
//         </p>
//       </div>

//       <div style={{ marginBottom: "30px" }}>
//         <h3
//           style={{ fontSize: "16px", marginBottom: "10px", color: "#9810fa" }}
//         >
//           Положения планет
//         </h3>
//         <div style={{ display: "flex", flexWrap: "wrap" }}>
//           {planets &&
//             Object.entries(planets).map(([planet, data]: any) => (
//               <div
//                 key={planet}
//                 style={{ width: "33%", marginBottom: "8px", fontSize: "12px" }}
//               >
//                 <strong style={{ textTransform: "capitalize" }}>
//                   {planet}:
//                 </strong>{" "}
//                 {Math.round(
//                   Array.isArray(data) ? data[0] : data.longitude || data,
//                 )}
//                 °
//               </div>
//             ))}
//         </div>
//       </div>

//       <div style={{ display: "block" }}>
//         {interpretation
//           ?.split("\n")
//           .filter((p: string) => p.trim() !== "")
//           .map((paragraph: string, idx: number) => (
//             <div
//               key={idx}
//               style={{
//                 marginBottom: "15px",
//                 fontSize: "13px", // Уменьшили шрифт с 15 до 13
//                 lineHeight: "1.7",
//                 textAlign: "left",
//                 pageBreakInside: "avoid",
//                 display: "block",
//                 wordBreak: "break-word", // Защита от вылета длинных слов
//                 maxWidth: "100%", // Ограничение по ширине родителя
//               }}
//             >
//               {paragraph.trim()}
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };
"use client";
import React from "react";

export const PdfTemplate = ({
  name,
  date,
  time,
  city,
  interpretation,
  planets,
}: any) => {
  if (!interpretation) return null;

  return (
    <div
      id="pdf-template"
      style={{
        display: "none", // Скрыт на странице, виден для html2pdf
        backgroundColor: "#0a0a0c", // Темный фон как в приложении
        color: "#f8fafc",
        fontFamily: "serif",
        width: "794px", // Ширина A4 при 96 DPI
        boxSizing: "border-box",
      }}
    >
      {/* --- СТРАНИЦА 1: ОБЛОЖКА --- */}
      <div
        style={{
          height: "1120px", // Высота A4
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "16px solid #1e1b4b", // Глубокая синяя рамка
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "40px",
            color: "#fbbf24",
            fontSize: "24px",
          }}
        >
          ✦ ✦ ✦
        </div>

        <h1
          style={{
            fontSize: "42px",
            textAlign: "center",
            color: "#fbbf24",
            textTransform: "uppercase",
            letterSpacing: "4px",
            marginBottom: "20px",
          }}
        >
          Книга Судьбы
        </h1>

        <div
          style={{
            width: "100px",
            height: "2px",
            backgroundColor: "#fbbf24",
            marginBottom: "40px",
          }}
        ></div>

        <p
          style={{
            fontSize: "18px",
            color: "#a5b4fc",
            fontStyle: "italic",
            marginBottom: "60px",
          }}
        >
          Персональный VIP-анализ натальной карты
        </p>

        <div
          style={{
            backgroundColor: "#16161a",
            padding: "40px",
            border: "1px solid rgba(251, 191, 36, 0.3)",
            borderRadius: "12px",
            textAlign: "center",
            width: "100%",
          }}
        >
          <h2
            style={{
              color: "#fbbf24",
              fontSize: "14px",
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "15px",
            }}
          >
            Подготовлено для:
          </h2>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            {name}
          </p>
          <p style={{ color: "#94a3b8", fontSize: "16px" }}>
            {date} в {time}, {city}
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "60px",
            fontSize: "12px",
            color: "rgba(251, 191, 36, 0.4)",
            letterSpacing: "2px",
          }}
        >
          © ASTROLOGY AI PREMIER
        </div>
      </div>

      {/* --- СТРАНИЦА 2: ТАБЛИЦА ПЛАНЕТ --- */}
      <div
        style={{
          padding: "60px 80px",
          borderLeft: "16px solid #1e1b4b",
          borderRight: "16px solid #1e1b4b",
        }}
      >
        <h3
          style={{
            color: "#fbbf24",
            fontSize: "20px",
            borderBottom: "1px solid #fbbf24",
            paddingBottom: "10px",
            marginBottom: "30px",
          }}
        >
          Космический паспорт
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "15px",
            marginBottom: "50px",
          }}
        >
          {planets &&
            Object.entries(planets).map(([planet, data]: any) => (
              <div
                key={planet}
                style={{
                  padding: "15px",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    color: "#64748b",
                    textTransform: "uppercase",
                    marginBottom: "5px",
                  }}
                >
                  {planet}
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    color: "#c084fc",
                    fontWeight: "bold",
                  }}
                >
                  {Math.round(
                    Array.isArray(data) ? data[0] : data.longitude || data,
                  )}
                  °
                </div>
              </div>
            ))}
        </div>

        {/* --- ТЕКСТ РАЗБОРА --- */}
        <div style={{ marginTop: "40px" }}>
          {interpretation
            ?.split("\n")
            .filter((p: string) => p.trim() !== "")
            .map((paragraph: string, idx: number) => {
              // Если параграф начинается с цифры или эмодзи — делаем его похожим на заголовок
              const isHeader = /^[0-9🌟💰🌚💎🚀]/.test(paragraph.trim());

              return (
                <div
                  key={idx}
                  style={{
                    marginBottom: isHeader ? "25px" : "18px",
                    fontSize: isHeader ? "18px" : "14px",
                    lineHeight: "1.8",
                    color: isHeader ? "#fbbf24" : "#e2e8f0",
                    fontWeight: isHeader ? "bold" : "normal",
                    pageBreakInside: "avoid",
                    textAlign: "justify",
                  }}
                >
                  {paragraph.trim()}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
