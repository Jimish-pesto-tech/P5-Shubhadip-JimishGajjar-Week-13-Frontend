import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import oops from "../../assets/browser.png";
import WeatherDetails from "../WeatherDetails/index";

function Weather() {
  const [tab, setTab] = useState("current");
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  function onSetSearch(e) {
    setSearch(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let url = "";
      if (tab === "cureent") {
        url = `${process.env.REACT_APP_API_URL}forcast/cureent/${search}`;
      } else {
        url = `${process.env.REACT_APP_API_URL}forcast/${search}/10`;
      }

      await fetch(url)
        .then((responce) => responce.json())
        .then((data) => {
          setLoading(false);
          setData(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeTab = () => {
    tab === "current" ? setTab("forecast") : setTab("current");
  };

  return (
    <>
      <div className="weather-inner">
        <div className="weather-btn">
          <button
            className={`btn btn-default w-100 ${
              tab === "current" ? `active` : ""
            }`}
            onClick={onChangeTab}
          >
            Current
          </button>
          <button
            className={`btn btn-default w-100 ${
              tab === "forecast" ? `active` : ""
            }`}
            onClick={onChangeTab}
          >
            Forecast
          </button>
        </div>

        <div className="tab mt-3">
          <form method="post" id="search-weather" onSubmit={onSubmit}>
            <div className="search-tab d-flex">
              <div className="text-left w-100">
                <input
                  className="form-control input"
                  type="text"
                  placeholder="Search City"
                  value={search}
                  onChange={onSetSearch}
                />
              </div>
              <button
                className="btn btn-default btn-search"
                disabled={search < 1}
                onClick={onSubmit}
              >
                {loading ? (
                  <i className="fa fa-refresh fa-spin" />
                ) : (
                  <BiSearchAlt2 />
                )}
              </button>
            </div>
          </form>
        </div>

        <hr></hr>

        {data ? (
          data.error ? (
            <div className="d-flex flex-column align-items-center">
              <img className="mb-2" src={oops} alt="oops" />
              <h2>Opps! Data Not Found</h2>
            </div>
          ) : (
            <WeatherDetails tab={tab} data={data} />
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Weather;
