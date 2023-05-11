"use client";

import SearchUser from "@/app/components/inputs/SearchUser";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Page = () => {
  const [redeems, setRedeems] = useState([]);
  console.log("🚀 ~ file: page.jsx:9 ~ Page ~ redeems:", redeems);

  const fetchRedeems = async () => {
    try {
      const response = await fetch("/api/admin/redeemreq", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setRedeems(data);
      } else {
        console.log("No Requests Found");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchRedeems();
  }, []);

  const handleSubmit = async (request) => {
    
  }

  return (
    <div className="p-4">
      <div className="border-b pb-4">
        <h2 className="text-lg">Search User</h2>
        <p className="text-xs text-slate-500 mb-4">
          Enter user email id to check his/her profile
        </p>
        <SearchUser />
      </div>
      <div className="mt-4">
        <h2 className="text-lg">Redeem Requests</h2>
        <p className="text-xs text-slate-500 mb-4">
          Redeem Requests by mail ids
        </p>

        {redeems.map((redeem, i) => (
          <div key={i} className="flex items-center justify-between border-b">
            <div className="">
              <p className="text-xs my-2">
                Name : <span className="text-sm font-bold">{redeem?.name}</span>
              </p>
              <p className="text-xs my-2">
                Email :{" "}
                <span className="text-sm font-bold">{redeem?.email}</span>
              </p>
              <p className="text-xs my-2">
                Amount :{" "}
                <span className="text-sm text-blue-500 font-bold">
                  {redeem?.amount}
                </span>
                - {redeem?.status}
              </p>
            </div>
            <button className="px-4 py-2 text-xs bg-blue-500 shadow rounded text-white">
              DONE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
