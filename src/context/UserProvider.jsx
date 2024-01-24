import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [accessError, setAccessError] = useState(false);

  const value = {
    user,
    accessError,
    setAccessError,
  };

  onAuthStateChanged(getAuth(), (newUser) => {
    if (newUser) {
      console.log("user signed-in: ", newUser);
      setUser(newUser);
    } else {
      console.log("user signed out: ", newUser);
      setUser(newUser); //should be null
    }
  });

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
