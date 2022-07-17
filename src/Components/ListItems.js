import React, { useEffect,useState } from 'react';
import axios from 'axios';
import _ from "lodash";
import { Link } from 'react-router-dom';
import BatteryDetail from './BatteryDetail';


const pageSize = 20;

const ListItems= () => {
    const [batteryList, setBatteryList] = useState([])
    const [paginatedList, setPaginatedList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [show, setShow] = useState(false)

    useEffect(() =>{
        axios.get('https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries')
        .then((response) => {
        setBatteryList( response.data );
        setPaginatedList(_(response.data).slice(0).take(pageSize).value())
    })
    }, []);
    console.log(batteryList)

    const navPage = (page_num) =>{
        setCurrentPage(page_num);
        const pageIndex = (page_num-1)*pageSize;
        setPaginatedList(_(batteryList).slice(pageIndex).take(pageSize).value())
    }


          let correct_location="";
      let correct_stateOfCharge = "";

    const pageCount = batteryList ? Math.ceil(batteryList.length/pageSize) : 0;
        if (pageCount === 1) {
            return null
        }
        const pages = _.range(1, pageCount+1)

      let list_data = paginatedList.map((item)=> {
          
          if(item.location === null){
            correct_location = "NA";
          } else {
              correct_location= item.location
          }

          if(item.stateOfCharge === null){
            correct_stateOfCharge  = "NA";
          } else {
            correct_stateOfCharge = item.stateOfCharge
          }

          
          return(
              <tr key={item.id}>
                  <Link to={`/battery/${item.id}`} target='_blank' ><td>{item.id}</td></Link>
                  <td>{correct_location}</td>
                  <td>{correct_stateOfCharge }</td>
                  <td>{item.connectionStatus}</td>
              </tr>
          )
      })

  return (
    <div>
          <table className='center'>
              
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>Location</th>
                          <th>Charge (%)</th>
                          <th>Connection Status</th>
                      </tr>
                  </thead>
                <tbody>
                  {list_data}
              </tbody>
          </table>
          <nav className='pages'>
              <ul className='pages-ul'>
              <a onClick={() =>navPage(currentPage-1)} >Previous</a>
                  {
                      pages.map((page) =>(
                        //   <li className={ page=== currentPage ? 'active': ''}>
                        <a onClick={() =>navPage(page)} >{page}</a>
                        // </li>
                        ))
                  }
                <a onClick={() =>navPage(currentPage+1)}  >Next</a>
                  
              </ul>
          </nav>
          
      </div>
  )
}

// export default ListItems

// class ListItems extends Component {
//     constructor(props) {
//       super(props)
    
//       this.state = {
//          battery_list : []
//       }
//     }

//     componentDidMount(){
//         axios.get('https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries')
//         .then(response =>{console.log(response)
//         this.setState({battery_list: response.data})}  )
//         .catch(error => {console.log(error)})
//     }

    


//   render() { 
//       let correct_location="";
//       let correct_stateOfCharge = "";

//       const pageCount = this.state.battery_list? Math.ceil(this.state.battery_list.length/pageSize) : 0;
//         if (pageCount == 1) {
//             return null
//         }
//         const pages = _.range(1, pageCount+1)

//       let list_data = this.state.battery_list.map((item)=> {
          
//           if(item.location === null){
//             correct_location = "NA";
//           } else {
//               correct_location= item.location
//           }

//           if(item.stateOfCharge === null){
//             correct_stateOfCharge  = "NA";
//           } else {
//             correct_stateOfCharge = item.stateOfCharge
//           }

          
//           return(
//               <tr key={item.id}>
//                   <td>{item.id}</td>
//                   <td>{correct_location}</td>
//                   <td>{correct_stateOfCharge }</td>
//                   <td>{item.connectionStatus}</td>
//               </tr>
//           )
//       })
//     return (
//       <div>
//           <table className='center'>
              
//                   <thead>
//                       <tr>
//                           <th>ID</th>
//                           <th>Location</th>
//                           <th>State of Charge</th>
//                           <th>Connection Status</th>
//                       </tr>
//                   </thead>
//                 <tbody>
//                   {list_data}
//               </tbody>
//           </table>
//           <nav className='pages'>
//               <ul className='pages-ul'>
//               <a href="#" >Previous</a>
//                   {
//                       pages.map((page) =>(
//                         <a href="#" >{page}</a>
//                         ))
//                   }
//                 <a href="#" >Next</a>
                  
//               </ul>
//           </nav>
//       </div>
//     )
//   }
// }

export default ListItems