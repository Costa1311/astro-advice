// utils/formatAstrologyText.tsx

export const formatAstrologyText = (
  text: string,
  isForPdf: boolean = false,
) => {
  if (!text) return null;

  const textColor = isForPdf ? "text-black" : "text-gray-300";
  const titleColor = isForPdf ? "text-purple-700" : "text-yellow-500";
  const opacity = isForPdf ? "opacity-100" : "opacity-90";

  return text.split("\n").map((line, index) => {
    let trimmedLine = line.trim();

    // Пустая строка - небольшой фиксированный разделитель
    if (!trimmedLine) {
      return isForPdf ? (
        <div key={index} style={{ height: "10px", display: "block" }} />
      ) : (
        <div key={index} className="h-4" />
      );
    }

    const cleanLine = trimmedLine.replace(/\*\*/g, "");

    // --- ЗАГОЛОВКИ (с двоеточием) ---
    if (
      cleanLine.includes(":") &&
      (trimmedLine.startsWith("*") || trimmedLine.startsWith("-") || index < 3)
    ) {
      const [title, ...rest] = cleanLine.split(":");
      const content = rest.join(":");

      // 🔴 PDF ВЕРСИЯ: Жесткий блок с защитой от разрыва
      if (isForPdf) {
        return (
          <div
            key={index}
            style={{
              pageBreakInside: "avoid", // ГЛАВНАЯ ЗАЩИТА
              breakInside: "avoid",
              marginBottom: "10px", // Аккуратный отступ
              display: "block",
              lineHeight: "1.5",
              position: "relative",
            }}
          >
            {/* Используем span для иконки и заголовка, чтобы они были в одну строку */}
            {(trimmedLine.startsWith("*") || trimmedLine.startsWith("-")) && (
              <span style={{ color: "#7e22ce", marginRight: "8px" }}>✦</span>
            )}
            <strong
              style={{
                color: "#7e22ce",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {title.replace(/^[\*\-\s]+/, "")}:
            </strong>
            <span style={{ color: "black", marginLeft: "5px" }}>{content}</span>
          </div>
        );
      }

      // 🟢 ЭКРАННАЯ ВЕРСИЯ (твой старый код)
      return (
        <div key={index} className="mb-4">
          <div className="flex items-start">
            {(trimmedLine.startsWith("*") || trimmedLine.startsWith("-")) && (
              <span className="text-purple-500 mr-2 mt-1.5 text-[10px]">✦</span>
            )}
            <div className={`text-sm sm:text-base leading-relaxed ${opacity}`}>
              <strong
                className={`${titleColor} font-bold uppercase tracking-wide mr-1`}
              >
                {title.replace(/^[\*\-\s]+/, "")}:
              </strong>
              <span className={textColor}>{content}</span>
            </div>
          </div>
        </div>
      );
    }

    // --- ОБЫЧНЫЕ АБЗАЦЫ ---
    // 🔴 PDF ВЕРСИЯ
    if (isForPdf) {
      return (
        <p
          key={index}
          style={{
            pageBreakInside: "avoid",
            breakInside: "avoid",
            marginBottom: "10px", // Аккуратный отступ
            color: "black",
            lineHeight: "1.5",
            display: "block",
            position: "relative",
          }}
        >
          {cleanLine}
        </p>
      );
    }

    // 🟢 ЭКРАННАЯ ВЕРСИЯ
    return (
      <p
        key={index}
        className={`${textColor} leading-relaxed mb-4 text-sm sm:text-base ${opacity}`}
      >
        {cleanLine}
      </p>
    );
  });
};
