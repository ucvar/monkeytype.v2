import React from 'react';
import { Link } from 'react-router-dom';

function UserDashboard() {
  const stats = [
    { label: 'Tests Taken', value: 42 },
    { label: 'Average WPM', value: 85 },
    { label: 'Accuracy', value: '92%' },
    { label: 'Best WPM', value: 120 },
  ];

  const recentResults = [
    { date: '2025-09-30', wpm: 80, accuracy: '90%' },
    { date: '2025-09-29', wpm: 78, accuracy: '88%' },
    { date: '2025-09-28', wpm: 95, accuracy: '93%' },
    { date: '2025-09-27', wpm: 110, accuracy: '96%' },
  ];

  return (
    <section className="relative flex flex-col items-center justify-start min-h-[calc(100vh-6rem)] px-4 bg-gray-900 text-white overflow-hidden">
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 animate-gradient-background -z-20" />

      {/* Частицы */}
      {[...Array(40)].map((_, idx) => (
        <span
          key={idx}
          className="absolute bg-yellow-400 rounded-full opacity-30 animate-star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Контейнер с отступом сверху, центрирует контент */}
      <div className="relative z-10 flex flex-col items-center gap-10 mt-16 md:mt-24 w-full">
        {/* Заголовок */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 text-center animate-fade-in">
          Welcome, Typist!
        </h1>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-6 bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg border border-gray-700 flex flex-col items-center transform transition-all hover:scale-105"
            >
              <p className="text-2xl font-bold text-yellow-300">{s.value}</p>
              <p className="text-gray-300 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Последние результаты */}
        <div className="w-full max-w-4xl bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Recent Results</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-200 border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">WPM</th>
                  <th className="py-2 px-4">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {recentResults.map((r, idx) => (
                  <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700/30 transition-all">
                    <td className="py-2 px-4">{r.date}</td>
                    <td className="py-2 px-4">{r.wpm}</td>
                    <td className="py-2 px-4">{r.accuracy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            to="/profile-settings"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-gray-900 font-semibold shadow-lg hover:shadow-xl transform transition-all hover:scale-105"
          >
            Profile Settings
          </Link>
          <Link
            to="/logout"
            className="px-6 py-3 rounded-xl bg-gray-700 text-yellow-400 font-semibold border border-yellow-400 shadow hover:shadow-lg transform transition-all hover:scale-105"
          >
            Logout
          </Link>
        </div>
      </div>

      {/* Стили анимаций */}
      <style>
        {`
          @keyframes star {
            0%, 100% { transform: translateY(0) scale(1); opacity:0.3; }
            50% { transform: translateY(-8px) scale(1.5); opacity:0.8; }
          }
          .animate-star { animation: star 4s ease-in-out infinite; }

          @keyframes gradient-background {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
          }
          .animate-gradient-background { background-size: 200% 200%; animation: gradient-background 40s linear infinite; }

          @keyframes fade-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        `}
      </style>
    </section>
  );
}

export default UserDashboard;
