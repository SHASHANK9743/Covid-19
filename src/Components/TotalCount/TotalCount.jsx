import React, { useState, useEffect } from "react";

function TotalCount() {
  let [confirmed, setConfirmed] = useState(0);
  let [active, setActive] = useState(0);
  let [recovered, setRecovered] = useState(0);
  let [death, setDeath] = useState(0);
  useEffect(() => {
    fetch("https://api.rootnet.in/covid19-in/stats/latest")
      .then((resp) => resp.json())
      .then((data) => {
        setConfirmed(data["data"]["summary"]["confirmedCasesIndian"]);
        setRecovered(data["data"]["summary"]["discharged"]);
        setDeath(data["data"]["summary"]["deaths"]);
        setActive(confirmed - recovered - death);
      });
  });
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>Total Confirmed</h4>
            <h5>{confirmed}</h5>
          </div>
          <div className="col">
            <h4>Active Cases</h4>
            <h5>{active}</h5>
          </div>
          <div className="col">
            <h4>Total Recovered</h4>
            <h5>{recovered}</h5>
          </div>
          <div className="col">
            <h4>Total Deceased</h4>
            <h5>{death}</h5>
          </div>
        </div>
        <hr style={{ border: "1px solid black" }} />
      </div>
    </div>
  );
}
export default TotalCount;
