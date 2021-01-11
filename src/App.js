import React, { useEffect, useState } from 'react';

import { MenuItem, Select, FormControl, CardContent, Card } from '@material-ui/core';
import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import { sortData } from './util'
import './App.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setInputCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(res => res.json()).then(data => { setCountryInfo(data) })
  }, [])
  useEffect(() => {
    const getCountriesdata = async () => {
      fetch('https://disease.sh/v3/covid-19/countries')
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data)
          setTableData(sortedData)
          setCountries(countries);
        })
    }
    getCountriesdata();
  }, [])

  const onCountryClick = async (e) => {
    const countryCode = e.target.value
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then(res => res.json())
      .then(data => {
        setInputCountry(countryCode)
        setCountryInfo(data)
      })

  }
  return (
    <div className="app">
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVID-19 TRACKER</h1>
          <FormControl className='app__dropdown'>
            <Select
              variant='outlined'
              value={country}
              onClick={onCountryClick}>
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

        </div>
        <div className='app__stats'>

          {/* infoBox1*/}
          <InfoBox title='Coronavirus Cases' cases={countryInfo.todayCases} total={countryInfo.cases} />

          {/* infoBox2*/}
          <InfoBox title='Recovered' cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          {/* infoBox3*/}
          <InfoBox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths} />

        </div>
        {/*Map will be here */}
        <Map />

      </div>
      <Card className='app__right'>
        <CardContent>
          {/*table */}
          <h3>Live cases by Country</h3>
          <Table countries={tableData} />
          {/*graph */}
          <h3>Worldwide new Cases graph</h3>
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
