import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../services/authService';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const particles = useMemo(
    () =>
      [...Array(30)].map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        size: Math.random() * 3 + 1,
      })),
    []
  );

  const toggleMode = () => setIsLogin(prev => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        if (isLogin) {
            await loginUser({
                email: email,
                password: password
            });
        } else {
            await registerUser({
                email: email,
                password: password
            });
            await loginUser({
                email: email,
                password: password
            });
        }
        navigate('/dashboard');
    } catch (err: any) {
        alert(err.response?.data?.detail || "Error")
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] px-4 bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 animate-gradient-background -z-20" />

      {particles.map((p, idx) => (
        <span
          key={idx}
          className="absolute bg-yellow-400 rounded-full opacity-30 animate-star"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-md p-8 bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700 transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-yellow-400 animate-fade-in">
          {isLogin ? 'Sign In' : 'Register'}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-2 py-2 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 font-semibold text-gray-900 hover:scale-105 transform transition-all shadow-lg hover:shadow-xl animate-pulse-button"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-300">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={toggleMode} className="text-yellow-400 font-semibold hover:underline">
            {isLogin ? 'Register' : 'Sign In'}
          </button>
        </p>
      </div>

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
          .animate-gradient-background {
            background-size: 200% 200%;
            animation: gradient-background 40s linear infinite;
          }

          @keyframes pulse-button {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.03); }
          }
          .animate-pulse-button { animation: pulse-button 2s ease-in-out infinite; }

          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        `}
      </style>
    </section>
  );
}

export default Auth;
