
import './App.css';
import ListItems from './Components/ListItems';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import BatteryDetail from './Components/BatteryDetail';
import {useState, useEffect} from "react"
import axios from "axios"
import { Table } from './Components/Table'

// function App() {
//   return (
//     <div className="App">
      
    //   <Router>
    //   <div className="App">
    //   <Switch>
    //         <Route exact path="/">
    //           <Home />
    //         </Route>
            
    //         <Route path="/battery/:id">
    //           <BatteryDetail />
    //         </Route>
          
    //       </Switch>
      
    //   </div>
    // </Router>
        
     
//     </div>
//   );
// }

// export default App;


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
      axios.get('https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries')
      .then((response) => {
      setBatteryList( response.data );
  })
  }, []);

  return (
    <div className="App">
      

      

      <Router>
      <div className="App">
      
      <Switch>
      
            <Route exact path="/">
            <Table rows={batteryList} columns={columns} />
            </Route>
            
            <Route path="/battery/:id">
              <BatteryDetail />
            </Route>
          
          </Switch>
      
      </div>
    </Router>
      
    </div>
  )
}

export default App
