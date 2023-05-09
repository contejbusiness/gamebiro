"use client";

import { GiTrophyCup } from "react-icons/gi";

import { useEffect, useState } from "react";

import moment from "moment";
import Model from "./models/model";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

const GridGame = ({}) => {
  const { data: session } = useSession();
  const [show, setShow] = useState(false);
  const [betValue, setBetValue] = useState("");

  const [game, setGame] = useState({});
  const [seconds, setSeconds] = useState();

  const fetchGame = async () => {
    const response = await fetch("/api/rgbet", { method: "GET" });
    const data = await response.json();
    setGame(data);
    setSeconds(Math.floor(moment(game?.endTime).diff(moment()) / 1000) + 10000);
  };

  const checkForUpdates = async () => {
    console.log("Checking for updates");
    const response = await fetch("/api/rgbet", { method: "GET" });
    const data = await response.json();

    // Compare data with the current game state
    if (JSON.stringify(data) !== JSON.stringify(game)) {
      console.log("update found--------");
      setGame(data);
    }
  };

  useEffect(() => {
    let interval = null;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else {
      checkForUpdates();
    }
    return () => clearInterval(interval);
  }, [seconds, checkForUpdates]);

  useEffect(() => {
    console.log("RERENDERING");
    fetchGame();
  }, [fetchGame]);

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
          userId: session.user?.id.toString(),
          gameId: game?._id,
          betNumber: betValue,
          betAmount: amount,
        }),
      });
      if (response.ok) {
        toast.success("Bet Placed");
        console.log("Bet SUBMITTED");
      } else {
        const data = await response.json();

        toast.error(data);
      }

      setShow(false);
      setBetValue("");
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
          <span className="text-xl">{game?.gameCount}</span>
        </div>
        <div className="flex flex-col items-end">
          <span>Count Down</span>
          <CountdownTimer
            duration={Math.floor(moment(game?.endTime).diff(moment()) / 1000)}
          />
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
          {duration > 0 ? String(minutes).padStart(2, "0") : "00"}
        </div>

        <div className="mx-2 font-mono text-2xl text-gray-900">:</div>
        <div className="mx-2 font-mono text-2xl text-gray-900">
          {duration > 0 ? String(seconds % 60).padStart(2, "0") : "00"}
        </div>
      </div>
    </div>
  );
}

export default GridGame;
