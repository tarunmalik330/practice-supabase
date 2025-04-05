"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

const UserDetail = () => {
  // const [counter, setCounter] = useState(0);

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    detail();
  }, []);
  async function detail() {
    let { data: user, error } = await supabase.from("user").select("*");
    setUserData(user);
  }
  return (
    <div className="container mx-auto pt-9 max-w-[1164px]">
      {/* <p>current count: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>increment</button> */}
      <ul>
        {userData.map((obj, i) => (
          <div key={i}>
            <li>{obj.name}</li>
            <li>{obj.lastname}</li>
            <li>{obj.email}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
