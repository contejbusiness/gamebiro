"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

const SearchUser = () => {
  const [email, setEmail] = useState("");

  const [user, setUser] = useState({});
  console.log("🚀 ~ file: SearchUser.jsx:10 ~ SearchUser ~ user:", user);

  const fetchUser = async () => {
    const response = await fetch("/api/admin/user", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    setUser(data);

    if (response.ok) {
      setUser(data);
    } else {
      toast.error(data);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 my-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
          </svg>
        </div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          id="input-group-1"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="user@gmail.com"
        />
      </div>

      <button
        className="w-full py-2 bg-blue-500 shadow-lg rounded-lg text-white"
        onClick={() => fetchUser()}
      >
        Search
      </button>

      {user?.email && (
        <div className="flex flex-col gap-2 border rounded-sm p-4">
          <p className="text-xs">
            Name: <span className="">{user.name}</span>
          </p>
          <p className="text-xs">
            Email: <span>{user.email}</span>
          </p>
          <p className="text-xs">
            Balance: <span>{user.balance}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchUser;
