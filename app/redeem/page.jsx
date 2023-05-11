"use client";

import { toast } from "react-hot-toast";
import RedeemBalanceForm from "../components/inputs/RedeemBalanceForm";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Page = () => {
  const { data: session } = useSession();

  console.log("lajflaksjflaksjflasjfd");
  console.log("🚀 ~ file: page.jsx:10 ~ Page ~ session:", session);

  const data = [
    {
      amount: 100,
      time: "20-JAN-2021",
      status: "PENDING",
    },
    {
      amount: 50,
      time: "20-JAN-2021",
      status: "DONE",
    },
    {
      amount: 120,
      time: "20-JAN-2021",
      status: "DONE",
    },
    {
      amount: 170,
      time: "20-JAN-2021",
      status: "DONE",
    },
  ];

  const fetchRedeems = async () => {
    const response = await fetch("/api/redeem", {
      method: "PUT",
      body: {
        email: session?.user?.email,
      },
    });
    const data = await response.json();
    if (response.ok) {
      toast.success("FOUND");
    } else {
      toast.error("ERROR");
    }
  };

  
  useEffect(() => {
    fetchRedeems();
  }, []);

  const handleSubmit = async (inputBank, inputAmount) => {
    try {
      const response = await fetch("/api/redeem", {
        method: "POST",
        body: JSON.stringify({
          email: session?.user?.email,
          name: session?.user?.name,
          amount: inputAmount,
          bank: inputBank,
        }),
      });

      if (response.ok) {
        toast.success("Request Sent");
      } else {
        toast.error("Failed to send request");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="px-4">
      <div className="flex flex-col gap-2 w-full border-b pb-20">
        <h2 className="text-lg">Redeem Balance</h2>
        <p className="text-xs text-slate-500">
          Enter Your Redeem Account Details
        </p>

        <div className="w-full">
          <RedeemBalanceForm onSubmit={handleSubmit} />
        </div>
      </div>

      <h2 className="text-lg mt-6">Redeem History</h2>
      <p className="text-xs text-slate-500">Status of your recent requests</p>

      {data.map((item) => (
        <div className="border-b py-4">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-sm  text-slate-700 ">{item.time}</h2>
            <p className="text-green-500">{item.amount}</p>
          </div>
          <p className="text-xs mt-2">
            Status :{" "}
            <span className="font-bold text-blue-500">{item.status}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Page;
