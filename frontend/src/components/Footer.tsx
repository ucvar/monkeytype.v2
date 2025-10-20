import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  // Частицы реагируют на мышь
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const particles = footerRef.current?.querySelectorAll<HTMLElement>('.particle');
      if (!particles) return;
      particles.forEach((p) => {
        const rect = p.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;
        const scale = dist < maxDist ? 1 + (maxDist - dist) / 300 : 1;
        p.style.transform = `translateY(${Math.sin(dist / 10)}px) scale(${scale})`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-gray-900 text-gray-200 border-t border-gray-700 py-12">
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 animate-gradient-background -z-10" />

      {/* Частицы */}
      {[...Array(50)].map((_, idx) => (
        <span
          key={idx}
          className="absolute particle bg-yellow-400 rounded-full opacity-40 w-1.5 h-1.5 animate-star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
          }}
        />
      ))}

      {/* Плавающие линии */}
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

      {/* Плавающие круги */}
      {[...Array(8)].map((_, idx) => (
        <div
          key={idx}
          className="absolute rounded-full bg-yellow-500 opacity-10 animate-footer-glow"
          style={{
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Контент футера */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative z-10">
        <p className="text-sm font-light text-yellow-200 drop-shadow-md">
          © 2025 Monkeytype Clone. All rights reserved.
        </p>
        <nav>
          <ul className="flex flex-wrap justify-center md:justify-end gap-6 text-sm font-medium">
            {['About', 'Settings', 'Contact'].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="hover:text-yellow-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Анимации футера */}
      <style>
        {`
          @keyframes gradient-background {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
          }
          .animate-gradient-background { background-size: 200% 200%; animation: gradient-background 40s linear infinite; }

          @keyframes star { 0%,100% { transform: translateY(0) scale(1); opacity:0.3; } 50% { transform: translateY(-10px) scale(1.5); opacity:0.8; } }
          .animate-star { animation: star 4s ease-in-out infinite; }

          @keyframes line { 0%{transform:translateY(0);opacity:0.1;} 50%{transform:translateY(-10px);opacity:0.3;} 100%{transform:translateY(0);opacity:0.1;} }
          .animate-line { animation: line 6s linear infinite; }

          @keyframes footer-glow { 0%,100% { transform: translateY(0) scale(1); opacity:0.1; } 50% { transform: translateY(-20px) scale(1.3); opacity:0.3; } }
          .animate-footer-glow { animation: footer-glow 12s ease-in-out infinite; }
        `}
      </style>
    </footer>
  );
}

export default Footer;
