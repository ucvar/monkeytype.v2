import React from 'react';
import { Link } from 'react-router-dom';
import { FaKeyboard, FaInfoCircle, FaCog } from 'react-icons/fa';

function Header() {
  return (
    <header className="relative overflow-hidden sticky top-0 z-50 shadow-lg">
      {/* Динамический фон */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 animate-gradient-background -z-20">
        {[...Array(30)].map((_, idx) => (
          <span
            key={idx}
            className="absolute bg-yellow-400 rounded-full opacity-30 w-1.5 h-1.5 animate-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="absolute w-1 h-full bg-yellow-500 opacity-10 animate-line"
            style={{
              left: `${idx * 18 + 10}%`,
              animationDelay: `${idx * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-12 relative z-10">
        {/* Логотип */}
        <Link to="/" className="flex items-center space-x-2 text-4xl font-extrabold group">
          <FaKeyboard className="text-yellow-400 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110" />
          <span className="relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110 animate-gradient-hover-on-hover">
              Monkeytype
            </span>
            <span className="text-yellow-300 text-xl align-top animate-pulse-logo">.v2</span>
          </span>
        </Link>

        <nav>
          <ul className="flex space-x-6 md:space-x-8 items-center">
            {[{ name: 'About', icon: <FaInfoCircle /> }, { name: 'Settings', icon: <FaCog /> }].map(
              (item) => (
                <li key={item.name}>
                  <Link
                    to={`/${item.name.toLowerCase()}`}
                    className="flex items-center space-x-1 text-gray-200 hover:text-yellow-400 transition-transform duration-300 group hover:-translate-y-1 hover:scale-105"
                  >
                    {React.cloneElement(item.icon, {
                      className: 'transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110',
                    })}
                    <span>{item.name}</span>
                  </Link>
                </li>
              )
            )}
            <li>
              <Link
                to="/profile"
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <style>
        {`
          @keyframes gradient-background {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
          }
          .animate-gradient-background {
            background-size: 200% 200%;
            animation: gradient-background 40s linear infinite;
          }

          @keyframes star {
            0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
            50% { transform: translateY(-10px) scale(1.5); opacity: 0.8; }
          }
          .animate-star { animation: star 4s ease-in-out infinite; }

          @keyframes line {
            0% { transform: translateY(0); opacity: 0.1; }
            50% { transform: translateY(-10px); opacity: 0.3; }
            100% { transform: translateY(0); opacity: 0.1; }
          }
          .animate-line { animation: line 6s linear infinite; }

          @keyframes pulse-logo {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .animate-pulse-logo { animation: pulse-logo 2s ease-in-out infinite; }

          /* Анимация текста при hover */
          @keyframes jump {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-8px) scale(1.05); }
          }
          .animate-jump {
            animation: jump 0.5s ease-in-out forwards;
          }
            
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s linear infinite;
          }
          .group:hover .animate-gradient-hover-on-hover {
            animation: gradient-hover 2s linear infinite;
          }
        `}
      </style>
    </header>
  );
}

export default Header;
