import { useState, useMemo } from 'react'
import { sortRows, filterRows, paginateRows } from './helpers'
import { Pagination } from './Pagination'
import { Link } from 'react-router-dom';

export const Table = ({ columns, rows }) => {
  const [activePage, setActivePage] = useState(1)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
  const rowsPerPage = 20
  let correct_location="";
  let correct_stateOfCharge = "";

  const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)

  const count = filteredRows.length
  const totalPages = Math.ceil(count / rowsPerPage)

  const handleSearch = (value, accessor) => {
    setActivePage(1)

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }))
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters }
        delete updatedFilters[accessor]

        return updatedFilters
      })
    }
  }

  const handleSort = (accessor) => {
    setActivePage(1)
    setSort((prevSort) => ({
      order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
      orderBy: accessor,
    }))
  }

  const clearAll = () => {
    setSort({ order: 'asc', orderBy: 'id' })
    setActivePage(1)
    setFilters({})
  }

  return (
    <div className='table-container'>
    <div className='header'>
        <h1>Battery Monitoring System</h1>
        <h5>- Powered by Bamomas</h5>
      </div>

      <div className='input-container'>
        <div className='search-bar'>
        <input
        key={`id-search`}
        type="search"
        placeholder={`Search by id`}
        value={filters["id"]}
        onChange={(event) => handleSearch(event.target.value, "id")}/>
        
      </div>
      <button onClick={clearAll}>Clear</button>
     </div>
      <div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => {
              const sortIcon = () => {
                if (column.accessor === sort.orderBy) {
                  if (sort.order === 'asc') {
                    return <i className="fas fa-caret-square-up" style={{color:"white", border:"transparent",fontSize:"20px"}}></i>
                  }
                  return <i className="fas fa-caret-square-down" style={{color:"white", border:"transparent",fontSize:"20px"}}></i>
                } else {
                  return <i className="fas fa-caret-square-down" style={{color:"white", border:"transparent",fontSize:"20px"}}></i>
                }
              }
              return (
                <th key={column.accessor}>
                  <span>{column.label}</span>
                  <button style={{background:"#e37373", marginLeft:"5px", border:"none", width:"25px"}} onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {calculatedRows.map((row) => {
          
              if(row.location === null){
                correct_location = "NA";
              } else {
                  correct_location= row.location
              }
    
              if(row.stateOfCharge === null){
                correct_stateOfCharge  = "NA";
              } else {
                correct_stateOfCharge = row.stateOfCharge
              }
    
            return (
              <tr key={row.id}>

                 <Link to={`/battery/${row.id}`} target='_blank' ><td>{row.id}</td></Link>
                    <td>{correct_location}</td>
                    <td>{correct_stateOfCharge }</td>
                    <td>{row.connectionStatus}</td></tr>)
              
            
          })}
        </tbody>
      </table>
      </div>

      {count > 0 ? (
        <Pagination
          activePage={activePage}
          count={count}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      ) : (
        <p>No data found</p>
      )}

      
    </div>
  )
}