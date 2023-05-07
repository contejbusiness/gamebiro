"use client";

import { GiTrophyCup } from "react-icons/gi";

import { useEffect, useState } from "react";

import moment from "moment";

const GridGame = ({ user }) => {
  const [game, setGame] = useState({});
  const [duration, setDuration] = useState(0);
  console.log("🚀 ~ file: GridGame.jsx:12 ~ GridGame ~ duration:", duration)

  useEffect(() => {
    async function fetchGame() {
      const response = await fetch("/api/rgbet", { method: "GET" });
      const data = await response.json();

      const duration = moment.duration(
        moment(data?.endTime).diff(moment(data?.startTime))
      );
      setDuration(Math.floor(duration.asSeconds()));
    }

    fetchGame();
  }, []);

  const handleNumberClick = async (number) => {
    try {
      const response = await fetch("/api/rgbet/bet", {
        method: "POST",
        body: JSON.stringify({
          userId: user?.id.toString(),
          gameId: "6457dd33aee290524e699c7d",
          betNumber: number,
          betAmount: 100,
        }),
      });

      if (response.ok) {
        console.log("Bet SUBMITTED");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-start gap-2">
          <div className="flex items-center gap-3">
            <GiTrophyCup size={18} />
            <span className="text-sm">Period</span>
          </div>
          <span className="text-xl">23123123</span>
        </div>
        <div className="flex flex-col items-end">
          <span>Count Down</span>
          <CountdownTimer duration={duration} />
        </div>
      </div>

      <div className="flex items-center justify-between my-10">
        <button className="px-3 py-2 text-sm text-white bg-green-500 rounded shadow-lg">
          Join Green
        </button>
        <button className="px-3 py-2 text-sm text-white bg-blue-500 rounded shadow-lg">
          Join Blue
        </button>
        <button className="px-3 py-2 text-sm text-white bg-red-500 rounded shadow-lg">
          Join Red
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleNumberClick(i)}
            className={`font-bold py-2 px-4 rounded ${
              i === 0 || i === 5
                ? "bg-blue-500"
                : i % 2 === 0
                ? "bg-green-500"
                : "bg-red-500"
            } text-white hover:cursor-pointer`}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
};

function CountdownTimer({ duration }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center p-2 bg-white rounded-lg shadow-lg">
        <div className="mx-2 font-mono text-2xl text-gray-900">
          {String(minutes).padStart(2, "0")}
        </div>

        <div className="mx-2 font-mono text-2xl text-gray-900">:</div>
        <div className="mx-2 font-mono text-2xl text-gray-900">
          {String(seconds).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

export default GridGame;
