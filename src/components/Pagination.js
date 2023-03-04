import React, { useState } from "react";

import Pagination from "react-js-pagination";

const TablePagination = (props) => {
  const [activePage, setActivepage] = useState(props.pagination.currentPage);
  const handlePageChange = (e) => {
    setActivepage(e);
    props.pagination.currentPage = e;
    props.changePage(props.pagination);
  }

  return (
    <React.Fragment>        
      <Pagination
          activePage={activePage}
          itemsCountPerPage={props.pagination.perPageRows}
          totalItemsCount={props.pagination.totalItems}
          pageRangeDisplayed={5}
          onChange={(e) => handlePageChange(e)}
        />
      
      </React.Fragment>
  );
};
export default TablePagination;
