export interface AppProps {
  title: string;
}

export interface ApiResponse {
  message: string;
  data: User[];
}


export interface User {
  id: number;
  name: string;
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


