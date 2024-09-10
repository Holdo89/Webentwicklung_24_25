'use client'

import { useEffect, useState } from 'react';

export default function Users() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/userdata');
      console.log(res)
      const result = await res.json();
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from MySQL</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.Username}</li>
        ))}
      </ul>
    </div>
  );
}
