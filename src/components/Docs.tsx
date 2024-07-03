import React from "react";
import { useQuery } from "react-query";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import {
  RowData,
  ApiResponse,
  IRoomCategory,
  DataTableProps,
} from "../App.types";

const useRateCalendar = (startDate: string, endDate: string) => {
  return useQuery<ApiResponse, Error>(
    ["rateCalendar", startDate, endDate],
    async () =>
      await fetch(
        `https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=${startDate}&end_date=${endDate}`
      ).then((response) => response.json())
  );
};

// const userData = useQuery<ApiResponse, Error>(
//   ["users"],
//   () => {
//     return fetch(
//       "https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=2024-05-01&end_date=2024-05-15"
//     ).then((response) => response.json());
//   },
//   {
//     enabled: false,
//   }
// );

const generateColumns = (startDate: string, endDate: string): GridColDef[] => {
  const columns: GridColDef[] = [
    { field: "roomType", headerName: "Room Type", width: 150 },
  ];

  const currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
  
    const day = String(currentDate).split(" ")[0] + "\n";
    const date = String(currentDate).split(" ")[2];
    const columnString = day.concat(" ", date);
    const dateStr = currentDate.toISOString().split("T")[0];
   
    columns.push({
      field: dateStr,
      headerName: columnString,
      width: 150,
      renderHeader: () => (
        <div style={{ textAlign: "right", whiteSpace: "pre-line" }}>
          {day}{date}
        </div>
      ),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return columns;
};

const transformData = (
  roomCategories: IRoomCategory[] | undefined,
  startDate: string,
  endDate: string
) => {
  if (!roomCategories) return [];
  // Generate a list of all dates in the range
  const dateRange: string[] = [];
  const currentDate = new Date(startDate);
  // console.log(currentDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    dateRange.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Transform roomCategories into rows for the DataGrid
  return roomCategories.map((roomCategory) => {
    const row: RowData = {
      id: roomCategory.id,
      roomType: roomCategory.name,
    };

    roomCategory.inventory_calendar.map((calendar) => {
      // console.log(calendar.date);
      const date =
        typeof calendar.date === "string"
          ? calendar.date.split("T")[0]
          : calendar.date.toISOString().split("T")[0];

      if (dateRange.includes(date)) {
        row[date] = calendar.available;
      }
    });

    return row;
  });
};

const DataTable: React.FC<DataTableProps> = ({ startDate, endDate }) => {
  const { data, isLoading, error } = useRateCalendar(startDate, endDate);
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const rows = transformData(data?.data, startDate, endDate);
  const columns = generateColumns(startDate, endDate);

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
};

export default DataTable;
