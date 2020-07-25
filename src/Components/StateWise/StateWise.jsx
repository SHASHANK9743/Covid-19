import React, { useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
function StateWise() {
  let [bar, setBar] = useState({});
  useEffect(() => {
    fetch("https://api.rootnet.in/covid19-in/stats/latest")
      .then((resp) => resp.json())
      .then((info) => {
        let plot = info["data"]["regional"];
        let stateName = [];
        let confirmed = [];
        let recovered = [];
        let deceased = [];
        let active = [];
        for (var i = 1; i < plot.length; i++) {
          if (plot[i]["loc"] != "Dadra and Nagar Haveli and Daman and Diu") {
            stateName.push(plot[i]["loc"]);
            confirmed.push(plot[i]["totalConfirmed"]);
            recovered.push(plot[i]["discharged"]);
            deceased.push(plot[i]["deaths"]);
            active.push(
              plot[i]["totalConfirmed"] -
                plot[i]["discharged"] -
                plot[i]["deaths"]
            );
          }
        }
        for (var i = 0; i < confirmed.length; i++) {
          for (var j = 0; j < confirmed.length - i - 1; j++) {
            if (confirmed[j] < confirmed[j + 1]) {
              var tempConfirmed = confirmed[j];
              confirmed[j] = confirmed[j + 1];
              confirmed[j + 1] = tempConfirmed;

              var tempActive = active[j];
              active[j] = active[j + 1];
              active[j + 1] = tempActive;

              var tempRecovered = recovered[j];
              recovered[j] = recovered[j + 1];
              recovered[j + 1] = tempRecovered;

              var tempDeceased = deceased[j];
              deceased[j] = deceased[j + 1];
              deceased[j + 1] = tempDeceased;

              var tempStateName = stateName[j];
              stateName[j] = stateName[j + 1];
              stateName[j + 1] = tempStateName;
            }
          }
        }
        let dataSet = {
          labels: stateName.slice(1, 15),
          datasets: [
            {
              label: "Confirmed",
              data: confirmed.slice(1, 16),
              backgroundColor: "blue",
            },
            {
              label: "Active",
              data: active.slice(1, 16),
              backgroundColor: "orange",
            },
            {
              label: "Recover",
              data: recovered.slice(1, 16),
              backgroundColor: "green",
            },
            {
              label: "Deceased",
              data: deceased.slice(1, 16),
              backgroundColor: "red",
            },
          ],
        };
        setBar(dataSet);
      });
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <HorizontalBar
          data={bar}
          width={50}
          height={50}
          options={{ maintainAspectRatio: true }}
        />
      </div>
    </div>
  );
}
export default StateWise;
