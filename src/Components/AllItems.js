import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


function AllItems() {
    const [data, setData] = useState([])
    const [value, setValue] = useState("")
    const [sortValue, setSortValue] = useState("")
    const [currentPage, setcurrentPage] = useState(0)
    const [pageLimit] = useState(20)
    const [sortFilterValue, setSortFilterValue] = useState("")
    const [operation, setOperation] = useState("")

    const sortOptions = ["id", "location" , "stateOfCharge", "connectionStatus"]

    useEffect(() => {
        loadUserData(0,20,0)
    }, [])

    const loadUserData = async (start, end, increase, optType= null, filterOrSortValue) => {
        switch(optType){
            case "search" :
                setOperation(optType)
                setSortValue("")
                return await axios
                .get(`https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries?id?q=${value}&_start=${start}&_end=${end}`)
                .then((response) => {
                    setData(response.data)
                    setcurrentPage(currentPage + increase)
                })
                .catch((err) => console.log(err))
                case "sort" :
                setOperation(optType)
                setSortFilterValue(filterOrSortValue)
                return await axios
                .get(`https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries?id?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`)
                .then((response) => {
                    setData(response.data)
                    setcurrentPage(currentPage + increase)
                })
                .catch((err) => console.log(err))
                case "filter" :
                setOperation(optType)
                setSortFilterValue(filterOrSortValue)
                return await axios
                .get(`https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries?id?status=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`)
                .then((response) => {
                    setData(response.data)
                    setcurrentPage(currentPage + increase)
                })
                .catch((err) => console.log(err))
                default:
                return await axios
                .get(`https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries?ids&_start=0&_end=20`)
                .then((response) => {
                    setData(response.data)
                    setcurrentPage(currentPage + increase)
                })
                .catch((err) => console.log(err))
        }
    }

    console.log("data", data)

    const handleReset = () => {
        setOperation("")
        setValue("")
        setSortValue("")
        setSortFilterValue("")
        loadUserData(0,20,0)
    }

    const handleSearch = async(e) => {
        e.preventDefault();
        loadUserData(0,20,0, "search")
    }

    const handleSort = async(e) => {
        let value = e.target.value
        loadUserData(0,20,0, "sort", value)
    }

    const handleFilter = async(value) => {  
        loadUserData(0,20,0,"filter", value)
      .catch((err) => console.log(err))
    }

    const renderPagination = () => {
        if(data.length <20 && currentPage === 0) return null;
        console.log(currentPage)
        console.log(data.length)
        if(currentPage === 0) {
            return (
                <div>
                    <div>
                        <p>1</p>
                    </div>
                    <button onClick={() => loadUserData(20,20*2,1,operation,sortFilterValue)}>Next</button>
                </div>
            )
        } else if (currentPage < pageLimit-1 && data.length === pageLimit){
            return(<div>
                <div>
                <button onClick={() => loadUserData((currentPage-1)*20,currentPage*20,-1,operation,sortFilterValue)}>Prev</button>
                </div>
                <div>{currentPage+1}</div>
                <div><button onClick={() => loadUserData((currentPage+1)*20,(currentPage+2)*20,1,operation,sortFilterValue)}>Next</button></div>
            </div>)
        } else{
            return(<div>
                <div>
                <button onClick={() => loadUserData((currentPage-1)*20,currentPage*20,-1,operation,sortFilterValue)}>Prev</button>
                </div>
                <div>{currentPage+1}</div>
                
            </div>)
        }
    }
  return (
    <div><div><form style={{margin:"auto", padding: "15px", maxWidth:"400px", alignContent:"center"}}
    onSubmit={handleSearch}>
        <input type="text" placeholder="search.." value={value} onChange={(e) => setValue(e.target.value)}/>
        <button type="submit">Search</button>
        <button type="submit" onClick={() => handleReset()}>Reset</button>
        </form></div>
        <div style={{marginTop:"100px"}}>
            <h2>search here</h2></div><div>
            <table className='center'>
              
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Location</th>
                      <th>Charge (%)</th>
                      <th>Connection Status</th>
                  </tr>
              </thead>
            
              {data.length === 0 ? (<tbody><tr><td>no data</td></tr> </tbody>): (
                data.map((item,index) =>(<tbody><tr key={data.id}>
                    <Link to={`/battery/${data.id}`} target='_blank' ><td>{item.id}</td></Link>
                    <td>{item.location}</td>
                    <td>{item.stateOfCharge }</td>
                    <td>{item.connectionStatus}</td>
                </tr> </tbody>))
                
              )}
          
      </table>
      <div>{renderPagination()}</div>
      </div>
      <div>
        <div><h5>Sort By:</h5><select style={{width:"50%", borderRadius: "2px", height: "35px"}} onChange={handleSort} value={sortValue}><option>Please select value</option>{sortOptions.map((item, index) => (<option value={item}>{item}</option>))}</select></div>
      </div>
      <div>
        <div><h5>Filter By:</h5><button onClick={() => handleFilter("Active")}>Active</button>
        <button style={{marginLeft: "2px"}} onClick={() => handleFilter("Inactive")}>Inactive</button></div>
      </div>
      </div>
  )
}

export default AllItems