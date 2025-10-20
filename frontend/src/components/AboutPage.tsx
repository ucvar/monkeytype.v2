import React from "react";
import { Link } from "react-router-dom";
import { Cpu, Zap, Palette, BarChart3 } from "lucide-react";

function AboutPage() {
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      title: "Lightning Fast",
      desc: "Тренировки запускаются мгновенно, интерфейс не тормозит — всё ради фокуса на скорости.",
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-yellow-400" />,
      title: "Detailed Statistics",
      desc: "Просматривай средний WPM, точность и историю своих результатов в реальном времени.",
    },
    {
      icon: <Palette className="w-5 h-5 text-yellow-400" />,
      title: "Customizable UI",
      desc: "Настраивай тему, фон, шрифт и эффекты — сделай тренировку под себя.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-yellow-400" />,
      title: "Modern Stack",
      desc: "React + TailwindCSS + FastAPI обеспечивают надёжность и плавность работы.",
    },
  ];

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-6 sm:py-8 bg-gray-900 text-white overflow-hidden">
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 animate-gradient-background -z-10" />

      {/* Частицы */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <span
            key={i}
            className="absolute bg-yellow-400 rounded-full opacity-20 animate-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Контейнер */}
      <div className="relative z-10 w-full max-w-3xl bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-gray-700 shadow-2xl p-6 sm:p-8 animate-fade-in -mt-8 sm:-mt-12">
        {/* Заголовок */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-16 h-16 rounded-full bg-yellow-400/20 border border-yellow-500 flex items-center justify-center shadow-yellow-400/20 shadow-lg">
            <span className="text-2xl font-bold text-yellow-400">M</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-400 text-center animate-gradient-text">
            About MonkeyType.v2
          </h1>
          <p className="text-gray-300 text-center max-w-md text-sm sm:text-base leading-relaxed">
            MonkeyType.v2 — платформа для тех, кто хочет совершенствовать скорость и точность набора текста с удовольствием.
          </p>
        </div>

        {/* Основной текст */}
        <div className="space-y-2 text-gray-300 text-sm sm:text-base">
          <p className="bg-gray-700/40 p-2.5 rounded-xl border border-gray-600 hover:bg-gray-700/60 transition transform hover:scale-[1.02] leading-relaxed">
            Проект объединяет лаконичность, эстетику и производительность. Каждый элемент интерфейса создан для концентрации на процессе печати.
          </p>
          <p className="bg-gray-700/40 p-2.5 rounded-xl border border-gray-600 hover:bg-gray-700/60 transition transform hover:scale-[1.02] leading-relaxed">
            Технологический стек включает React, TailwindCSS и FastAPI, что делает приложение гибким, быстрым и расширяемым.
          </p>
        </div>

        {/* Особенности */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-gray-700/40 p-3 rounded-xl border border-gray-600 shadow-md flex items-start gap-2.5 hover:bg-gray-700/60 hover:shadow-yellow-400/10 transition-all transform hover:scale-[1.03]"
            >
              {f.icon}
              <div>
                <h3 className="font-bold text-yellow-300 text-base">{f.title}</h3>
                <p className="text-gray-300 text-sm mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка */}
        <div className="flex justify-center mt-6">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-gray-900 font-semibold shadow-lg hover:shadow-yellow-400/40 transform transition-all hover:scale-105"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Анимации */}
      <style>
        {`
          @keyframes star {
            0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
            50% { transform: translateY(-8px) scale(1.4); opacity: 0.7; }
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
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }

          @keyframes gradient-text {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-text {
            background: linear-gradient(90deg, #facc15, #fbbf24, #f59e0b, #fbbf24, #facc15);
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

export default AboutPage;
