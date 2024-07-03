export interface AppProps {
  title: string;
}

export interface User {
  id: string;
  name: string;
  occupancy: number;
  // username: string;
  // email: string;
  // message: string;
  // address: {
  //   street: string;
  //   suite: string;
  //   city: string;
  //   zipcode: string;
  //   geo: {
  //     lat: string;
  //     lng: string;
  //   };
  // };
  // phone: string;
  // website: string;
  // company: {
  //   name: string;
  //   catchPhrase: string;
  //   bs: string;
  // };
}

// Grit start

export interface DataTableProps {
  startDate: string;
  endDate: string;
}

export interface RowData {
  id: string;
  roomType: string;
  [key: string]: string | number;
}

export interface IRateCalendar {
  id: string;
  date:  string | Date;
  rate: number;
  min_length_of_stay: number;
  reservation_deadline: number;
}

export interface IRatePlan {
  id: number;
  name: string;
  calendar: IRateCalendar[];
}

export interface IRoomInventoryCalender {
  id: string;
  date: string | Date;
  available: number;
  status: boolean;
  booked: number;
}

export interface IRoomCategory {
  id: string;
  name: string;
  occupancy: number;
  inventory_calendar: IRoomInventoryCalender[];
  rate_plans: IRatePlan[];
}

export interface ApiResponse {
  code: string;
  message: string;
  data: IRoomCategory[];
}

// // Grit end

//chatGPT
export interface Rate {
  date: string;
  status: string;
  roomsToSell: number;
  netBooked: number;
  standardRate: number;
}

export interface Room {
  roomType: string;
  rates: Rate[];
}
