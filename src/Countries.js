import { useEffect, useState } from "react";
import Weather from "./Weather";
const Countries = ({ newName, filteredCountries, allInfo }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleShowButton = (name) => {
    const countryData = allInfo.find(
      (country) => country.name.common === name
    );
    setSelectedCountry(countryData);
  };

  useEffect(()=>{
    if(filteredCountries.length === 1){
      handleShowButton(filteredCountries[0])
    }
    else{
      setSelectedCountry('')
    }
  },[filteredCountries])
  if (selectedCountry) {
    const languages = Object.values(selectedCountry.languages);
    return (
      <div>
        <h1>{selectedCountry.name.common}</h1>
        <p>capital {selectedCountry.capital}</p>
        <p>area {selectedCountry.area}</p>
        <h2>languages :</h2>
        <ul>
          {languages.map((lang) => (
            <li className="languages" key={lang}>
              {lang}
            </li>
          ))}
        </ul>
        <img className = "flag"src={selectedCountry.flags.png} alt="flag" />
        <Weather selectedCountry={selectedCountry}/>
      </div>
    );
  }
  return (
    <div>
      {Boolean(newName) && filteredCountries.length > 0 && (
        filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          <div>
            {filteredCountries.length > 1 && filteredCountries.map((data) => (
              <div key={data}>
                <span>{data}</span>
                <button onClick={() => handleShowButton(data)}>show</button>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Countries;
