import React, { useState, useRef, useEffect } from "react";
import { fetchWords } from "../services/words";

function TypingTest() {
  const [userInput, setUserInput] = useState("");
  const [caretVisible, setCaretVisible] = useState(true);
  const [sampleText, setSampleText] = useState("");
  const [wordCount, setWordCount] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResults] = useState<{wpm: number, accuracy: number} | null>(null);
  const startTime = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<HTMLSpanElement[]>([]);

  const loadNewText = async (count = wordCount) => {
    const data = await fetchWords();
    setSampleText(data.words.join(" "));
    setUserInput("");
    containerRef.current?.querySelector("input")?.focus();
  };

  useEffect(() => {
    loadNewText();
  }, [wordCount]);

  useEffect(() => {
    const interval = setInterval(() => setCaretVisible(prev => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  const getCaretStyle = () => {
    if (charRefs.current.length === 0) return { left: 0, top: 0, height: 24 };
    const idx = Math.min(userInput.length, charRefs.current.length - 1);
    const charEl = charRefs.current[idx];
    const left = userInput.length < charRefs.current.length
      ? charEl.offsetLeft
      : charEl.offsetLeft + charEl.offsetWidth;
    const top = charEl.offsetTop;
    const height = charEl.offsetHeight;
    return { left, top, height };
  };

  const restartTest = () => loadNewText();

  const caretStyle = getCaretStyle();

  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-gray-900 px-4">
      {/* Панель выбора количества слов */}
      <div className="flex gap-4 mb-6">
        {[30, 40, 50].map((count) => (
          <button
            key={count}
            onClick={() => setWordCount(count)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              wordCount === count
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            {count} words
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-5xl select-none cursor-text" ref={containerRef}>
        <div className="whitespace-pre-wrap text-3xl md:text-5xl text-gray-400 font-mono leading-[1.5]">
          {sampleText.split("").map((char, idx) => {
            let colorClass = "text-gray-400";
            if (idx < userInput.length) {
              colorClass = char === userInput[idx]
                ? "text-green-400"
                : "text-red-500 animate-pulse";
            }
            return (
              <span
                key={idx}
                ref={(el) => { if (el) charRefs.current[idx] = el; }}
                className={`${colorClass} transition-colors duration-150`}
              >
                {char}
              </span>
            );
          })}
        </div>

        {caretVisible && (
          <div
            className="absolute bg-yellow-400 w-1 transition-all duration-150"
            style={{
              height: `${caretStyle.height}px`,
              transform: `translate(${caretStyle.left}px, ${caretStyle.top}px)`,
              top: `${caretStyle.top}px`,
            }}
          />
        )}

        <input
          type="text"
          value={userInput}
          onChange={(e) => {
            const value = e.target.value
            setUserInput(value);

            if (!isRunning && value.trim().length === 1) {
                startTime.current = Date.now();
                setIsRunning(true);
            }

            const typedWords = value.trim().split(/\s+/).filter(Boolean);
            const sampleWords = sampleText.split(" ");
            let correctWords = 0;

            for (let i = 0; i < typedWords.length; i++) {
                if (typedWords[i] === sampleWords[i]) correctWords++;
            }

            if (isRunning && value.length === sampleText.length) {
                const elapsed = (Date.now() - startTime.current!) / 1000;
                setIsRunning(false);
                console.log("Время:", elapsed);

                const wpm = Math.round((correctWords / elapsed) * 60);
                const accuracy = Math.round((correctWords / sampleWords.length) * 100);

                setResults({wpm, accuracy});
            }
          }}
          className="absolute top-0 left-0 w-full h-full text-transparent caret-transparent focus:outline-none"
        />
        {result && (
            <div className="mt-10 flex flex-col items-center justify-center animate-fade-in">
              <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl px-10 py-6 shadow-xl border border-gray-700 text-center">
                <h2 className="text-3xl font-semibold text-yellow-400 mb-4 tracking-wide">
                  Test Results
                </h2>
                <div className="flex gap-10 text-white">
                  <div className="flex flex-col items-center">
                    <p className="text-5xl font-bold text-green-400">{result.wpm}</p>
                    <p className="text-gray-400 mt-1 text-lg">WPM</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-5xl font-bold text-blue-400">{result.accuracy}%</p>
                    <p className="text-gray-400 mt-1 text-lg">Accuracy</p>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>

      <button
        onClick={restartTest}
        className="mt-6 p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white relative group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 transition-transform duration-500 group-hover:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v6h6M20 20v-6h-6" />
        </svg>
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Restart Test
        </span>
      </button>
    </section>
  );
}

export default TypingTest;
