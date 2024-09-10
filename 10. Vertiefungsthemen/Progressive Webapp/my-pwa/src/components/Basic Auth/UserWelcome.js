import React, { useContext } from "react";
import { UserContext } from "./UserContext.js";
import { useNavigate } from "react-router-dom";

export default function UserWelcome() {
  const { currentUserData } = useContext(UserContext);
  const navigate = useNavigate();

  async function logout() {
    try {
      const response = await fetch("/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate("../login");
    } catch (error) {
      console.log("Logout not successfull");
    }
  }
 

  return (
    <div className="container">
      <h1>Hello from Basic Authentication {currentUserData.username}</h1>
      <button style={{width:"250px"}} onClick={() => logout()}>logout</button>
    </div>
  );
}
