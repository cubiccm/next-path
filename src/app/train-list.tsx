import { useState } from "react";
import SecondsTimer from "./seconds-timer";

export interface TrainData {
  lastUpdated: string,
  secondsToArrival: string,
  lineColor: string,
  headSign: string,
  target: string,
  arrivalTimeMessage: string,
}

export function Train({data}: {
  data: TrainData
}) {
  const [value, setValue] = useState(() => {
    setInterval(() => {
      setValue(x => !x);
    }, 200);
    return false;
  });
  const last_update_timestamp = new Date(data["lastUpdated"]).getTime();
  const current_time = new Date();
  const seconds_to_arrival = parseInt(data["secondsToArrival"]) - (current_time.getTime() - last_update_timestamp) / 1000;

  let next_arrival = <></>;
  if (seconds_to_arrival > 30) {
    next_arrival = <>
      <span>{Math.ceil(seconds_to_arrival / 60)}</span>
      <span className="train__arrival-time__min">min</span>
      <SecondsTimer percentage={seconds_to_arrival % 60 / 60 * 100} />
    </>;
  } else if (seconds_to_arrival > 0) {
    next_arrival = <>Arriving</>
  } else {
    next_arrival = <>Arrived</>
  }

  return (
    <div className="train" style={{
      color: data["lineColor"].length == 6 ? "#" + data["lineColor"] : "rgba(255, 255, 255, .8)",
      background: data["lineColor"].length == 6 ? "#" + data["lineColor"] + "55" : `linear-gradient(217deg, #4D92FB99, #FF9900aa)`,
    }}>
      <span className="train__head-sign">{data["headSign"]}</span>
      <span className="train__short-destination">{data["target"]}</span>
      <span className="train__message">{data["arrivalTimeMessage"].slice(-3) != "min" && data["arrivalTimeMessage"]}</span>
      <div className="train__arrival-time">
        {next_arrival}
      </div>
    </div>
  )
}

export default function TrainList({
  data, direction = "up", destination = "New York"
}: {
  data: Array<TrainData>,
  direction: string,
  destination: string
}) {
  let id = 0;
  const train_list_items = data?.map(train =>
    <Train 
      key={id++}
      data={train}
    />
  );
  return (
    <div className="train-wrapper" style={{
      flexDirection: direction == "up" ? "column" : "column-reverse"
    }}>
      <div className="train-wrapper__direction">
        <span className="train-wrapper__direction__icon">{direction == "up" ? "\u{25B2}" : "\u{25BC}"}</span>
        <span>To {destination}</span>
      </div>
      {train_list_items}
    </div>
  )
}