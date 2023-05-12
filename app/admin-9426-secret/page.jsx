"use client";

import { useEffect, useState } from "react";
import AddBalanceForm from "../components/inputs/AddBalanceForm";
import { toast } from "react-hot-toast";
import SubmitWinnerForm from "../components/inputs/SubmitWinnerForm";

const Page = () => {
  const [currentGame, setCurrentGame] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [gameBets, setGameBets] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [status, setStatus] = useState("Stopped");

  const [recentGames, setRecentGames] = useState([]);

  const [recentGameBets, setRecentGamesBets] = useState([]);

  const fetchRecentGames = async () => {
    try {
      const response = await fetch(
        `/api/admin/all?page=${page}&limit=${limit}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (response.ok) {
        const result = data[0].bets.reduce((acc, obj) => {
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
        setRecentGamesBets(Object.values(result));

        setRecentGames(data[0]);
      } else {
        toast.error(data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetchRecentGames();
  }, [page, limit]);

  const fetchCurrentGame = async () => {
    try {
      const response = await fetch("/api/admin/currentgame", { method: "GET" });

      if (response.ok) {
        const data = await response.json();

        setCurrentGame(data);

        const result = data?.bets.reduce((acc, obj) => {
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

  const startGame = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/rgbet", { method: "POST" });

      if (response.ok) {
        setStatus("Started");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const endGame = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/rgbet", { method: "PUT" });
      if (response.ok) {
        setStatus("Stopped");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentGame();
  }, []);

  return (
    <div className="px-4">
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <button
            disabled={isLoading}
            className={`text-xs rounded-full px-2 py-1 my-5 bg-blue-500 text-white ${
              isLoading ? "bg-gray-500" : "bg-blue-500"
            }`}
            onClick={() => {
              startGame();
            }}
          >
            Start Game
          </button>
          <button
            disabled={isLoading}
            className={`text-xs rounded-full px-2 py-1 my-5 bg-blue-500 text-white ${
              isLoading ? "bg-gray-500" : "bg-blue-500"
            }`}
            onClick={() => {
              endGame();
            }}
          >
            End Game
          </button>
        </div>
        <p className="text-xs">{status}</p>
      </div>

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
        <p className="text-xs text-slate-500 mb-4">
          Game will announce result randomly if not announced by you
        </p>

        <div>
          <div className="grid grid-cols-5 gap-3">
            {gameBets ? (
              gameBets?.map((bet, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center py-2 border rounded gap-2"
                >
                  <div className="border-b">{bet?.betNumber}</div>
                  <div className="text-blue-500 font-bold">
                    ₹{bet?.betAmount}
                  </div>
                </div>
              ))
            ) : (
              <p className="py-6">No Bets Placed Yet...</p>
            )}
          </div>

          <div className="border-b pb-4">
            {currentGame && <SubmitWinnerForm gameId={currentGame?._id} />}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg mt-4">Recent Games</h2>
        <p className="text-xs text-slate-500">Recent Games</p>

        <div className="my-4">
          <p className="text-xs">
            Result -
            <span className="text-sm font-bold text-blue-500">
              {recentGames?.result}
            </span>
          </p>

          <p className="text-xs">
            Period -{" "}
            <span className="text-sm font-bold text-blue-500">
              {recentGames?.gameCount}
            </span>
          </p>
          <div className="grid grid-cols-5 gap-3 my-2">
            {recentGameBets?.length > 0 ? (
              recentGameBets?.map((bet, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center py-2 border rounded gap-2"
                >
                  <div className="border-b">{bet?.betNumber}</div>
                  <div className="text-blue-500 font-bold">
                    ₹{bet?.betAmount}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xl py-6">No Bets Placed Yet...</p>
            )}
          </div>
        </div>

        <div>
          {recentGames?.result == "waiting" && (
            <SubmitWinnerForm gameId={recentGames?._id} />
          )}
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={() => handlePrevPage()}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={() => handleNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
