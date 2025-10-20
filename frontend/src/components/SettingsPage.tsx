import React, { useState, useEffect } from "react";

function SettingsPage() {
  const [theme, setTheme] = useState("dark");
  const [font, setFont] = useState("monospace");
  const [textSize, setTextSize] = useState(24);
  const [timer, setTimer] = useState(60);
  const [wordsCount, setWordsCount] = useState(50);
  const [hints, setHints] = useState(true);
  const [sounds, setSounds] = useState(true);

  useEffect(() => {
    localStorage.setItem(
      "settings",
      JSON.stringify({ theme, font, textSize, timer, wordsCount, hints, sounds })
    );
  }, [theme, font, textSize, timer, wordsCount, hints, sounds]);

  return (
    <section className="relative flex flex-col items-center justify-start min-h-screen px-2 sm:px-4 bg-gray-900 text-white overflow-hidden">
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 animate-gradient-background -z-20" />

      {/* Частицы */}
      {[...Array(35)].map((_, idx) => (
        <span
          key={idx}
          className="absolute bg-yellow-400 rounded-full opacity-20 animate-star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-2xl mt-20 p-6 sm:p-8 bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700 animate-fade-in flex flex-col gap-4 sm:gap-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-400 text-center mb-4 animate-gradient-text">
          Settings
        </h1>

        {/* Карточки настроек */}
        {[
          {
            label: "Theme",
            element: (
              <select
                className="bg-gray-700 text-white px-3 py-1 rounded-xl shadow-inner focus:ring-2 focus:ring-yellow-400 transition hover:scale-105"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            ),
          },
          {
            label: "Font",
            element: (
              <select
                className="bg-gray-700 text-white px-3 py-1 rounded-xl shadow-inner focus:ring-2 focus:ring-yellow-400 transition hover:scale-105"
                value={font}
                onChange={(e) => setFont(e.target.value)}
              >
                <option value="monospace">Monospace</option>
                <option value="sans-serif">Sans Serif</option>
              </select>
            ),
          },
          {
            label: "Text Size",
            element: (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="range"
                  min={16}
                  max={48}
                  value={textSize}
                  onChange={(e) => setTextSize(Number(e.target.value))}
                  className="w-full accent-yellow-400 hover:accent-yellow-500 transition"
                />
                <span className="w-10 text-right">{textSize}px</span>
              </div>
            ),
          },
          {
            label: "Timer (sec)",
            element: (
              <input
                type="number"
                min={10}
                max={300}
                value={timer}
                onChange={(e) => setTimer(Number(e.target.value))}
                className="bg-gray-700 text-white px-3 py-1 rounded-xl shadow-inner w-20 focus:ring-2 focus:ring-yellow-400 transition hover:scale-105"
              />
            ),
          },
          {
            label: "Words Count",
            element: (
              <input
                type="number"
                min={10}
                max={200}
                value={wordsCount}
                onChange={(e) => setWordsCount(Number(e.target.value))}
                className="bg-gray-700 text-white px-3 py-1 rounded-xl shadow-inner w-20 focus:ring-2 focus:ring-yellow-400 transition hover:scale-105"
              />
            ),
          },
          {
            label: "Hints",
            element: (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hints}
                  onChange={() => setHints((prev) => !prev)}
                  className="accent-yellow-400 w-4 h-4"
                />
                <span className="text-gray-300 text-sm">Enable</span>
              </label>
            ),
          },
          {
            label: "Sounds",
            element: (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sounds}
                  onChange={() => setSounds((prev) => !prev)}
                  className="accent-yellow-400 w-4 h-4"
                />
                <span className="text-gray-300 text-sm">Enable</span>
              </label>
            ),
          },
        ].map((block, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center p-3 sm:p-4 bg-gray-700/40 rounded-2xl shadow-lg border border-gray-600 hover:bg-gray-700/60 transition transform hover:scale-[1.02]"
          >
            <span className="text-gray-200 font-medium text-sm sm:text-base">{block.label}</span>
            {block.element}
          </div>
        ))}
      </div>

      {/* Анимации */}
      <style>
        {`
          @keyframes star {
            0%,100%{transform:translateY(0) scale(1);opacity:0.2;}
            50%{transform:translateY(-8px) scale(1.4);opacity:0.7;}
          }
          .animate-star { animation: star 5s ease-in-out infinite; }

          @keyframes gradient-background {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
          }
          .animate-gradient-background {
            background-size: 200% 200%;
            animation: gradient-background 60s linear infinite;
          }

          @keyframes fade-in {
            from {opacity:0; transform: translateY(-8px);}
            to {opacity:1; transform: translateY(0);}
          }
          .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }

          @keyframes gradient-text {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-text {
            background: linear-gradient(90deg,#facc15,#fbbf24,#f59e0b,#fbbf24,#facc15);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% 200%;
            animation: gradient-text 4s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
}

export default SettingsPage;
