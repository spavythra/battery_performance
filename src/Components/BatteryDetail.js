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
        
      return(
        <div>
   
        <div class="main-container">
          
          <div class="aside">
            <div class="logo">
              <a href="#"><span>Ba</span>ttery <span>Mo</span>nitoring</a>
              
            </div>
            <div class="nav-toggler">
              <span></span>
            </div>
            <ul class="nav">
              <li><a href="#graph" class="active"><i class="fas fa-poll"></i> Performance</a></li>
              <li><a href="#info"><i class="fas fa-toggle-on"></i> Status</a></li>
             
            </ul>
          </div>
          
          <div class="main-content">
           
            <section class="home section" id="graph">
              <div class="container">
                <div class="row">
                  <div class="home-info padd-15">
                    <h3 class="hello">Battery charge dynamics vs. time</h3>
                    <Graph measurements={batteryList.measurements}/>
                   
                    
                  </div>
                 
                 
                </div>
              </div>
            </section>

            <section class="about section" id="info">
        <div class="container">
          <div class="row">
            <div class="section-title padd-15">
              <h2>Battery Information</h2>
            </div>
          </div>
          <div class="row">
            <div class="about-content padd-15">
              
              
              <div class="row">
                <div class="education padd-15">
                <div class="row">
                    <div class="timeline-box padd-15">
                    <p >Code : <span style={{color:'#9dffc8'}}>{ batteryList.id }</span></p>
                    { batteryList.location ? null : batteryList.location ="N/A" }
                          <p> <i className="fas fa-map-marker-alt"></i>{ batteryList.location }</p>
                    
                         
                          
                            
                        
                          <p><i className="fas fa-bolt"></i> { batteryList.voltage  }V</p>
                          <p><i className="fas fa-battery-half"></i>{ charge}</p>
                          <p><i className="fas fa-broadcast-tower"></i>{ batteryList.lastConnectionTime.substring(0, 10)} @ { batteryList.lastConnectionTime.substring(11, 19)} </p>
                        
                          <p><i className="fas fa-comments"></i>Connectivity : { status}</p>
                          <p><i className="fas fa-heart"></i>Healthiness : <span className="name">{health }</span></p>
                          <p><i className="fas fa-exclamation-triangle"></i>Issues : <span style={{color:'#ff7376'}}>{issues}</span> </p>
                    </div>
                  </div>
                  
                  
                </div>
                <div class="experience padd-15">
                <div class="row">
                    <div class="timeline-box padd-15">
                      {/* <h3 className="battery-title">Battery Health</h3> */}
                    <div class="gauge">
                              <div class="gauge__body">
                              <div className="gauge__fill" style={{transform: `rotate(${batteryList.stateOfHealth / 200}turn)`}}></div>
                              <div class="gauge__cover"><p>Health</p><p>{health}</p></div>
                          </div>
                          </div>
                          {/* <h3 className="battery-title">Battery Charge</h3> */}
                          <div class="gauge">
                            
                            <div class="gauge__body">
                              <div className="gauge__fill" style={{transform: `rotate(${batteryList.stateOfCharge / 200}turn)`}}></div>
                              <div class="gauge__cover"><p>Charge</p><p>{charge}</p></div>
                            </div>
                          </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
           
       
      
           
      
         
            {/* <section class="service section" id="info">
              <div class="container">
                <div class="row">
                <div class="home-info padd-15">
                      <div className="left">
                      <div class="column">
                            <div class="gauge">
                              <div class="gauge__body">
                              <div className="gauge__fill" style={{transform: `rotate(${batteryList.stateOfHealth / 200}turn)`}}></div>
                              <div class="gauge__cover">{health}</div>
                          </div>
                          </div>
                          <div class="gauge">
                            <div class="gauge__body">
                              <div className="gauge__fill" style={{transform: `rotate(${batteryList.stateOfCharge / 200}turn)`}}></div>
                              <div class="gauge__cover">{batteryList.stateOfCharge}%</div>
                            </div>
                          </div>
                          </div>  </div>  
                        <div className="right">
                        <div class="column">
                          <h3 className="hello">Battery Health : <span className="name">{health }</span></h3>
                          <p>Issues : <span style={{color:'red'}}>{issues}</span> </p>
                          <p >Code : <span style={{color:'#9dffc8'}}>{ batteryList.id }</span></p>
                            { batteryList.location ? null : batteryList.location ="N/A" }
                          <p> <i className="fas fa-map-marker-alt"></i>{ batteryList.location }</p>
                        
                          <p><i className="fas fa-bolt"></i> { batteryList.voltage  }V</p>
                          <p><i className="fas fa-battery-half"></i>{ charge}</p>
                          <p><i className="fas fa-broadcast-tower"></i>{ batteryList.lastConnectionTime.substring(0, 10)} @ { batteryList.lastConnectionTime.substring(11, 19)} </p>
                        
                          <p><i className="fa fa-comments"></i>Connection status : { status}</p>
                        </div></div> 
                </div></div>
                
              </div>
            </section> */}
         
      
            
            
         
      
      
          </div>
        
      
        </div>
        
      
      
        
       
      </div>
      )
    }


  

  
}
 
export default BatteryDetail;