export const Pagination = ({ activePage, count, rowsPerPage, totalPages, setActivePage }) => {
    const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1
    const end = activePage === totalPages ? count : beginning + rowsPerPage - 1
  
    return (
      <><div className="items-page"><div className="pagination-left">
      Items: {beginning === end ? end : `${beginning} - ${end}`} of {count}
    </div><div className="pagination-right">
      Page {activePage} of {totalPages}
    </div>
    </div>
        <div className="pagination">
        
          <button disabled={activePage === 1} onClick={() => setActivePage(1)}>
          <i className="fas fa-angle-double-left" style={{color:"white", border:"transparent",fontSize:"20px"}}></i>
          </button>
          <button disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)}>
          <i className="fas fa-angle-left" style={{color:"white", border:"transparent",fontSize:"20px"}}></i>
          </button>
          <button disabled={activePage === totalPages} onClick={() => setActivePage(activePage + 1)}>
          <i className="fas fa-angle-right" style={{color:"white", border:"transparent",fontSize:"20px"}}></i>
          </button>
          <button disabled={activePage === totalPages} onClick={() => setActivePage(totalPages)}>
          <i className="fas fa-angle-double-right" style={{color:"white", border:"transparent",fontSize:"20px"}}></i>
          </button>
        
        
        
        </div>
       
      </>
    )
  }