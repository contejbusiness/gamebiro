"use client";

import { useEffect, useState } from "react";

const Record = () => {
  const data = [
    { period: 23123123, price: 30212, number: 1, result: "green" },
    { period: 41312435, price: 30213, number: 1, result: "red" },
    { period: 33123126, price: 30215, number: 1, result: "both" },
    { period: 42123134, price: 30213, number: 1, result: "green" },
    { period: 12123154, price: 30215, number: 1, result: "red" },
    { period: 43123123, price: 30216, number: 1, result: "both" },
    { period: 54123123, price: 30217, number: 1, result: "red" },
    { period: 64123123, price: 30218, number: 1, result: "green" },
    { period: 26123123, price: 30212, number: 1, result: "both" },
    { period: 23153123, price: 30212, number: 1, result: "green" },
  ];

  const [games, setGames] = useState([]);
  console.log("🚀 ~ file: Record.jsx:20 ~ Record ~ games:", games);

  const fetchAllGames = async () => {
    try {
      const response = await fetch("/api/rgbet/all", { method: "GET" });
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

  useEffect(() => {
    fetchAllGames();
  }, []);

  return (
    <div className="relative p-4 overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-blue-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              Period
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Number
            </th>
            <th scope="col" className="px-6 py-3">
              Result
            </th>
          </tr>
        </thead>
        <tbody>
          {games.map((item) => (
            <tr key={item?.gameCount} className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap "
              >
                {item?.gameCount}
              </th>
              <td className="px-6 py-4">{32345}</td>
              <td className="px-6 py-4">
                {item?.result ? item?.result : "waiting..."}
              </td>
              <td className="px-6 py-4">{`green`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Record;
