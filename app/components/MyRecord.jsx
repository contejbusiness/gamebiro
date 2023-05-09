"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const MyRecord = () => {
  const { data: session } = useSession();

  const [records, setRecords] = useState({});
  console.log("🚀 ~ file: MyRecord.jsx:11 ~ MyRecord ~ records:", records);

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
      toast.error(data.message);
    }
  };

  useEffect(() => {
    fetchMyGameRecords();
  }, [session?.user]);

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
          {session?.user?.records.map((item) => (
            <tr key={item.period} className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium  whitespace-nowrap"
              >
                {item?.gameId?.gameCount}
              </th>
              <td className="px-6 py-4">{item.price}</td>
              <td className="px-6 py-4">{item.number}</td>
              <td className="px-6 py-4">{item.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyRecord;
