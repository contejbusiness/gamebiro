import Image from "next/image";
import GridGame from "./components/GridGame";
import Record from "./components/Record";
import MyRecord from "./components/MyRecord";

export default function Home() {
  return (
    <div>
      <GridGame />
      <Record />
      <MyRecord />
    </div>
  );
}
