import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';

const BatteryDetail = (props) => {
  const { id } = useParams();
  const [batteryList, setBatteryList] = useState([])

let status= "";
  useEffect(() =>{
      axios.get('https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries')
      .then((response) => {
      setBatteryList( response.data );
  })
  }, []);
  console.log(batteryList)


console.log(id)

for(let i =0; i<batteryList.length; i++){
    if(id === batteryList[i].id){
        if(batteryList[i].connectionStatus == 1){
            status = "Online"
        } else if(batteryList[i].connectionStatus == 2){
            status = "Pending"
        }else {
            status = "Offline"
        }
        return (<div className="main-container">

        <div className="aside">
          <div className="logo">
          <h2>Battery Details</h2>
          
          </div>
          <div className="nav-toggler">
            <span></span>
          </div>
          <ul className="nav"><li><p>Code : { batteryList[i].id }</p></li>
            <li><p> <i className="fas fa-map-marker-alt"></i>{ batteryList[i].location ? "": "N/A" }</p></li>
            <li><p><i className="fas fa-bolt"></i> { batteryList[i].voltage  }</p></li>
            <li><p><i className="fas fa-unlock"></i>{ batteryList[i].lastConnectionTime  }</p></li>
            <li><p><i className="fas fa-battery-half"></i>{ batteryList[i].stateOfCharge ? "" : "N/A"}</p></li>
            <li><p><i className="fa fa-comments"></i>connectionStatus : { status}</p></li>
          </ul>
        </div>
        <div className="main-content">
        <section className="home section" id="home">
        <div className="container">
          <div className="row">
            <div className="home-info padd-15">
              <h3 className="hello">Health of a Battery <span className="name">{batteryList[i].stateOfHealth ? null : 0 }%</span></h3>
              <h3 className="my-profession">Capacity <span className="typing">{batteryList[i].capacity  }</span></h3>
              <p>Issues : {batteryList[i].recentIssues }</p>
             
             
            </div>
            
          </div>
        </div>
      </section>
      
        </div>
        </div>)
    }
}

  

  
}
 
export default BatteryDetail;