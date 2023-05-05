import Image from "next/image";
import GridGame from "./components/GridGame";
import Record from "./components/Record";
import MyRecord from "./components/MyRecord";
import { GiTrophy } from "react-icons/gi";

export default function Home() {
  return (
    <div>
      <GridGame />

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
