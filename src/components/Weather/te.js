<div className="details-1 d-flex">
  <div className="w-50">
    <div
      className={`celsius d-flex ${
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
      className={`fahrenheit d-flex ${
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

  <div className="d-flex flex-column w-50" style={{ textAlign: "right" }}>
    <div className="d-flex other-details">
      <div className="d-flex flex-column align-items-start">
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
      </div>
      <div className="d-flex flex-column text-center">
        <img src={data.current.condition.icon} alt="icon" />
      </div>
    </div>
    <hr></hr>
    <span>
      <b>
        {data.location.name}, {data.location.region},{data.location.country}
      </b>
    </span>
    <span>{data.location.localtime}</span>
  </div>
</div>;
