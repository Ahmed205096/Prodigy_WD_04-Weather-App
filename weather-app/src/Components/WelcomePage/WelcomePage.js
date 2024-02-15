import "./WelcomePage.css";
import getWeatherData from "../APIs/GetRequest";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherCountry } from "../../Redux_TK/Slice/WeatherReducer";
import { useEffect, useState } from "react";
import { getDayName } from "../HelperFunctions";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind } from "@fortawesome/free-solid-svg-icons";




export default function WelcomePage() {
  // Use State For Fetch The Country Name
  const [country, setCountry] = useState("Egypt");

  const state = useSelector((state) => state.country);

  // Use State For Fetch The Weather
  const [weather, setWeather] = useState([]);

  // Use State For Fetch The Weather
  const [resultWeather, setresultWeather] = useState({
    country: "",
    region: "",
    timeZone: "",
    localTime: "",
    tempC: "",
    conditionText: "",
    conditionIcon: "",
    windKPH: "",
  });

  const [threeDays, setThreeDays] = useState([
    {
      maxTemp: "",
      minTemp: "",
      avgTemp: "",
      condition: "",
      conditionIcon: "",
      windKPH: "",
    },
    {
      maxTemp: "",
      minTemp: "",
      avgTemp: "",
      condition: "",
      conditionIcon: "",
      windKPH: "",
    },
    {
      maxTemp: "",
      minTemp: "",
      avgTemp: "",
      condition: "",
      conditionIcon: "",
      windKPH: "",
    },
  ]);

  // Get The Country State
  const dispatch = useDispatch();

  // Use Effect Fot Dispach The Side Effect (setWeatherCountry , getWeatherData)
  useEffect(() => {
    dispatch(setWeatherCountry(country));
    setWeather(getWeatherData(country));
  }, [dispatch, country]);

  //  Use Effect To Deliver The Data Into (resultWeather)
  useEffect(() => {
    const catchDataFromAPI = async () => {
      try {
        const data = await weather;

        if (
          data.forecast &&
          data.forecast.forecastday &&
          data.forecast.forecastday.length >= 3
        ) {
          const day1 = data.forecast.forecastday[0];
          const day2 = data.forecast.forecastday[1];
          const day3 = data.forecast.forecastday[2];

          setresultWeather({
            country: data.location.country,
            region: data.location.region,
            timeZone: data.location.tz_id,
            localTime: data.location.localtime,
            tempC: data.current.temp_c,
            conditionText: data.current.condition.text,
            conditionIcon: data.current.condition.icon,
            windKPH: data.current.wind_kph,
          });

          setThreeDays([
            {
              maxTemp: day1.day.maxtemp_c,
              minTemp: day1.day.mintemp_c,
              avgTemp: day1.day.avgtemp_c,
              condition: day1.day.condition.text,
              conditionIcon: day1.day.condition.icon,
              windKPH: day1.day.maxwind_kph,
            },
            {
              maxTemp: day2.day.maxtemp_c,
              minTemp: day2.day.mintemp_c,
              avgTemp: day2.day.avgtemp_c,
              condition: day2.day.condition.text,
              conditionIcon: day2.day.condition.icon,
              windKPH: day2.day.maxwind_kph,
            },
            {
              maxTemp: day3.day.maxtemp_c,
              minTemp: day3.day.mintemp_c,
              avgTemp: day3.day.avgtemp_c,
              condition: day3.day.condition.text,
              conditionIcon: day3.day.condition.icon,
              windKPH: day3.day.maxwind_kph,
            },
          ]);
        } else {
          console.log("Invalid data structure in weather object");
        }
      } catch (err) {
        console.error("Error fetching weather data:", err);
      }
    };
    catchDataFromAPI();
  }, [weather]);

  const options = [
    { value: "Egypt", label: "Egypt" },
    { value: "Palestine", label: "Palestine" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Libya", label: "Libya" },
    { value: "Iraq", label: "Iraq" },
    { value: "United Arab Emirates", label: "UAE" },
    { value: "India", label: "India" },
    { value: "UK", label: "UK" },
  ];
  // Store The Selector In The Const inputField
  const inputField = (
    <Select
      styles={{
        control: (provided) => ({
          ...provided,
          backgroundColor: "#1e202b",
        }),
      }}
      onChange={(e) => {
        console.log("Country Now Is: ", state);
        setCountry(e.value);
      }}
      options={options}
    />
  );

  // The Icon That Appear In The Middle Of The Page
  const stateIcon = (
    <div className="status-icon">
      <img src={resultWeather.conditionIcon} alt="" />
    </div>
  );

  // Start The Return Function
  return (
    // Main Container
    <div className="container">
      {/* The Container That Hold The Selec Field */}
      <div className="button-container">{inputField}</div>
      {/* The Icon Thats Appear In The Middle Of The Page */}
      <div className="status-icon-container">
        {stateIcon} {resultWeather.country}
      </div>
      {/* Start The Table Container */}
      <div className="table-container">
        <table>
          {/* Start The Head  */}
          <thead>
            <tr>
              {/* The Current Day */}
              <th>{getDayName(resultWeather.localTime)}</th>
              {/* The Next Day */}
              <th>{getDayName(resultWeather.localTime, 1)}</th>
              {/* The Day Number 2 */}
              <th>{getDayName(resultWeather.localTime, 2)}</th>
              {/* The Day Number 3 */}
              <th>{getDayName(resultWeather.localTime, 3)}</th>
            </tr>
          </thead>
          {/* End The Head  */}

          {/* Start The Body */}
          <tbody>
            {/* Start The Row */}
            <tr>
              {/* Start The First Colum */}
              <td>
                <div className="td-container">
                  <h4>
                    {resultWeather.country} (
                    {resultWeather.region === "" &&
                    resultWeather.country === "Palestine"
                      ? "Jerusalem"
                      : resultWeather.region.slice(0,10)}
                    )
                  </h4>
                  <br />
                  {resultWeather.tempC}&#8451;
                  <br />
                  <img src={resultWeather.conditionIcon} alt="" />
                  <br />
                  {resultWeather.conditionText}
                  <br />
                  <p>
                    <FontAwesomeIcon icon={faWind} /> {resultWeather.windKPH}{" "}
                    km/h
                  </p>
                </div>
              </td>
              {/* End The First Colum */}

              {/* Start The 2nd Colum */}
              <td>
                <div className="td-container">
                  Max {threeDays[0].maxTemp}&#8451;
                  <br />
                  Min {threeDays[0].minTemp}&#8451;
                  <br />
                  Avg {threeDays[0].avgTemp}&#8451;
                  <br />
                  <img src={threeDays[0].conditionIcon} alt="" />
                  <br />
                  {threeDays[0].condition}
                  <br />
                  <p>
                    <FontAwesomeIcon icon={faWind} /> {threeDays[0].windKPH}{" "}
                    km/h
                  </p>
                </div>
              </td>
              {/* End The 2nd Colum */}

              {/* Start The 3rd Colum */}
              <td>
                <div className="td-container">
                  Max {threeDays[1].maxTemp}&#8451;
                  <br />
                  Min {threeDays[1].minTemp}&#8451;
                  <br />
                  Avg {threeDays[1].avgTemp}&#8451;
                  <br />
                  <img src={threeDays[1].conditionIcon} alt="" />
                  <br />
                  {threeDays[1].condition}
                  <br />
                  <p>
                    <FontAwesomeIcon icon={faWind} /> {threeDays[1].windKPH}{" "}
                    km/h
                  </p>
                </div>
              </td>
              {/* End The 3rd Colum */}

              {/* Start The 4th Colum */}
              <td>
                <div className="td-container">
                  Max {threeDays[2].maxTemp}&#8451;
                  <br />
                  Min {threeDays[2].minTemp}&#8451;
                  <br />
                  Avg {threeDays[2].avgTemp}&#8451;
                  <br />
                  <img src={threeDays[2].conditionIcon} alt="" />
                  <br />
                  {threeDays[2].condition}
                  <br />
                  <p>
                    <FontAwesomeIcon icon={faWind} /> {threeDays[2].windKPH}{" "}
                    km/h
                  </p>
                </div>
              </td>
              {/* End The 4th Colum */}
            </tr>
            {/* End The  Row */}
          </tbody>
          {/* End The Body */}
        </table>
      </div>
      {/* End The Table Container */}
    </div>
  );
  // End The Return Function
}
