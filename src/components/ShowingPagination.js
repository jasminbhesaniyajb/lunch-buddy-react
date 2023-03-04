import React from "react";

const ShowingPagination = (props) => {
  
  return (
    <React.Fragment>
      <p>
        <i className="fa fa-list mr-1"></i>Showing
        <strong className="mx-1">
          {props.pagination.currentPage == props.pagination.totalPages -1
            ? props.pagination.perPageRows * (props.pagination.currentPage - 1) + 1
            : props.pagination.currentPage <= props.pagination.totalPages &&
              props.pagination.currentPage != 1
            ? props.pagination.perPageRows * (props.pagination.currentPage - 1) + 1
            : props.pagination.currentPage}
        </strong>
        to
        <strong className="mx-1">
          {props.pagination.totalItems < props.pagination.perPageRows
            ? props.pagination.totalItems
            : props.pagination.currentPage == props.pagination.totalPages
            ? props.pagination.totalItems
            : props.pagination.currentPage * props.pagination.perPageRows}
        </strong>
        of {props.pagination.totalItems} Entries
      </p>
    </React.Fragment>
  );
};
export default ShowingPagination;
