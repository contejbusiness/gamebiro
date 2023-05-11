"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const RecentGames = async () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchAllGames = async () => {
    try {
      const response = await fetch(
        `/api/admin/all?page=${page}&limit=${limit}`,
        { method: "GET" }
      );
      const data = await response.json();

      if (response.ok) {
        setGames(data);
      } else {
        toast.error(data);
      }
    } catch (error) {
      toast.error(error);
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
    fetchAllGames();
  }, [page, limit]);

  return <div></div>;
};

export default RecentGames;
