import { useState } from "react";
import { BiMap } from "react-icons/bi";

function WeatherDetails(props) {
  const data = props.data;

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date(data.current.last_updated);
  const last_update_date = `${
    weekday[date.getDay()]
  } ${date.toLocaleTimeString()}`;

  const [temperature, setTemperature] = useState("celsius");

  const onToggleTemperature = () => {
    temperature === "celsius"
      ? setTemperature("fahrenheit")
      : setTemperature("celsius");
  };

  return (
    <div className="details-1">
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
        <div className="col-md-6">
          <span>
            <BiMap style={{ marginRight: "7px" }} />
            {data.location.name}, {data.location.region},{" "}
            {data.location.country}
          </span>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <span>Last Updated: {last_update_date}</span>
        </div>
      </div>
      <hr className="mb-1 mt-1"></hr>
    </div>
  );
}

export default WeatherDetails;
