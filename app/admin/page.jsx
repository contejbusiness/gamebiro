import React from "react";

import AddBalanceForm from "../components/inputs/AddBalanceForm";

const Page = () => {
  return (
    <div className="px-4">
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-lg">Add Balance</h2>
        <p className="text-xs text-slate-500">
          Add balance to wallet by there mail id
        </p>

        <div className="w-full">
          <AddBalanceForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
