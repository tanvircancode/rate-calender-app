export interface AppProps {
  title: string;
}


// Grit start

export interface DataTableProps {
  startDate: string;
  endDate: string;
}

export interface RowData {
  id: string;
  property: string;
  [key: string]: string | number | undefined | null;
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
