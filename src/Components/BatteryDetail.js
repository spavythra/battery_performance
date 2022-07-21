import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';
import Graph from "./Graph";

const BatteryDetail = (props) => {
  const { id } = useParams();
  const [batteryList, setBatteryList] = useState({})
  let location = ""
  let health = "N/A";
  let charge = "N/A";
  let issues = "";

let status= "";
  useEffect(() =>{
      axios.get(`https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries?id=${id}`)
      .then((response) => {
      setBatteryList( response.data );
  })
  }, []);
  console.log(batteryList)


console.log(id)


    if(id === batteryList.id){
        // health check
        if(batteryList.stateOfHealth != null ){
            health = `${batteryList.stateOfHealth}%`
        }

        // charge check
        if(batteryList.stateOfCharge != null ){
            charge = `${batteryList.stateOfCharge}%`
        }

        // connection status check
        if(batteryList.connectionStatus == 1){
            status = "Online"
        } else if(batteryList.connectionStatus == 2){
            status = "Pending"
        }else {
            status = "Offline"
        }

        // issues check
        if(batteryList.recentIssues[0]=== 1){
            issues = "Deep Discharge"
        } else if(batteryList.recentIssues[0] === 2){
            issues = "OverHeating"
        }else if(batteryList.recentIssues[0] === 3){
            issues = "Unknown Anomaly"
        }else if(batteryList.recentIssues[0] === 4){
            issues = "Missing Data"
        }else{
            issues = "N/A"
        }
        
        return (<div className="main-container">

        <div className="aside">
          <div className="logo">
          <h2>Battery Status</h2>
          
          </div>
          {/* <div className="nav-toggler">
          </div> */}
          <ul className="nav"><li><p >Code : <span style={{color:'#9dffc8'}}>{ batteryList.id }</span></p></li>
          { batteryList.location ? null : batteryList.location ="N/A" }
            <li><p> <i className="fas fa-map-marker-alt"></i>{ batteryList.location }</p></li>
            <li><p><i className="fas fa-bolt"></i> { batteryList.voltage  }V</p></li>
            <li><p><i className="fas fa-battery-half"></i>{ charge}</p></li>
            <li><p><i className="fas fa-broadcast-tower"></i>{ batteryList.lastConnectionTime.substring(0, 10)} @ { batteryList.lastConnectionTime.substring(11, 19)} </p></li>
            
            <li><p><i className="fa fa-comments"></i>Connection status : { status}</p></li>
          </ul>
        </div>
        <div className="main-content">
        <section className="home section" id="home">
        <div className="container">
          <div className="row">
            <div className="home-info padd-15">
            
              <h3 className="hello">Battery Health : <span className="name">{health }</span></h3>
              <h3 className="my-profession">Battery Capacity : <span className="typing" style={{color:'#9dffc8'}}>{batteryList.capacity  }Ah</span></h3>
              <p>Issues : <span style={{color:'red'}}>{issues}</span> </p>
             
             
            </div>
            
          </div>
        </div>
      </section>
      
        </div>
        <Graph measurements={batteryList.measurements}/>
        </div>)
    }


  

  
}
 
export default BatteryDetail;