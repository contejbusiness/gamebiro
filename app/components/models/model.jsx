"use client";

import React, { useState } from "react";

const Model = ({ title, message, onConfirm, onCancel }) => {
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(10);

  const [active, setActive] = useState(10);

  const handleIncrement = () => {
    setCount((count) => count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block w-4/5 mx-auto overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg sm:w-full sm:p-10">
          <h2 className="px-4 py-4 text-lg text-white bg-blue-500">{title}</h2>

          <div className="p-4">
            <p>Contract Money</p>
            <div className="flex items-center justify-between">
              {[10, 100, 1000, 10000].map((item) => (
                <button
                  className={`${
                    active === item ? "bg-blue-500" : "bg-blue-100"
                  } p-2 cursor-pointer rounded my-2`}
                  onClick={() => setActive(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-12 my-8">
              <p>Number</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleDecrement}
                  className="px-4 py-2 bg-blue-100 rounded shadow hover:bg-blue-500"
                >
                  -
                </button>
                <p>{count}</p>
                <button
                  onClick={handleIncrement}
                  className="px-4 py-2 bg-blue-100 rounded shadow hover:bg-blue-500"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center my-8">
              <p>Total : </p>
              <p className="font-bold text-blue-500">{active * count}</p>
            </div>

            <div className="flex items-center gap-4 text-white">
              <button className="flex-1 px-4 py-2 bg-blue-500 rounded shadow">
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-500 rounded shadow">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
