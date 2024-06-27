import "./App.css";
import { useQuery } from "react-query";
import { FC, useEffect, useState } from "react";
// import User from "./User";
import { AppProps, ApiResponse } from "./App.types";

const App: FC<AppProps> = ({ title }) => {
  const userData = useQuery<ApiResponse, Error>(
    ["users"],
    () => {
      return fetch(
        "https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=2024-05-01&end_date=2024-05-15"
      ).then((response) => response.json());
    },
    {
      enabled: false,
    }
  );

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={() => userData.refetch()}>Get Users</button>
      <div>
        {userData.isFetching && <div>Fetching user data...</div>}
        {userData.isError && <div>{`Error get data!!!`}</div>}
        <h1>{userData.data && userData.data.message}</h1>

        {userData.data && userData.data.data.length > 0 && (
          <div>
            {userData.data.data.map((user) => (
              <div key={user.id}>{user.name}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
