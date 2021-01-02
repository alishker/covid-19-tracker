import React, { useState } from 'react';
import { MenuItem, Select, FormControl } from '@material-ui/core';
import './App.css';

function App() {

  const [countries, setCountries] = useState(['Kenya', 'Ethiopia', 'Somalia', 'India'])
  return (
    <div className="App">
      <div className='app__header'>
        <h1>COVID-19 TRACKER</h1>
        <FormControl className='app__dropdown'>
          <Select variant='outlined' value='abc'>

            {countries.map((country) => (
              <MenuItem value='cou'>{country}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>


    </div>
  );
}

export default App;
