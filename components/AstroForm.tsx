interface AstroFormProps {
  name: string;
  setName: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  date: string;
  setDate: (v: string) => void;
  time: string;
  setTime: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export const AstroForm = ({
  name,
  setName,
  city,
  setCity,
  date,
  setDate,
  time,
  setTime,
  onSubmit,
  loading,
}: AstroFormProps) => {
  const capitalize = (str: string) => {
    return str
      .split(" ")
      .filter((word) => word !== "")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4 shadow-xl backdrop-blur-md"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase text-gray-400 mb-1 ml-1">
            Имя
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(capitalize(e.target.value))}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-500 transition-all"
            placeholder="Имя"
            required
          />
        </div>
        <div>
          <label className="block text-xs uppercase text-gray-400 mb-1 ml-1">
            Город рождения
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(capitalize(e.target.value))}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-500 transition-all"
            placeholder="Москва"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase text-gray-400 mb-1 ml-1">
              Дата
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase text-gray-400 mb-1 ml-1">
              Время
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl"
              required
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-500 p-4 rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-purple-500/20"
      >
        {loading ? "✨ Считаем звезды..." : "Построить карту"}
      </button>
    </form>
  );
};
