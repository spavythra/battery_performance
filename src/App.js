import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BatteryDetail from './Components/BatteryDetail';
import {useState, useEffect} from "react"
import axios from "axios"
import { Table } from './Components/Table'
import React from 'react'

function App() {

  const columns = [
    { accessor: 'id', label: 'ID' },
    { accessor: 'location', label: 'Location' },
    { accessor: 'stateOfCharge', label: 'Charge (%)' },
    { accessor: 'connectionStatus', label: '	Connection Status' },
  ]

  const [batteryList, setBatteryList] = useState([])

  useEffect(() =>{
      //axios.get('https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries')
      axios.get('batteryAPI.json')
      .then((response) => {
      setBatteryList( response.data );
  })
  }, []);

  return (
    <div className="App">
      <Router>   
      <Switch>
      
            <Route exact path="/">
            <Table rows={batteryList} columns={columns} />
            </Route>
            
            <Route path="/:id">
              <BatteryDetail />
            </Route>
          
          </Switch>

    </Router>
      
    </div>
  )
}

export default App
