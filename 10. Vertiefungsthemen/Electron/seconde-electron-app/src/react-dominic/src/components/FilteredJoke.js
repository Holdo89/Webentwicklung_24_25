import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function FilteredJoke() {
  const [joke, setJoke] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  useEffect(() => {
    fetch("http://localhost:3000/filter?type=" + type)
      .then((response) => response.json())
      .then((data) => setJoke(data));
  }, []);

  
  return (
    <div>
      {joke.length>0 && joke.map(element => 
        <div key={element.id}>{element.jokeText}</div>
      )}
    </div>
  );
}
