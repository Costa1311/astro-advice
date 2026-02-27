export const PdfTemplate = ({
  name,
  date,
  time,
  city,
  interpretation,
  planets,
}: any) => {
  return (
    <div
      id="pdf-template"
      style={{
        display: "none",
        padding: "50px 80px", // Увеличили боковые отступы (второе значение)
        backgroundColor: "white",
        color: "#000000",
        fontFamily: "Arial, sans-serif",
        width: "750px", // Немного уменьшили общую ширину для запаса
        boxSizing: "border-box",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "#9810fa" }}>
          Астрологический анализ
        </h1>
      </div>

      <div
        style={{
          marginBottom: "25px",
          fontSize: "13px",
          borderBottom: "1px solid #eee",
          paddingBottom: "15px",
        }}
      >
        <p style={{ margin: "4px 0" }}>
          <strong>Имя:</strong> {name}
        </p>
        <p style={{ margin: "4px 0" }}>
          <strong>Данные:</strong> {date} {time}, {city}
        </p>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h3
          style={{ fontSize: "16px", marginBottom: "10px", color: "#9810fa" }}
        >
          Положения планет
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {planets &&
            Object.entries(planets).map(([planet, data]: any) => (
              <div
                key={planet}
                style={{ width: "33%", marginBottom: "8px", fontSize: "12px" }}
              >
                <strong style={{ textTransform: "capitalize" }}>
                  {planet}:
                </strong>{" "}
                {Math.round(
                  Array.isArray(data) ? data[0] : data.longitude || data,
                )}
                °
              </div>
            ))}
        </div>
      </div>

      <div style={{ display: "block" }}>
        {interpretation
          ?.split("\n")
          .filter((p: string) => p.trim() !== "")
          .map((paragraph: string, idx: number) => (
            <div
              key={idx}
              style={{
                marginBottom: "15px",
                fontSize: "13px", // Уменьшили шрифт с 15 до 13
                lineHeight: "1.7",
                textAlign: "left",
                pageBreakInside: "avoid",
                display: "block",
                wordBreak: "break-word", // Защита от вылета длинных слов
                maxWidth: "100%", // Ограничение по ширине родителя
              }}
            >
              {paragraph.trim()}
            </div>
          ))}
      </div>
    </div>
  );
};
