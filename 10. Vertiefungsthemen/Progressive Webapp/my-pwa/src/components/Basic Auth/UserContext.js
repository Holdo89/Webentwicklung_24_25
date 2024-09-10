import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUserData, setCurrentUserData] = useState({});
  useEffect(() => {
    getUserContext();
  }, []);

  async function getUserContext() {
    try {
      const response = await fetch("/privatearea", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCurrentUserData(data);
    } catch (error) {
      navigate("../login");
      console.error("Error during login:", error);
    }
  }
  return (
    <UserContext.Provider
      value={{
        currentUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
