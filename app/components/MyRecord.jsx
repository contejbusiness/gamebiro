"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const MyRecord = () => {
  const PAGE_SIZE = 1;
  const { data: session } = useSession();
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchMyGameRecords();
  }, [session?.user]);

  const fetchMyGameRecords = async () => {
    try {
      const response = await fetch(`/api/rgbet/bet/${session?.user?.id}`, {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        setRecords(data);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  let grouped = {};

  if (records?.length > 0) {
    grouped = records.reduce((acc, obj) => {
      const key = obj.gameId._id;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  let totalRecords = Object.keys(grouped).length;
  let totalPages = Math.ceil(totalRecords / PAGE_SIZE);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRefresh = () => {
    fetchMyGameRecords();
  };

  let startIndex = (currentPage - 1) * PAGE_SIZE;
  let endIndex = startIndex + PAGE_SIZE;
  let currentRecords = Object.values(grouped).slice(startIndex, endIndex);

  // Render the component

  return (
    <div className=" p-4 w-full">
      {currentRecords &&
        currentRecords?.map((value, i) => {
          return (
            <div key={i} className="border-b">
              <div className="flex items-center justify-between bg-blue-200 py-2 px-4 text-xs font-bold">
                <div className="flex items-center gap-3">
                  <span>PERIOD</span>
                  <span>{value[0]?.gameId?.gameCount}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>RESULT</span>
                  <span>{value[0]?.gameId?.result}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs my-3">
                  5% Commission is charged for each bet
                </p>
                <button
                  onClick={() => handleRefresh()}
                  className="text-white bg-blue-500  px-2 py-1 text-xs rounded-full shadow"
                >
                  Refresh
                </button>
              </div>
              <div className="flex items-center gap-4 my-5">
                <div className="">Bets</div>
                <div className="grid grid-cols-5 gap-3">
                  {value?.map((item, i) => (
                    <div
                      key={i}
                      className="border px-4 py-2 gap-2 flex flex-col items-center"
                    >
                      <span className="border-b">{item.betNumber}</span>
                      <span className="text-green-500">₹{item.betAmount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      <div className="flex justify-center items-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((page, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              page === currentPage ? "bg-gray-400" : "bg-gray-200"
            }`}
            onClick={() => handleClick(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyRecord;
