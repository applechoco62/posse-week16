import { useState, useEffect } from "react";

function App() {
  const [minutesInput, setMinutesInput] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    if (secondsLeft <= 0) {
      setIsRunning(false);
      return;
    }

    const timerId = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning, secondsLeft]);

  const handleStart = () => {
    if (secondsLeft <= 0) return;
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(minutesInput * 60);
  };

  const handleMinutesChange = (event) => {
    const value = Number(event.target.value);
    setMinutesInput(value);
    if (!isRunning) {
      setSecondsLeft(value * 60);
    }
  };

  const minutesDisplay = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secondsDisplay = String(secondsLeft % 60).padStart(2, "0");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100">
      <h1 className="text-2xl font-bold">カウントダウンタイマー</h1>

      <div className="text-6xl font-mono font-bold">
        {minutesDisplay}:{secondsDisplay}
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">分数:</label>
        <input
          type="number"
          min="1"
          className="border rounded px-3 py-2 w-20"
          value={minutesInput}
          onChange={handleMinutesChange}
          disabled={isRunning}
        />
      </div>

      <div className="flex gap-4">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
          onClick={handleStart}
          disabled={isRunning || secondsLeft <= 0}
        >
          スタート
        </button>
        <button
          className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
          onClick={handleReset}
        >
          リセット
        </button>
      </div>

      {secondsLeft <= 0 && (
        <p className="text-red-500 font-bold">時間になりました！</p>
      )}
    </main>
  );
}

export default App;