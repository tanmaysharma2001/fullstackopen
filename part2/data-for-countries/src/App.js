import { useEffect, useState } from "react";
import axios from "axios";

const View = ({ filteredCountries }) => {
  const [coordinates, setCoordinates] = useState([]);
  const [temperature, setTemperature] = useState(0);

  function tempInCapital(cityName) {
    // let coordinates = longlatCapital(cityName);
    console.log("---" + coordinates + "asdsa----");
  }

  useEffect(() => {
  });

  return (
    <div>
      {console.log(filteredCountries[0])}
      <h1>{filteredCountries[0].name.common}</h1>
      <p>capital {filteredCountries[0].capital}</p>
      <p>area {filteredCountries[0].area}</p>
      <h2>languages:</h2>
      <ul type="disc">
        {Object.entries(filteredCountries[0].languages).map(([key, value]) => {
          return <li>{value}</li>;
        })}
      </ul>
      <h2>Flag</h2>
      <img src={filteredCountries[0].flags.png} />
      <h2>Weather in {filteredCountries[0].capital}</h2>
      <p>temperature {tempInCapital(filteredCountries[0].capital)} Celcius</p>
    </div>
  );
};

const Content = ({ filteredCountries, setFilteredCountries }) => {
  return (
    <ul>
      {filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : filteredCountries.length == 1 ? (
        <View filteredCountries={filteredCountries} />
      ) : (
        filteredCountries.map((currentCountry) => {
          return (
            <li>
              {currentCountry.name.common}{" "}
              <button
                onClick={() => {
                  setFilteredCountries([currentCountry]);
                }}
              >
                show
              </button>
            </li>
          );
        })
      )}
    </ul>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesName, setCountriesName] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleInputChange = (event) => {
    setCountriesName(event.target.value);

    const regex = new RegExp(countriesName, "i");
    const filteredPersons = () =>
      countries.filter((country) => country.name.common.match(regex));

    setFilteredCountries(filteredPersons);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      find countries
      <input value={countriesName} onChange={handleInputChange} />
      <Content
        filteredCountries={filteredCountries}
        setFilteredCountries={setFilteredCountries}
      />
    </div>
  );
};

export default App;
