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

const generateColumns = (startDate: string, endDate: string): GridColDef[] => {
  const columns: GridColDef[] = [
    { field: "property", headerName: "", width: 150 },
    // { field: "roomName", headerName: "", width: 150 },
    // { field: "roomsToSell", headerName: "Room status ", width: 150 },
  ];

  const currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const day = String(currentDate).split(" ")[0] + "\n";
    const date = String(currentDate).split(" ")[2];
    const dateStr = currentDate.toISOString().split("T")[0];

    columns.push({
      field: dateStr,
      headerName: `${day}\n${date}`,
      width: 150,
      renderHeader: () => (
        <div style={{ textAlign: "right", whiteSpace: "pre-line" }}>
          {day}
          {date}
        </div>
      ),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return columns;
};

// const transformData = (
//   roomCategories: IRoomCategory[] | undefined,
//   startDate: string,
//   endDate: string
// ) => {
//   if (!roomCategories) return [];

//   const dateRange: string[] = [];
//   const currentDate = new Date(startDate);
//   const end = new Date(endDate);

//   while (currentDate <= end) {
//     dateRange.push(currentDate.toISOString().split("T")[0]);
//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   // Transform roomCategories into rows for the DataGrid
//   return roomCategories.map((roomCategory) => {
//     const row: RowData = {
//       id: roomCategory.id,
//       roomsToSell: roomCategory.occupancy,
//       // occupancy: roomCategory.occupancy,
//     };

//     roomCategory.inventory_calendar.map((calendar) => {
//       // console.log(calendar.date);
//       const date =
//         typeof calendar.date === "string"
//           ? calendar.date.split("T")[0]
//           : calendar.date.toISOString().split("T")[0];

//       if (dateRange.includes(date)) {
//         row[date] = calendar.available;
//         // row[date] = "";
//       }
//     });

//     return row;
//   });
// };

const transformData = (
  roomCategories: IRoomCategory[] | undefined,
  startDate: string,
  endDate: string
) => {
  const rows: RowData[] = [];

  if (!roomCategories) return [];

  roomCategories.forEach((roomCategory) => {
   
    const baseId = roomCategory.id;

    const dateRange: string[] = [];
    const currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
      dateRange.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    //Create row for room name
    const nameRow: RowData = {
      id: `${baseId}_name`,
      property: roomCategory.name,
    };

    dateRange.forEach(date => {
     return nameRow[date] = null;
    });
    // Create rows for each property

    const statusRow: RowData = {
      id: `${baseId}_status`,
      property: "Room status",
    };
    const roomsToSellRow: RowData = {
      id: `${baseId}_roomsToSell`,
      property: "Rooms to sell",
    };
    const netBookedRow: RowData = {
      id: `${baseId}_netBooked`,
      property: "Net booked",
    };
    //  const rateRow: RowData = { id: `${baseId}_rate`, property: 'Standard Rate' };

    roomCategory.inventory_calendar.forEach((calendar) => {
      // const dateStr = new Date(calendar.date).toISOString().split('T')[0];

      const dateStr =
        typeof calendar.date === "string"
          ? calendar.date.split("T")[0]
          : calendar.date.toISOString().split("T")[0];

      if (dateRange.includes(dateStr)) {
        statusRow[dateStr] = calendar.status ? "Open" : "Close";
        roomsToSellRow[dateStr] = calendar.available;
        netBookedRow[dateStr] = calendar.booked;
        // rateRow[dateStr] = roomCategory.rate_plans[0].calendar.find(rate => rate.date === calendar.date)?.rate || 0;
        // const rate = roomCategory.rate_plans[0].calendar.find(rate => rate.date === calendar.date)?.rate;
        // if (rate !== undefined) {
        //   rateRow[dateStr] = rate;
        // }
      }
    });

    rows.push(nameRow, statusRow, roomsToSellRow, netBookedRow);
  });

  return rows;
};

const DataTable: React.FC<DataTableProps> = ({ startDate, endDate }) => {
  const { data, isLoading, error } = useRateCalendar(startDate, endDate);
  // console.log(data);

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
