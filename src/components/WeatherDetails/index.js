import { useState } from "react";
import { BiMap } from "react-icons/bi";
import uuid from "react-uuid";

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function WeatherDetails(props) {
  const { tab, data } = props;
  let forcast = null;
  let currentDay = [];
  let currentDayHour = null;
  let otherDays = [];
  let otherDaysDiv = [];

  if (tab === "forecast" && data) {
    forcast = data.forecast.forecastday;

    forcast[0].hour.forEach((item) => {
      let date = new Date(item.time);
      var time = date.toLocaleString([], {
        hour: "2-digit",
      });

      currentDay.push(
        <div>
          <div className="div" id={uuid()}>
            <span style={{ fontSize: "12px" }}>{time}</span>
            <img src={item.condition.icon} alt="img" id={uuid()} />
            <span style={{ fontSize: "12px", fontWeight: "500" }}>
              {item.condition.text}
            </span>
            <div
              className="w-100 d-flex flex-row justify-content-around mt-1"
              style={{ fontSize: "12px", fontWeight: "500" }}
            >
              <span>
                {item.temp_c} <sup>°C</sup>
              </span>
              <span>
                {item.temp_f} <sup>°F</sup>
              </span>
            </div>
          </div>
        </div>
      );

      currentDayHour = (
        <div id={uuid()} className="day-forcast mt-3">
          {currentDay}
        </div>
      );
    });

    forcast.forEach((item) => {
      let date = new Date(item.date);
      let day = weekday[date.getDay()];
      otherDays.push(
        <div>
          <div className="div" id={uuid()}>
            <span style={{ fontSize: "12px" }}>{day}</span>
            <img src={item.day.condition.icon} alt="img" id={uuid()} />
            <span style={{ fontSize: "12px", fontWeight: "500" }}>
              {item.day.condition.text}
            </span>
            <div
              className="w-100 d-flex flex-row justify-content-around mt-1"
              style={{ fontSize: "12px", fontWeight: "500" }}
            >
              <span>
                {item.day.maxtemp_c} <sup>°C</sup>
              </span>
              <span>
                {item.day.mintemp_c} <sup>°C</sup>
              </span>
            </div>
          </div>
        </div>
      );
    });

    otherDaysDiv = (
      <div id={uuid()} className="day-forcast mt-3">
        {otherDays}
      </div>
    );
  }

  const lastUpdate = new Date(data.current.last_updated);
  const currentTime = new Date(data.location.localtime);

  const last_update_date = `${
    weekday[lastUpdate.getDay()]
  } ${lastUpdate.toLocaleTimeString()}`;

  const cureent_time = `${
    weekday[currentTime.getDay()]
  } ${currentTime.toLocaleTimeString()}`;

  const [temperature, setTemperature] = useState("celsius");

  const onToggleTemperature = () => {
    temperature === "celsius"
      ? setTemperature("fahrenheit")
      : setTemperature("celsius");
  };

  return (
    <div className="details-1">
      <div className="row mb-3">
        <div className="col-md-12 text-center">{cureent_time}</div>
      </div>

      <div className="row align-items-center">
        <div className="col-md-6 tempreture">
          <div className="text-center d-flex flex-column align-items-center">
            <img src={data.current.condition.icon} alt="icon" />
            <span style={{ fontSize: "13px" }}>
              {data.current.condition.text}
            </span>
          </div>

          <div
            className={`div d-flex ${
              temperature === "celsius" ? `d-block` : "d-none"
            }`}
          >
            <h1>{data.current.temp_c}</h1>
            <div>
              <span className="text-yellow">
                <b>°C </b>
              </span>
              |
              <span onClick={onToggleTemperature} style={{ cursor: "pointer" }}>
                <b> °F</b>
              </span>
            </div>
          </div>
          <div
            className={`div d-flex ${
              temperature === "fahrenheit" ? `d-block` : "d-none "
            }`}
          >
            <h1>{data.current.temp_f}</h1>
            <div>
              <span onClick={onToggleTemperature} style={{ cursor: "pointer" }}>
                <b>°C </b>
              </span>
              |
              <span className="text-yellow">
                <b> °F</b>
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-6 d-flex flex-column other-details">
          <span>
            <b>Wind:</b> {data.current.wind_mph} Mph, {data.current.wind_kph}
            Kph
          </span>
          <span>
            <b>Wind Direction:</b> {data.current.wind_dir}
          </span>
          <span>
            <b>Humidity:</b> {data.current.humidity}%
          </span>
          <span>
            <b>Air Quality:</b> {Math.round(data.current.air_quality.co)}
          </span>
        </div>
      </div>

      <div className="row mt-3" style={{ fontSize: "12px" }}>
        <div className="col-md-7">
          <span>
            <BiMap style={{ marginRight: "7px" }} />
            {data.location.name}, {data.location.region},{" "}
            {data.location.country}
          </span>
        </div>
        <div className="col-md-5 d-flex justify-content-end">
          <span>Last Updated: {last_update_date}</span>
        </div>
      </div>

      <hr className="mb-1 mt-1"></hr>

      {currentDayHour}

      {otherDaysDiv}
    </div>
  );
}

export default WeatherDetails;
