"use client";

import GridGame from "./components/GridGame";
import Record from "./components/Record";
import MyRecord from "./components/MyRecord";
import { GiTrophy } from "react-icons/gi";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <GridGame user={session?.user} />

      <div className="flex items-center justify-center w-full gap-3 mt-8 mb-2">
        <GiTrophy />
        <h2>Sapre Record</h2>
      </div>
      <Record />

      <div className="flex items-center justify-center w-full gap-3 mt-8 mb-2">
        <GiTrophy />
        <h2>My Record</h2>
      </div>
      <MyRecord />
    </div>
  );
}
