"use client";

import { useEffect, useState } from "react";
import AddBalanceForm from "../components/inputs/AddBalanceForm";
import { toast } from "react-hot-toast";

const Page = () => {
  const [gameBets, setGameBets] = useState([]);
  console.log("🚀 ~ file: page.jsx:9 ~ Page ~ gameBets:", gameBets);

  const fetchCurrentGame = async () => {
    try {
      const response = await fetch("/api/admin/currentgame", { method: "GET" });

      if (response.ok) {
        const data = await response.json();
        console.log("🚀 ~ file: page.jsx:14 ~ fetchCurrentGame ~ data:", data);

        const result = data.bets.reduce((acc, obj) => {
          const index = acc.findIndex(
            (item) => item.betNumber === obj.betNumber
          );
          if (index === -1) {
            acc.push({ betNumber: obj.betNumber, betAmount: obj.betAmount });
          } else {
            acc[index].betAmount += obj.betAmount;
          }
          return acc;
        }, []);
        setGameBets(Object.values(result));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCurrentGame();
  }, []);

  return (
    <div className="px-4">
      <div className="flex flex-col gap-2 w-full border-b pb-4">
        <h2 className="text-lg">Add Balance</h2>
        <p className="text-xs text-slate-500">
          Add balance to wallet by there mail id
        </p>

        <div className="w-full">
          <AddBalanceForm />
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-lg">Current Game Status</h2>
        <p className="text-xs text-slate-500">
          Game will announce result randomly if not announced by you
        </p>
        <p className="text-xs text-blue-400 my-2">
          Make sure to announce result 15 seconds before the game ends
        </p>

        <div>
          <div className="grid grid-cols-5 gap-3">
            {gameBets ? (
              gameBets.map((bet) => (
                <div className="flex flex-col items-center justify-center py-2 border rounded gap-2">
                  <div className="border-b">{bet.betNumber}</div>
                  <div className="text-blue-500 font-bold">
                    ₹{bet.betAmount}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xl py-6">No Bets Placed Yet...</p>
            )}
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
