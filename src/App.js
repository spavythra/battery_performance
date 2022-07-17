
import './App.css';
import ListItems from './Components/ListItems';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import BatteryDetail from './Components/BatteryDetail';

function App() {
  return (
    <div className="App">
      
      <Router>
      <div className="App">
      <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            
            <Route path="/battery/:id">
              <BatteryDetail />
            </Route>
          
          </Switch>
      
      </div>
    </Router>
        
     
    </div>
  );
}

export default App;
