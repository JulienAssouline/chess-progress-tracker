import React, { useContext } from "react";
import { DataContext } from "../context";

const Rival: React.FC = () => {
  const data = useContext(DataContext);

  const dataFiltered: object[] = data.filter((d: any) => (d.black.username === "JulienAssouline" && d.white.username === "pazuzu4") || (d.white.username === "JulienAssouline" && d.black.username === "pazuzu4"))

  console.log(dataFiltered);

  return (
    <div className="rival-container">
      <h1> Rival </h1>
    </div>
  );
};

export default Rival;
