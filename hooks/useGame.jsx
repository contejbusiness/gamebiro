import { useState, useEffect } from "react";
import moment from "moment";
import { toast } from "react-hot-toast";

const useGame = () => {
  const [game, setGame] = useState({});

  const getLatestGame = async () => {
    try {
      const response = await fetch("/api/rgbet", {
        method: "GET",
        cache: "no-store",
      });
      const data = await response.json();

      if (response.ok) {
        setGame(data);
      } else {
        toast.error("Failed to load game");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getLatestGame();

    
  }, []);

  return { game };
};

export default useGame;
