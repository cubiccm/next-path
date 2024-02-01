"use client";

import { useState } from "react";
import "./page.scss";
import { station_info } from "./stations";
import TrainList from "./train-list";
import { dataConfig } from "../../next.config.mjs";

function MenuItem({
  station, station_handler, menu_handler
} : {
  station: string,
  station_handler: Function,
  menu_handler: Function
}) {
  return (
    <span className="menu__item" onClick={() => {
      station_handler(station);
      menu_handler(false);
    }} style={{
      textAlign: station_info[station].location == "New Jersey" ? "left" : "right"
    }}>
      {station_info[station].name}
    </span>
  );
}

function Menu({
  station_handler, menu_handler
}: {
  station_handler: Function,
  menu_handler: Function
}) {
  let menu_items = [];
  for (const station of [
    "33S", "23S", "14S", "09S", "CHR", "HOB", "NEW", "EXP", "GRV", "JSQ", "WTC", "HAR", "NWK"
  ]) {
    menu_items.push(<MenuItem key={station} station={station} station_handler={station_handler} menu_handler={menu_handler}/>);
  }
  return (
    <div className="menu">
      {menu_items}
    </div>
  );
}

export default function Home() {
  enum LoadState {
    InProgress,
    Failed,
    Completed,
  }
  
  const [load_state, setLoadState] = useState(LoadState.InProgress);
  const [current_station, setCurrentStation] = useState("WTC");
  const [PATH_data, setPATHData] = useState(fetchData);
  const [menu_state, setMenuState] = useState(false);
  const [value, setValue] = useState(() => {
    setInterval(() => {
      fetchData();
    }, 6000);
    return false;
  });

  function fetchData() {
    fetch(dataConfig.path_data_source, {
      method: "GET",
    }).then((response) => {
      if (!response.ok) {
        setLoadState(LoadState.Failed);
      } else {
        response.json().then((data) => {
          processData(data);
          setLoadState(LoadState.Completed);
        }).catch((reason) => {
          setLoadState(LoadState.Failed);
        });
      }
    }).catch((reason) => {
      setLoadState(LoadState.Failed);
    });
    return null;
  }
  
  function processData(path_data: any) {
    const data: any = {};
    for (const station_data of path_data["results"]) {
      const station = station_data["consideredStation"];
      const nj_trains = [];
      const ny_trains = [];
      for (const direction of station_data["destinations"]) {
        let target = nj_trains;
        if ("ToNY" == direction["label"]) {
          target = ny_trains;
        }
        const trains_data = direction["messages"];
        for (const train_data of trains_data) {
          if (station_info[station]?.layout) {
            if (station_info[station].layout?.[0].destinations.includes(train_data["target"])) {
              nj_trains.push(train_data);
            } else if (station_info[station].layout?.[1].destinations.includes(train_data["target"])) {
              ny_trains.push(train_data);
            } else {
              target.push(train_data);
            }
          } else {
            target.push(train_data);
          }
        }
      }
      data[station] = [nj_trains, ny_trains];
    }
    setPATHData(data);
  }
  
  return (
    <main>
      {load_state == LoadState.Completed && <TrainList 
        data={PATH_data?.[current_station]?.[0] || []}
        direction={station_info[current_station]?.layout?.[0]["direction"] || "down"}
        destination={station_info[current_station]?.layout?.[0]["destination_sign"] || "New Jersey"}
      />}
      <div className="platform" onClick={() => {setMenuState(true);}}>
        <span className={"platform__name" + (
          load_state == LoadState.Completed && station_info[current_station].name.length > 12 ? " platform__name--small" : ""
        )}>
          {load_state == LoadState.Completed && station_info[current_station].name}
        </span>
        <span className="platform__location">
          {load_state == LoadState.InProgress && "Loading..."}
          {load_state == LoadState.Failed && "Failed to Load"}
          {load_state == LoadState.Completed && station_info[current_station].location}
        </span>
      </div>
      {load_state == LoadState.Completed && <TrainList 
        data={PATH_data?.[current_station]?.[1] || []}
        direction={station_info[current_station]?.layout?.[1]["direction"] || "up"}
        destination={station_info[current_station]?.layout?.[1]["destination_sign"] || "New York"}
      />}
      {menu_state && <Menu station_handler={setCurrentStation} menu_handler={setMenuState}/>}
    </main>
  );
}