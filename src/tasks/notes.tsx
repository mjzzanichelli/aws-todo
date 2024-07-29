import { useEffect, useState } from "react";
import { REACT_APP_WHEATHER_API_KEY, REACT_APP_LOCATIONS } from "../env";
import { TaskDataType } from "./meta";

export const Locations = REACT_APP_LOCATIONS.split("|");

export interface WeatherSchema {
  current: {
    condition: {
      code: number;
      icon: string;
      text: string;
    };
    temp_c: number;
  };
}

const { protocol } = window.location;

export async function getWeather(q: string) {
  const url = new URL("current.json", `${protocol}//api.weatherapi.com/v1/`);
  url.searchParams.append("key", REACT_APP_WHEATHER_API_KEY);
  url.searchParams.append("aqi", "no");
  url.searchParams.append("q", q);

  return fetch(url.toString())
    .then((res) => {
      if (!res.ok) return;
      return res.json();
    })
    .then((weather: WeatherSchema) => weather);
}

export function Notes(args: { task: TaskDataType }) {
  const { task } = args;
  const [weather, setWeather] = useState<WeatherSchema>();

  useEffect(() => {
    const q = Locations.find((item: string) => {
      const exp = new RegExp(`(^|\\W+)(${item})(\\W+|$)`, "gi");
      return exp.test(task.name);
    });

    if (!q) return;

    getWeather(q).then(setWeather);

    return () => {
      setWeather(undefined);
    };
  }, [task.name]);
  if (!weather) return null;
  return (
    <>
      (<img
        src={`${protocol}/${weather.current.condition.icon}`}
        style={{ height: "1.5rem", verticalAlign: "middle" }}
        title={"current weather"}
        alt={weather.current.condition.text}
      />
      &nbsp;{weather.current.temp_c}&deg;C)
    </>
  );
}
