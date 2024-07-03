import "./App.css";
import { useQuery } from "react-query";
import { FC, useEffect, useState } from "react";
// import User from "./User";
import { AppProps, ApiResponse } from "./App.types";
import DataTable from "./components/Docs";

const App: FC<AppProps> = ({ title }) => {


  return (
    <div className="xxx">
      <DataTable startDate="2024-05-01" endDate="2024-05-15" /> 
    </div>
  );
};

export default App;
