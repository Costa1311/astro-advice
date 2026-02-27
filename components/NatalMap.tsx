"use client";

export default function NatalMap({ data }: { data: any }) {
  if (!data || !data.planets) return null;

  const size = 400;
  const center = size / 2;
  const radius = size / 2 - 25;

  const getCoords = (deg: number, r: number) => {
    const angle = (deg - 90) * (Math.PI / 180);
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Парсим планеты и сортируем их по градусам для алгоритма смещения
  const planets = Object.entries(data.planets)
    .map(([key, val]: any) => {
      let deg = 0;
      if (typeof val === "number") deg = val;
      else if (Array.isArray(val)) deg = Number(val[0]);
      else if (typeof val === "object") deg = Number(val.longitude || 0);
      return { name: key, deg };
    })
    .sort((a, b) => a.deg - b.deg);

  return (
    <div className="w-full max-w-[550px] mx-auto flex flex-col items-center space-y-8">
      {/* КАРТА */}
      <div className="relative w-full aspect-square bg-gray-950/40 rounded-full border border-white/10 p-4 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible"
        >
          {/* Внешний круг */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#4f46e5"
            strokeWidth="1"
            opacity="0.3"
          />

          {/* Сетка домов */}
          {Array.isArray(data.cusps) &&
            data.cusps.map((deg: any, i: number) => {
              const pos = getCoords(Number(deg), radius);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={pos.x}
                  y2={pos.y}
                  stroke="#312e81"
                  strokeWidth="1"
                  strokeDasharray="2,4"
                />
              );
            })}

          {/* Планеты с защитой от наслоения */}
          {planets.map((p, i) => {
            // Если планета слишком близко к предыдущей (меньше 10 градусов),
            // выдвигаем её чуть дальше от центра
            const isCrowded =
              i > 0 && Math.abs(p.deg - planets[i - 1].deg) < 12;
            const labelRadius = isCrowded ? radius - 15 : radius - 40;

            const pointPos = getCoords(p.deg, radius - 5);
            const labelPos = getCoords(p.deg, labelRadius);

            return (
              <g key={p.name}>
                <line
                  x1={pointPos.x}
                  y1={pointPos.y}
                  x2={labelPos.x}
                  y2={labelPos.y}
                  stroke="#6366f1"
                  strokeWidth="0.5"
                  opacity="0.4"
                />
                <circle cx={pointPos.x} cy={pointPos.y} r="4" fill="#fbbf24" />

                <g
                  transform={`translate(${labelPos.x - 12}, ${labelPos.y - 8})`}
                >
                  <rect
                    width="24"
                    height="16"
                    rx="4"
                    fill="#1e1b4b"
                    stroke="#4338ca"
                    strokeWidth="1"
                  />
                  <text
                    x="12"
                    y="9"
                    fill="#fff"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                  >
                    {p.name.substring(0, 2).toUpperCase()}
                  </text>
                </g>
              </g>
            );
          })}

          <circle cx={center} cy={center} r="4" fill="#4338ca" />
        </svg>
      </div>

      {/* ТАБЛИЦА (Исправленная сетка) */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2">
        {planets.map((p) => (
          <div
            key={p.name}
            className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center backdrop-blur-sm"
          >
            <span className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
              {p.name}
            </span>
            <span className="text-purple-400 font-mono font-bold text-lg">
              {Math.round(p.deg)}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
