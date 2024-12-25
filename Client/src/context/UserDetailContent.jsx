import React, { createContext } from "react"; // Make sure to import React and createContext

const UserDetailContext = createContext({
  userDetail: { favorites: [], bookings: [], token: null },
  setUserDetail: () => {},
});

export default UserDetailContext;
