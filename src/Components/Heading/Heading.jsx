import React, { useState, useEffect } from "react";

function Heading() {
  let [date, setDate] = useState("");
  let [time, setTime] = useState("");
  useEffect(() => {
    fetch("https://api.rootnet.in/covid19-in/stats/latest")
      .then((resp) => resp.json())
      .then((data) => {
        setDate(data["lastRefreshed"].substring(0, 10));
        setTime(data["lastRefreshed"].substring(11, 16));
      });
  });
  return (
    <div className="container">
      <br />
      <h2>2019 n-Coronavirus Summary India</h2>
      <h6>
        Last Updated | {date} | Time {time}
      </h6>
      <hr style={{ border: "1px solid black" }} />
    </div>
  );
}
export default Heading;
