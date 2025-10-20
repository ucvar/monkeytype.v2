import React, { useState, useEffect } from "react";

function ProfileSettings() {
  const [username, setUsername] = useState("Typist");
  const [email, setEmail] = useState("typist@example.com");
  const [avatar, setAvatar] = useState(""); // загруженный аватар или пусто
  const [password, setPassword] = useState("");

  // Генерация дефолтного аватара с инициалами
  const getDefaultAvatar = (name: string) => {
    const colors = [
      "#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6",
    ];
    const char = name[0].toUpperCase();
    const color = colors[name.charCodeAt(0) % colors.length];

    // Используем data URL SVG
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <rect width="200" height="200" fill="${color}" />
      <text x="50%" y="50%" font-size="100" fill="white" text-anchor="middle" dominant-baseline="central" font-family="Arial, sans-serif">${char}</text>
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");
    if (profile.username) setUsername(profile.username);
    if (profile.email) setEmail(profile.email);
    if (profile.avatar) setAvatar(profile.avatar);
    else setAvatar(getDefaultAvatar(profile.username || username));
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "profile",
      JSON.stringify({ username, email, avatar })
    );
  }, [username, email, avatar]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="relative flex flex-col items-center min-h-screen px-4 bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 animate-gradient-background -z-20" />

      {[...Array(30)].map((_, idx) => (
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

      <div className="relative z-10 w-full max-w-2xl mt-20 p-6 sm:p-8 bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700 flex flex-col gap-6 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-400 text-center animate-gradient-text">
          Profile Settings
        </h1>

        <div className="flex flex-col items-center gap-2">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-400 shadow-lg">
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        
          {/* Скрытый input */}
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        
          {/* Кастомная кнопка */}
          <label
            htmlFor="avatar-upload"
            className="cursor-pointer px-4 py-2 rounded-xl bg-yellow-400 text-gray-900 font-semibold shadow-lg hover:shadow-xl transform transition-all hover:scale-105"
          >
            Choose File
          </label>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-300 font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-xl bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400 shadow-inner transition"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-300 font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-xl bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400 shadow-inner transition"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-300 font-semibold">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="px-4 py-2 rounded-xl bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400 shadow-inner transition"
          />
        </div>

        <button className="px-6 py-3 mt-4 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-gray-900 font-semibold shadow-lg hover:shadow-xl transform transition-all hover:scale-105">
          Save Changes
        </button>
      </div>

      <style>
        {`
          @keyframes star {0%,100%{transform:translateY(0) scale(1);opacity:0.2;}50%{transform:translateY(-8px) scale(1.4);opacity:0.7;}}
          .animate-star { animation: star 5s ease-in-out infinite; }
          @keyframes gradient-background {0% { background-position: 0% 0%; }50% { background-position: 100% 100%; }100% { background-position: 0% 0%; }}
          .animate-gradient-background { background-size: 200% 200%; animation: gradient-background 60s linear infinite; }
          @keyframes fade-in { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
          @keyframes gradient-text { 0% { background-position: 0% 50%; }50% { background-position: 100% 50%; }100% { background-position: 0% 50%; } }
          .animate-gradient-text { background: linear-gradient(90deg,#facc15,#fbbf24,#f59e0b,#fbbf24,#facc15); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% 200%; animation: gradient-text 4s ease-in-out infinite; }
        `}
      </style>
    </section>
  );
}

export default ProfileSettings;
