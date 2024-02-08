import React, { useEffect, useState } from 'react';
import server from './services/server';
import Weather from './weather';

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    server.getAll("https://studies.cs.helsinki.fi/restcountries/api/all").then(response => { // getAll takes >>URL as parameter<<
      setCountries(response.data) // returns array of JSON objects
    })
  }, [])

  return(
    <div>
      <div>
        Find countries <input value={search} onChange={(event) => setSearch(event.target.value)} />
      </div>
      {countries
      .filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
      .length > 10 ? (
        search === '' ? (
          <div>
            Enter a search
          </div>
        ) : (
          <div>
            Too many results found. Be more specific.
          </div>
        )
      ) : (
        countries
          .filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
          .map(country =>
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => setSearch(country.name.common)}>show</button>
            </div>
          )
      )
    }
     {countries
        .filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
        .length === 1 ? (
          countries
            .filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
            .map(country => (
              <div key={country.name.common}>
                <h1>{country.name.common}</h1>
                <div>Capital city: {country.capital[0]}</div>
                <div>Population: {country.population.toLocaleString()}</div>
                <h2>Languages</h2>
                <ul>
                  {Object.values(country.languages).map(language =>
                    <li key={language}>{language}</li>
                  )}
                </ul>
                <img src={country.flags.png} style={{width: 200}} />
                <Weather city={country.capital[0]} />
              </div>
            ))
        ) : ''
      }
    </div>
  )
};

export default App;
