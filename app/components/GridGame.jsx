"use client";

import { GiTrophyCup } from "react-icons/gi";

import { useEffect, useState } from "react";

import moment from "moment";
import Model from "./models/model";

const GridGame = ({ user }) => {
  const [game, setGame] = useState({});

  const [duration, setDuration] = useState(0);

  const [show, setShow] = useState(false);
  const [betValue, setBetValue] = useState("");

  useEffect(() => {
    const fetchGame = async () => {
      const response = await fetch("/api/rgbet", { method: "GET" });
      const data = await response.json();
      setGame(data);

      const duration = Math.floor(moment(data?.endTime).diff(moment()) / 1000);

      setDuration(duration);
    };

    fetchGame();
  }, []);

  const handleNumberClick = async (number) => {
    try {
      setBetValue(number);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnCancel = () => {
    setShow(false);
    setBetValue("");
  };

  const handleOnSubmit = async (amount) => {
    try {
      const response = await fetch("/api/rgbet/bet", {
        method: "POST",
        body: JSON.stringify({
          userId: user?.id.toString(),
          gameId: game?._id,
          betNumber: betValue,
          betAmount: amount,
        }),
      });
      if (response.ok) {
        console.log("Bet SUBMITTED");
      } else {
        console.error(await response.json());
      }
    } catch (error) {
      console.error(error);
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
      <Model
        title={`Place bet on ${betValue}`}
        onShow={show}
        onCancel={handleOnCancel}
        onConfirm={handleOnSubmit}
      />
    </div>
  );
};

function CountdownTimer({ duration }) {
  const [seconds, setSeconds] = useState(duration);
  const [minutes, setMinutes] = useState(Math.floor(duration / 60));

  useEffect(() => {
    let interval = null;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else {
      //  onCompletion();
    }
    return () => clearInterval(interval);
  }, [duration, seconds]);

  useEffect(() => {
    setSeconds(duration);
    setMinutes(Math.floor(duration / 60));
  }, [duration]);

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center p-2 bg-white rounded-lg shadow-lg">
        <div className="mx-2 font-mono text-2xl text-gray-900">
          {String(minutes).padStart(2, "0")}
        </div>

        <div className="mx-2 font-mono text-2xl text-gray-900">:</div>
        <div className="mx-2 font-mono text-2xl text-gray-900">
          {String(seconds % 60).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

export default GridGame;
