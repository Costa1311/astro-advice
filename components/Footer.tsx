// Компонент Footer.tsx
export const Disclaimer = () => {
  return (
    <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-xs text-gray-500">
      <p>
        © {new Date().getFullYear()} Astro App. Информация на сайте носит
        исключительно развлекательный характер и не является руководством к
        действию. Все совпадения случайны.
      </p>
      <div className="mt-2 flex justify-center gap-4">
        <a href="/terms" className="underline">
          Пользовательское соглашение
        </a>
        <a href="/privacy" className="underline">
          Политика конфиденциальности
        </a>
      </div>
    </footer>
  );
};
